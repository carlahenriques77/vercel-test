import React from "react";
import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar/NavBar";
import Head from "next/head";

const termsAndConditionsContent = {
  title: "Termos e Condições",
  description:
    "Bem-vindo aos nossos Termos e Condições. Este documento informa sobre as regras e diretrizes ao usar nosso serviço.",
  sections: [
    {
      heading: "1. Uso do Serviço",
      content: [
        "1.1 Aceitação: Ao utilizar nosso serviço, você concorda com os termos e condições estabelecidos neste documento.",
        "1.2 Responsabilidade: Você é responsável por todas as atividades realizadas através de sua conta.",
      ],
    },
    {
      heading: "2. Reservas Fictícias",
      content: [
        "2.1 Criação: Ao fazer reservas fictícias, você concorda em fornecer informações precisas e completas.",
        "2.2 Cancelamento: Reservamo-nos o direito de cancelar reservas fictícias a nosso critério.",
      ],
    },
    {
      heading: "3. Conduta do Usuário",
      content: [
        "3.1 Proibido: É proibido utilizar nosso serviço para atividades ilegais, prejudiciais ou que violem estes termos.",
        "3.2 Respeito: Exigimos que todos os usuários tratem outros com respeito e cortesia.",
      ],
    },
    {
      heading: "4. Alterações nos Termos",
      content: [
        "4.1 Atualizações: Reservamo-nos o direito de atualizar estes termos periodicamente. Recomendamos que os revise regularmente.",
      ],
    },
    {
      heading: "5. Contato",
      content: [
        "5.1 Dúvidas: Se tiver dúvidas sobre estes termos, entre em contato conosco através do formulário disponível em nosso site.",
      ],
    },
  ],
};

const TermsAndConditions = () => {
  return (
    <div>
      <Head>
        <title>Termos e Condições | Creche para Cães</title>
        <meta
          name="description"
          content="Consulte os termos e condições da Creche para Cães para garantir uma estadia segura e agradável para o seu companheiro peludo. Conheça nossas políticas e normas para proporcionar o melhor cuidado."
        />
      </Head>

      <NavBar />

      <div className="px-[24px] lg:px-[48px] my-[72px]">
        <div>
          <h1 className="text-[28px] font-bold">
            {termsAndConditionsContent.title}
          </h1>

          <p className="mt-[12px] text-[22px] font-medium">
            {termsAndConditionsContent.description}
          </p>
        </div>

        <hr className="my-[32px] border-black75" />

        {termsAndConditionsContent.sections.map((section, index) => (
          <div key={index}>
            <h2 className="text-[24px] font-semibold">{section.heading}</h2>

            <ul className="grid gap-[8px] mt-[12px]">
              {section.content.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <p className="text-[18px]">{item}</p>
                </li>
              ))}
            </ul>

            {index !== termsAndConditionsContent.sections.length - 1 && (
              <hr className="my-[32px] border-black75" />
            )}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
