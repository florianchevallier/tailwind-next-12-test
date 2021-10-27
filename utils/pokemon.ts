import { IPokemon } from "interfaces/Pokemon";
import { IPokemonSpecie } from "interfaces/PokemonSpecies";
import request from "./request";

export async function getPokemonSpecie(name: string) {
  return request<IPokemonSpecie>(`${process.env.API_POKEMON}/pokemon-species/${name}`);
}
export async function getPokemon(name: string) {
  return request<IPokemon>(`${process.env.API_POKEMON}/pokemon/${name}`);
}

export function findByName<T extends { name: string }>(l: T[], name: string) {
  return l.find(p => p.name === name);
}

export function getPokemonLocalizedName(
  locale: string,
  pokemonSpecies: IPokemonSpecie[],
  name: string
) {
  return findByName(pokemonSpecies, name)?.names.find((n) => n.language.name === locale)?.name || "";
}