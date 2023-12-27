import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar/NavBar";
import CallToActionBooking from "@/components/common/CallToAction/CallToActionBooking";
import Benefits from "@/components/page-content/open-positions/Benefits/Benefits";
import MainContent from "@/components/page-content/open-positions/MainContent/MainContent";
import PositionsHero from "@/components/page-content/open-positions/PositionsHero/PositionsHero";
import ViewAboutUs from "@/components/page-content/open-positions/ViewAboutUs/ViewAboutUs";
import WorkersTestimonials from "@/components/page-content/open-positions/WorkersTestimonials/WorkersTestimonials";
import Head from "next/head";
import React from "react";
import LazyLoadComponent from "@/components/common/LazyLoadComponent/LazyLoadComponent";
import useCheckFetch from "@/hooks/useCheckFetch";
import LoadingScreen from "@/components/common/LoadingScreen/LoadingScreen";
import ServerDown from "@/components/common/ServerDown/ServerDown";
import CallToActionContact from "@/components/common/CallToAction/CallToActionContact";

const Vagas = () => {
  const apiUrl =
    "https://not-cool.onrender.com/api/open-positions-page?populate=*";
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
        <title>Vagas | Doggy Daycare</title>
        <meta name="description" content="" />
      </Head>

      <NavBar />

      <LazyLoadComponent lazyComponent={<PositionsHero />} />
      <LazyLoadComponent lazyComponent={<MainContent />} />
      <LazyLoadComponent lazyComponent={<Benefits />} />
      <LazyLoadComponent lazyComponent={<ViewAboutUs />} />
      <LazyLoadComponent lazyComponent={<WorkersTestimonials />} />
      <LazyLoadComponent lazyComponent={<CallToActionContact />} />
      <LazyLoadComponent lazyComponent={<Footer />} />
    </div>
  );
};

export default Vagas;
