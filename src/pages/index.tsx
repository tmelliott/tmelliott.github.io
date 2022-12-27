import type { ReactElement } from "react";

import Head from "next/head";

import BaseLayout from "../layouts/BaseLayout";
import type { NextPageWithLayout } from "./_app";

const Home: NextPageWithLayout = () => {
  return (
    <>
      <Head>
        <title>Tom Elliott</title>
        <meta name="description" content="My personal website." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <h1>Hello World</h1>

      <div className="h-screen"></div>
    </>
  );
};

Home.getLayout = function getLayout(page: ReactElement) {
  return <BaseLayout>{page}</BaseLayout>;
};

export default Home;
