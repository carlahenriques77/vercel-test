import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar/NavBar";
import Button from "@/components/utils/Button";
import ConfettiComponent from "@/components/utils/ConfettiComponent";
import React from "react";

const sucesso = () => {
  return (
    <div>
      <NavBar />

      <ConfettiComponent />

      <div className="h-[100vh] bg-[#f5f5f5] justify-center items-center flex">
        <div className="grid gap-[24px] w-full text-center bg-[black] px-[24px] lg:px-[48px] py-[48px] z-50">
          <h1 className="font-bold text-primaryBlue text-[28px]">
            Mensagem Enviada com Sucesso! <br /> Entraremos em contato o mais
            rapido possível. <br /> <span className="text-[20px] text-deepMaroon">Psssh! Check seu Email</span>
          </h1>

          <Button
            pageHref="/"
            iconSrc="/right-arrow-icon-black.svg"
            altText="Flecha Icone"
            buttonText="Voltar para a Página inicial"
            buttonClassName="w-fit px-[32px] mx-auto !bg-[white] !text-[black] border-navyBlue"
          />
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default sucesso;
