import React from "react";
import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar/NavBar";
import Head from "next/head";
import useDataFetching from "@/hooks/useDataFetching";
import LoadingScreen from "@/components/common/LoadingScreen/LoadingScreen";
import ServerDown from "@/components/common/ServerDown/ServerDown";
import useCheckFetch from "@/hooks/useCheckFetch";

const TermsAndConditions = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/terms-and-privacy-policy?populate[TermsAndConditions][populate]=*";
  const { completeDataJSON: contentData } = useDataFetching(urlToFetch);

  const apiUrl =
    "https://not-cool.onrender.com/api/terms-and-privacy-policy?populate[TermsAndConditions][populate]=*";
  const { loading, error } = useCheckFetch(apiUrl);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ServerDown />;
  }

  http: return (
    <div>
      <Head>
        <title>Termos e Condições | Creche para Cães</title>
        <meta
          name="description"
          content="Consulte os termos e condições da Creche para Cães para garantir uma estadia segura e agradável para o seu companheiro peludo. Conheça nossas políticas e normas para proporcionar o melhor cuidado."
        />
      </Head>

      <NavBar />

      {contentData.data ? (
        <div className="px-[24px] lg:px-[48px] my-[72px]">
          <div>
            <h1 className="text-[1.75rem] font-bold">Termos e Condições</h1>

            <p className="mt-[12px] text-[1.375rem] font-medium">
              Bem-vindo aos nossos Termos e Condições. Este documento informa
              sobre as regras e diretrizes ao usar nosso Site.
            </p>
          </div>

          <hr className="my-[32px] border-black75" />

          {contentData.data.attributes.TermsAndConditions.TitleAndDescription.map(
            (mapItem, index) => (
              <div key={mapItem.id}>
                <h2 className="text-[1.5rem] font-semibold">{mapItem.Title}</h2>

                <ul className="grid gap-[8px] mt-[12px]">
                  {mapItem.Description.map((paragraph, index) => (
                    <li key={index}>
                      <p className="text-[1.125rem]">
                        {paragraph.children.map((child, childIndex) => (
                          <React.Fragment key={childIndex}>
                            {child.type === "text" && child.text}
                          </React.Fragment>
                        ))}
                      </p>
                    </li>
                  ))}
                </ul>

                {index !==
                  contentData.data.attributes.TermsAndConditions
                    .TitleAndDescription.length -
                    1 && (
                  <hr aria-hidden="true" className="my-[32px] border-black75" />
                )}
              </div>
            )
          )}
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="px-[24px] lg:px-[48px] my-[72px] text-skeletonLoading"
        >
          <h1 className="w-fit bg-skeletonLoading text-[24px]">
            Lorem ipsum dolor
          </h1>

          <p className="w-fit bg-skeletonLoading mt-[12px]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Harum quo
            vitae perspiciatis nobis exercitationem error ipsam laudantium
            consequuntur libero corrupti. Nam, quibusdam ratione cum amet eaque
            ipsa. Distinctio, nulla iste!
          </p>

          <hr className="my-[32px] border-black25" />

          <ul className="grid gap-[8px] mt-[12px]">
            {Array.from({ length: 4 }, (_, itemIndex) => (
              <div key={itemIndex}>
                <li>
                  <h2 className="w-fit bg-skeletonLoading text-[24px]">
                    Lorem ipsum dolor
                  </h2>
                  <ul className="grid gap-[8px] mt-[12px]">
                    {Array.from({ length: 4 }, (_, itemIndex) => (
                      <li className="w-fit bg-skeletonLoading" key={itemIndex}>
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Non amet tempora velit commodi deserunt nobis nisi. Vel,
                        accusamus quae? Veniam quaerat assumenda quidem aliquid
                        impedit perferendis deleniti quasi odit exercitationem.
                      </li>
                    ))}
                  </ul>
                </li>

                {itemIndex !== 3 && (
                  <hr aria-hidden="true" className="my-[32px] border-black25" />
                )}
              </div>
            ))}
          </ul>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default TermsAndConditions;
