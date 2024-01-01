import React from "react";
import Button from "./Button";

const SuccessMessage = () => {
  return (
    <div className="h-[100vh] bg-[#f5f5f5] justify-center items-center flex">
      <div className="grid gap-[24px] w-full text-center bg-[black] px-[24px] lg:px-[48px] py-[48px] z-50">
        <h1
          role="alert"
          aria-live="assertive"
          id="main-content"
          className="font-bold text-primaryBlue text-[1.75rem]"
        >
          Mensagem Enviada com Sucesso! <br aria-hidden="true" /> Entraremos em
          contato o mais rapido possível. <br aria-hidden="true" />{" "}
          <span className="text-[1.25rem] text-deepMaroon">
            Por favor, check seu Email
          </span>
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
  );
};

export default SuccessMessage;
