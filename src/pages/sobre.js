// About.js
import LoadingScreen from "@/components/common/LoadingScreen/LoadingScreen";
import NavBar from "@/components/common/NavBar/NavBar";
import ServerDown from "@/components/common/ServerDown/ServerDown";
import Head from "next/head";
import React from "react";
import AboutHero from "@/components/page-content/about/AboutHero/AboutHero";
import LazyLoadComponent from "@/components/common/LazyLoadComponent/LazyLoadComponent";
import useCheckFetch from "@/hooks/useCheckFetch";
import History from "@/components/page-content/about/History/History";
import Footer from "@/components/common/Footer/Footer";
import Introduction from "@/components/page-content/about/Introduction/Introduction";
import Testimonials from "@/components/page-content/homepage/Testimonials/Testimonials";
import MeetOurTeam from "@/components/page-content/about/MeetOurTeam/MeetOurTeam";

const About = () => {
  const apiUrl = "https://not-cool.onrender.com/api/content-media?populate=*";
  const { loading, error } = useCheckFetch(apiUrl);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ServerDown />;
  }

  return (
    <div>
      <Head>
        <title>Sobre Nós | Doggy Daycare </title>
        <meta name="description" content="Change" />
      </Head>

      <NavBar />

      <LazyLoadComponent lazyComponent={<AboutHero />} />
      <LazyLoadComponent lazyComponent={<Introduction />} />
      <LazyLoadComponent lazyComponent={<History />} />
      <LazyLoadComponent lazyComponent={<MeetOurTeam />} />
      <LazyLoadComponent lazyComponent={<Testimonials />} />
      <LazyLoadComponent lazyComponent={<Footer />} />
    </div>
  );
};

export default About;
