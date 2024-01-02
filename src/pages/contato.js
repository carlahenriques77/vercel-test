import Footer from "@/components/common/Footer/Footer";
import LoadingScreen from "@/components/common/LoadingScreen/LoadingScreen";
import NavBar from "@/components/common/NavBar/NavBar";
import ServerDown from "@/components/common/ServerDown/ServerDown";
import Contact from "@/components/page-content/contact/Contact";
import useCheckFetch from "@/hooks/useCheckFetch";
import Head from "next/head";
import React from "react";

const Contato = () => {
  const apiUrl = "https://not-cool.onrender.com/api/locations-maps?populate=*";
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
        <title>Contato | Doggy Daycare</title>
        <meta
          name="description"
          content="Entre em contato com a Doggy Daycare para tirar suas dúvidas, enviar sugestões ou relatar qualquer problema. Estamos aqui para oferecer informações e assistência sobre nossos serviços dedicados ao bem-estar dos seus pets."
        />
      </Head>

      <NavBar />

      <Contact />

      <Footer />
    </div>
  );
};

export default Contato;
