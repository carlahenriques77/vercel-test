import React, { useEffect, useRef, useState } from "react";

import VideoHero from "@/components/page-content/homepage/VideoHero/VideoHero";
import SiteFeatures from "@/components/page-content/homepage/SiteFeatures/SiteFeatures";
import NumberCounter from "@/components/page-content/homepage/NumberCounter/NumberCounter";
import LongText from "@/components/page-content/homepage/LongText/LongText";
import Testimonials from "@/components/page-content/homepage/Testimonials/Testimonials";
import Services from "@/components/page-content/homepage/Services/Services";
import BookNowCallToAction from "@/components/page-content/homepage/BookNowCallToAction/BookCallToAction";
import Quote from "@/components/page-content/homepage/Quote/Quote";
import Faq from "@/components/page-content/homepage/Faq/Faq";
import HiringSection from "@/components/page-content/homepage/HiringSection/HiringSection";
import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar/NavBar";
import LoadingScreen from "@/components/common/LoadingScreen/LoadingScreen";
import ServerDown from "@/components/common/ServerDown/ServerDown";
import Head from "next/head";
import LazyLoadComponent from "@/components/common/LazyLoadComponent/LazyLoadComponent";
import useCheckFetch from "@/hooks/useCheckFetch";

const Home = () => {
  const apiUrl = "http://localhost:1337/api/content-media?populate=*";
  const { loading, error } = useCheckFetch(apiUrl);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ServerDown />;
  }

  return (
    <main>
      <Head>
        <title>Seja bem-vindo! | Doggy Daycare</title>
        <meta
          name="description"
          content="Oferecemos uma creche para cães onde eles desfrutam de diversão, cuidado e companhia. Proporcionamos um ambiente seguro e alegre para o bem-estar do seu melhor amigo, independente da sua raça."
        />
        <link rel="shortcut icon" href="/favicon.png" />
      </Head>

      <NavBar />

      <LazyLoadComponent lazyComponent={<VideoHero />} />
      <LazyLoadComponent lazyComponent={<SiteFeatures />} />
      <LazyLoadComponent lazyComponent={<NumberCounter />} />
      <LazyLoadComponent lazyComponent={<LongText />} />
      <LazyLoadComponent lazyComponent={<Testimonials />} />
      <LazyLoadComponent lazyComponent={<Services />} />
      <LazyLoadComponent lazyComponent={<BookNowCallToAction />} />
      <LazyLoadComponent lazyComponent={<Quote />} />
      <LazyLoadComponent lazyComponent={<Faq />} />
      <LazyLoadComponent lazyComponent={<HiringSection />} />
      <LazyLoadComponent lazyComponent={<Footer />} />
    </main>
  );
};

export default Home;
