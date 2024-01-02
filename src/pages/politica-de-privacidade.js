import Footer from "@/components/common/Footer/Footer";
import LoadingScreen from "@/components/common/LoadingScreen/LoadingScreen";
import NavBar from "@/components/common/NavBar/NavBar";
import ServerDown from "@/components/common/ServerDown/ServerDown";
import useCheckFetch from "@/hooks/useCheckFetch";
import useDataFetching from "@/hooks/useDataFetching";
import Head from "next/head";
import React from "react";

const PrivacyPolicy = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/terms-and-privacy-policy?populate[PrivacyPolicy][populate]=*";
  const { completeDataJSON: contentData } = useDataFetching(urlToFetch);

  const apiUrl =
    "https://not-cool.onrender.com/api/terms-and-privacy-policy?populate[PrivacyPolicy][populate]=*";
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
        <title>Política de Privacidade | Doggy Daycare</title>
        <meta
          name="description"
          content="Saiba mais sobre como a Doggy Daycare protege a privacidade dos usuários. Leia nossa Política de Privacidade para entender como coletamos, usamos e protegemos suas informações pessoais durante a navegação em nosso site."
        />
      </Head>

      <NavBar />

      {contentData.data ? (
        <div className="px-[24px] lg:px-[48px] my-[72px]">
          <div>
            <h1 className="text-[1.75rem] font-bold">
              Política de Privacidade
            </h1>

            <p className="mt-[12px] text-[1.375rem] font-medium">
              Bem-vindo à nossa Política de Privacidade. Esta página informa
              sobre as práticas de coleta, uso e divulgação de informações
              quando você usa nosso serviço.
            </p>
          </div>

          <hr className="my-[32px] border-black75" />

          {contentData.data.attributes.PrivacyPolicy.TitleAndDescription.map(
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
                  contentData.data.attributes.PrivacyPolicy.TitleAndDescription
                    .length -
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

export default PrivacyPolicy;
