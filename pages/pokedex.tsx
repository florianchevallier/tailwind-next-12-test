import React, { useEffect, useState } from "react";
import { GetServerSidePropsContext, InferGetServerSidePropsType } from "next";
import Image from "next/image";
import request from "utils/request";
import { IPokemonList } from "interfaces/PokemonList";
import Paginate from "components/Paginate/Paginate";
import { useRouter } from "next/dist/client/router";
import ReactFlagsSelect from "react-flags-select";

import {
  getPokemonSpecie,
  getPokemon,
  getPokemonLocalizedName,
  findByName,
} from "utils/pokemon";

const LIMIT = 20;

const languageToFlag: { [x:string]: string } = {
  fr: "FR",
  en: "GB",
  de: "DE",
  nl: "NL",
  es: "ES",
};
const flagToLanguage: { [x:string]: string } = {
  FR: "fr",
  GB: "en",
  DE: "de",
  NL: "nl",
  ES: "es",
};

export default function Pokedex({
  pokemons,
  total,
  page,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const { pathname, asPath, query, push, locale, events } = useRouter();
  const [loading, setPageLoading] = useState(false);
  useEffect(() => {
    const handleRouteChangeStart = () => setPageLoading(true);
    const handleRouteChangeComplete = () => setPageLoading(false);
    
    events.on("routeChangeStart", handleRouteChangeStart);
    events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      events.off("routeChangeStart", handleRouteChangeStart);
      events.off("routeChangeComplete", handleRouteChangeComplete);
    }
  }, [])

  function onPageClick({ selected }: { selected: number }) {
    const newPage = selected + 1;
    push({ query: `page=${newPage}` });
  }
  function onFlagClick(code: string) {
    push({ pathname, query }, asPath, { locale: flagToLanguage[code] });
  }

  return (
    <div className="w-full bg-gray-800 min-h-screen">
      <section className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-4 py-12">
        <div className="text-center pb-12 w-96 mx-auto">
          <Image
            width={2590}
            height={942}
            alt="pokemon logo"
            src="/logo/pokemon.png"
          />
        </div>
        <div className="w-full flex justify-between items-center">
          <Paginate
            onPageChange={onPageClick}
            pageRangeDisplayed={5}
            pageCount={Math.ceil(total / LIMIT)}
            forcePage={page}
            marginPagesDisplayed={1}
            containerClassName="mb-4 w-auto"
          />
          <ReactFlagsSelect
            countries={["FR", "GB", "DE", "NL", "ES"]}
            selected={languageToFlag[locale || "fr"]}
            onSelect={onFlagClick}
          />
        </div>
        {loading ? (
          <div className="flex justify-center items-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {pokemons.map((p) => (
              <div
                key={p.name}
                className="w-full bg-gray-900 rounded-lg sahdow-lg p-12 flex flex-col justify-center items-center"
              >
                <div className="mb-8">
                  <Image
                    className="object-center object-cover rounded-full h-36 w-36"
                    src={p.imgUrl}
                    width={80}
                    height={80}
                    alt="photo"
                  />
                </div>
                <div className="text-center">
                  <p className="text-xl text-white font-bold mb-2">
                    {p.number} - {p.name}
                  </p>
                  <p className="text-base text-gray-400 font-normal">
                    {p.flavorText}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export const getServerSideProps = async (ctx: GetServerSidePropsContext) => {
  const locale = ctx.locale || "fr";
  const page = ctx.query.page ? +ctx.query.page : 1;
  const offset = LIMIT * page - LIMIT;
  const pokemonsList = await request<IPokemonList>(
    `${process.env.API_POKEMON}/pokemon?limit=${LIMIT}&offset=${offset}`
  );

  const pokemonSpecieQuery = pokemonsList.results.map((p) =>
    getPokemonSpecie(p.name)
  );
  const pokemonQuery = pokemonsList.results.map((p) => getPokemon(p.name));
  const pokemonSpecies = await Promise.all(pokemonSpecieQuery);
  const pokemon = await Promise.all(pokemonQuery);

  const pokemons = pokemonsList.results.map((pl) => ({
    name: getPokemonLocalizedName(locale, pokemonSpecies, pl.name),
    imgUrl: findByName(pokemon, pl.name)?.sprites.front_default || "",
    flavorText: findByName(pokemonSpecies, pl.name)?.flavor_text_entries.find(
      (f) => f.language.name === locale
    )?.flavor_text,
    number: findByName(pokemon, pl.name)?.id,
  }));

  return {
    props: {
      pokemons,
      total: pokemonsList.count,
      page: page - 1,
    },
  };
};
