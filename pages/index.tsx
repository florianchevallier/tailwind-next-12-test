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
        <TimeLeft endDate={BIRTHDAY} />
        <hr />
        <p>{t("global.brands_categories.know_more")}</p>
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
