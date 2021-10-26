import type { GetServerSideProps, NextPage } from 'next'
import { useTranslation } from 'next-i18next';
import FakeText from '../components/FakeText'
import Header from '../components/Header'
import TimeLeft from '../components/TimeLeft'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

const BIRTHDAY = 1647558000000;

const Home: NextPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Header />
      <div className="container w-96 mx-auto pt-72">
        <TimeLeft labels={{
          days: t("global.common.days"),
          hours: t("global.common.hours_short"),
          minutes: t("global.common.minutes_short"),
          seconds: t("global.common.seconds_short"),
        }}
          endDate={BIRTHDAY} />
        <hr />
        <div className="flex items-center justify-center my-8">
          <button className="p-2 pl-5 pr-5 bg-transparent border-2 border-indigo-500 text-indigo-500 text-lg rounded-lg transition-colors duration-700 transform hover:bg-indigo-500 hover:text-gray-100 focus:border-4 focus:border-indigo-300">{t("global.brands_categories.know_more")}</button>
        </div>
        <hr />
        <FakeText />
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale || 'fr', ['common'])),
    },
  };
}

export default Home;
