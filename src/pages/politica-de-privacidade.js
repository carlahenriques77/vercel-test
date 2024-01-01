import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar/NavBar";
import Head from "next/head";
import React from "react";

const privacyPolicyContent = {
  title: "Política de Privacidade",
  description:
    "Bem-vindo à nossa Política de Privacidade. Esta página informa sobre as práticas de coleta, uso e divulgação de informações quando você usa nosso serviço.",
  sections: [
    {
      heading: "1. Informações que Coletamos",
      content: [
        "1.1 Reservas Falsas: Ao criar uma reserva fictícia, coletamos informações como nome e endereço de e-mail para processar a reserva.",
        "1.2 Formulário de Contato: Quando você utiliza nosso formulário de contato, coletamos as informações fornecidas para responder às suas consultas.",
      ],
    },
    {
      heading: "2. Uso das Informações",
      content: [
        "2.1 Processamento de Reservas: Utilizamos as informações fornecidas nas reservas fictícias para processar e confirmar as reservas.",
        "2.2 Respostas a Consultas: As informações do formulário de contato são usadas para responder às suas perguntas e solicitações.",
      ],
    },
    {
      heading: "3. Armazenamento de Dados",
      content: [
        "3.1 Local de Armazenamento: As informações são armazenadas de forma segura em nossos servidores.",
        "3.2 Medidas de Segurança: Implementamos medidas de segurança para proteger as informações contra acesso não autorizado.",
      ],
    },
    {
      heading: "4. Comunicações por E-mail",
      content: [
        "4.1 Confirmação de Reservas: Podemos enviar e-mails de confirmação relacionados às reservas fictícias.",
        "4.2 Outras Comunicações: Podemos enviar e-mails relacionados a atualizações ou informações importantes sobre nossos serviços.",
      ],
    },
    {
      heading: "5. Compartilhamento de Informações",
      content: [
        "5.1 Terceiros: Não compartilhamos suas informações com terceiros, exceto quando necessário para os fins descritos nesta política.",
      ],
    },
    {
      heading: "6. Alterações nesta Política",
      content: [
        "6.1 Atualizações: Podemos atualizar nossa política de privacidade periodicamente. Recomendamos que você revise esta página regularmente para ficar informado sobre quaisquer alterações.",
      ],
    },
    {
      heading: "7. Contato",
      content: [
        "7.1 Dúvidas: Se tiver dúvidas sobre esta política, entre em contato conosco através do formulário disponível em nosso site.",
      ],
    },
  ],
};

const PrivacyPolicy = () => {
  return (
    <div>
      <Head>
        <title>Política de Privacidade | Doggy Daycare</title>
        <meta
          name="description"
          content="Saiba mais sobre como a Doggy Daycare protege a privacidade dos usuários. Leia nossa Política de Privacidade para entender como coletamos, usamos e protegemos suas informações pessoais durante a navegação em nosso site."
        />
      </Head>

      <NavBar />

      <div className="px-[24px] lg:px-[48px] my-[72px]">
        <div>
          <h1 className="text-[1.75rem] font-bold">
            {privacyPolicyContent.title}
          </h1>

          <p className="mt-[12px] text-[1.375rem] font-medium">
            {privacyPolicyContent.description}
          </p>
        </div>

        <hr className="my-[32px] border-black75" />

        {privacyPolicyContent.sections.map((section, index) => (
          <div key={index}>
            <h2 className="text-[1.5rem] font-semibold">{section.heading}</h2>

            <ul className="grid gap-[8px] mt-[12px]">
              {section.content.map((item, itemIndex) => (
                <li key={itemIndex}>
                  <p className="text-[1.125rem]">{item}</p>
                </li>
              ))}
            </ul>

            {index !== privacyPolicyContent.sections.length - 1 && (
              <hr className="my-[32px] border-black75" />
            )}
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
