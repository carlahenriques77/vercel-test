import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar/NavBar";
import CallToActionBooking from "@/components/common/CallToAction/CallToActionBooking";
import Testimonials from "@/components/page-content/homepage/Testimonials/Testimonials";
import Introduction from "@/components/page-content/services/Introduction/Introduction";
import ServicesHero from "@/components/page-content/services/ServicesHero/ServicesHero";
import ServicesList from "@/components/page-content/services/ServicesList/ServicesList";
import React from "react";
import Head from "next/head";
import useCheckFetch from "@/hooks/useCheckFetch";
import LoadingScreen from "@/components/common/LoadingScreen/LoadingScreen";
import ServerDown from "@/components/common/ServerDown/ServerDown";
import LazyLoadComponent from "@/components/common/LazyLoadComponent/LazyLoadComponent";

const Servicos = () => {
  const apiUrl = "https://not-cool.onrender.com/api/services-page?populate=*";
  const { loading, error } = useCheckFetch(apiUrl);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ServerDown />;
  }

  return (
    <div className="bg-[#F5F5F5]">
      <Head>
        <title>Serviços | Doggy Daycare</title>
        <meta name="description" content="" />
      </Head>

      <NavBar />

      <ServicesHero />

      <Introduction />

      <ServicesList />

      <Testimonials extraClassName="border-t-[4px] border-solid border-skyBlue" />

      <Footer />
    </div>
  );
};

export default Servicos;
