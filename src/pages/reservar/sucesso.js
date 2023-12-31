import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar/NavBar";
import Button from "@/components/utils/Button";
import ConfettiComponent from "@/components/utils/ConfettiComponent";
import SuccessMessage from "@/components/utils/SuccessMessage";
import Head from "next/head";
import React, { useEffect, useRef } from "react";

const sucesso = () => {
  return (
    <div>
      <Head>
        <title>Mensagem Enviada com Sucesso! | Doggy Daycare</title>
      </Head>

      <NavBar />

      <ConfettiComponent />

      <SuccessMessage />

      <Footer />
    </div>
  );
};

export default sucesso;
