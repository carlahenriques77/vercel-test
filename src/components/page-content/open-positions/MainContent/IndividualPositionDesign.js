import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Button from "@/components/utils/Button";
import { useRouter } from "next/router";
import useDataFetching from "@/hooks/useDataFetching";
import useDataFetchSlug from "@/hooks/useDataFetchSlug";

const IndividualPositionDesign = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [loading, setLoading] = useState(true);
  const [videoData, setVideoData] = useState(null);
  const [socialIconsData, setSocialIconsData] = useState(null);

  const urlToFetch01 = `https://not-cool.onrender.com/api/open-positions?filters[slug]=${slug}&populate[ContentTextRepeatable][populate]=*`;
  const { completeDataJSON: completeDataJSON01 } = useDataFetchSlug(
    urlToFetch01,
    { slug }
  );

  const urlToFetch02 = `https://not-cool.onrender.com/api/open-positions?filters[slug]=${slug}&populate[ShareOnSocialNetworkOptional][populate]=*`;
  const { completeDataJSON: completeDataJSON02 } = useDataFetchSlug(
    urlToFetch02,
    { slug }
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      setVideoData(completeDataJSON01);
      setSocialIconsData(completeDataJSON02);
      setLoading(false);
    };

    fetchData();
  }, [slug, completeDataJSON01, completeDataJSON02]);

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    };
    return new Date(dateString).toLocaleDateString("pt-BR", options);
  };

  return (
    <>
      {videoData &&
      videoData.data &&
      socialIconsData &&
      socialIconsData.data &&
      !loading ? (
        <>
          {videoData.data?.map((mapItem, itemIndex) => (
            <div
              className="px-[24px] lg:px-[48px] mt-[72px] pb-[72px] bg-[url(/curvy-background.svg)] bg-repeat flex flex-col gap-[62px]"
              key={mapItem.id}
            >
              <div className="flex flex-col gap-[32px]">
                <div className="flex flex-col gap-[16px]">
                  <Link
                    id="main-content"
                    href={"/vagas"}
                    className="text-primaryBlue font-bold flex gap-2 items-center hover:underline "
                  >
                    <Image
                      className="rounded-[8px] w-[20px] h-[20px]"
                      src={`/left-arrow-icon.svg`}
                      alt="Flecha Apontando para a Esquerda Icone"
                      width="0"
                      height="0"
                      unoptimized
                    />
                    Voltar para a Página de Vagas
                  </Link>

                  <div className="flex flex-col gap-[12px]">
                    <div>
                      <h1 className="text-crimsonRed text-[1.75rem] font-bold">
                        {mapItem.attributes.JobTitle}{" "}
                        {mapItem.attributes.TitleAddonText}
                      </h1>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col gap-[62px] lg:grid md-grid-cols-2fr-1fr">
                  <div className="h-fit text-[black] px-[16px] py-[24px] rounded-[8px] shadow-xl border-primaryBlue bg-[white] border-[2px] border-solid flex flex-col gap-[16px] md:max-w-[400px] lg:order-1 lg:max-w-full">
                    <div>
                      <p className="text-[black] font-bold flex flex-col gap-1">
                        {" "}
                        Postado em:{" "}
                        <span className="font-normal text-black75">
                          {formatDate(mapItem.attributes.publishedAt)}
                        </span>
                      </p>
                    </div>

                    <div>
                      <p className="text-[black] font-bold flex flex-col gap-1">
                        Tipo de Trabalho:{" "}
                        <span className="font-normal text-black75">
                          {mapItem.attributes.EmploymentType}
                        </span>
                      </p>
                    </div>

                    <div>
                      <p className="text-[black] font-bold flex flex-col gap-1">
                        Experiencia:{" "}
                        <span className="font-normal text-black75">
                          {mapItem.attributes.Experience}
                        </span>
                      </p>
                    </div>

                    <div className="flex flex-col gap-1">
                      <p className="text-[black] font-bold">
                        Compatilhe esse Anuncio!
                      </p>

                      <ul className="flex items-center gap-2 mt-[16px] sm:mt-0">
                        {socialIconsData.data[0]?.attributes.ShareOnSocialNetworkOptional.map(
                          (mapItem) => (
                            <li key={mapItem.id}>
                              <Link
                                className="block bg-[black] pt-[6px] pb-[6px] pr-1 pl-1 rounded-[4px] w-[32px] hover:brightness-[80%]"
                                href={mapItem.Link}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label={`Abrir ${mapItem.ImageAlternativeTextForAccesibility} em uma nova página`}
                              >
                                <Image
                                  className="w-full h-[20px]"
                                  src={`https://not-cool.onrender.com${mapItem.Icon.data.attributes.url}`}
                                  alt={
                                    mapItem.ImageAlternativeTextForAccesibility
                                  }
                                  width="0"
                                  height="0"
                                  unoptimized
                                />
                              </Link>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div>
                      <p className="text-[black] font-bold flex flex-col gap-1">
                        Localidade:{" "}
                        <span className="mt-[4px] uppercase py-[6px] px-[16px] bg-skyBlue rounded-[8px] text-[white] font-bold w-fit border-solid border-skyBlue border-[2px]">
                          {mapItem.attributes.JobLocation}
                        </span>
                      </p>
                    </div>

                    <Button
                      pageHref={mapItem.attributes.UrlToExternalJobPage}
                      buttonText={mapItem.attributes.ButtonText}
                      iconSrc="/paw-icon.svg"
                      altText="Pata de cachorro Icone"
                      buttonClassName="!mt-[0px] max-w-[600px] !bg-midnightBlack"
                    />
                  </div>

                  <div className="flex flex-col gap-[28px]">
                    {mapItem.attributes.ContentTextRepeatable.map(
                      (contentItem) => (
                        <div
                          className="flex flex-col gap-[12px]"
                          key={contentItem.id}
                        >
                          <h2 className="text-skyBlue text-[1.5rem] font-bold">
                            {contentItem.Title}
                          </h2>

                          {contentItem.Description.map((paragraph, index) => (
                            <p key={index}>
                              {paragraph.children.map((child, childIndex) => (
                                <React.Fragment key={childIndex}>
                                  {child.type === "text" && child.text}
                                </React.Fragment>
                              ))}
                            </p>
                          ))}
                        </div>
                      )
                    )}

                    <Button
                      pageHref={mapItem.attributes.UrlToExternalJobPage}
                      buttonText={mapItem.attributes.ButtonText}
                      iconSrc="/paw-icon.svg"
                      altText="Pata de cachorro Icone"
                      buttonClassName="!mt-[0px] max-w-[600px] !bg-midnightBlack"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      ) : (
        <>
          <div className="px-[24px] lg:px-[48px] mt-[72px] pb-[72px]   flex flex-col gap-[62px]">
            <div className="flex flex-col gap-[32px]">
              <div className="flex flex-col gap-[16px]">
                <div className="bg-skeletonLoading text-skeletonLoading w-fit">
                  Lorem ipsum dolor sit
                </div>

                <div className="flex flex-col gap-[12px]">
                  <div>
                    <h1 className="bg-skeletonLoading text-skeletonLoading w-fit text-[1.75rem]">
                      Lorem ipsum dolor sit amet
                    </h1>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-[62px] lg:grid md-grid-cols-2fr-1fr">
                <div className="bg-skeletonLoading text-skeletonLoading  h-fit px-[16px] py-[24px] rounded-[8px] flex flex-col gap-[16px] md:max-w-[400px] lg:order-1 lg:max-w-full">
                  {Array.from({ length: 4 }, (_, itemIndex) => (
                    <div className="flex flex-col gap-1" key={itemIndex}>
                      <p className="bg-skeletonLoading text-skeletonLoading w-fit">
                        Lorem ipsum{" "}
                      </p>

                      <p className="bg-skeletonLoading text-skeletonLoading w-fit">
                        Lorem
                      </p>
                    </div>
                  ))}

                  {/* Button Skeleton */}
                  <div className="!w-[40%] mt-[24px] text-skeletonLoading bg-skeletonLoading h-[36px] rounded-[8px]"></div>
                </div>

                <div className="flex flex-col gap-[28px]">
                  {Array.from({ length: 4 }, (_, itemIndex) => (
                    <div className="flex flex-col gap-[12px]" key={itemIndex}>
                      <h2 className="text-[1.5rem] bg-skeletonLoading text-skeletonLoading w-fit">
                        Lorem ipsum dolor sit
                      </h2>

                      <p className="bg-skeletonLoading text-skeletonLoading w-fit">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Exercitationem repellat ipsum totam beatae aliquam vitae
                        ex officia id. Et, eum eveniet! Facilis at dolores
                        voluptates iste amet. Delectus, voluptatibus corporis?
                      </p>
                    </div>
                  ))}

                  {/* Button Skeleton */}
                  <div className="!w-[40%] mt-[24px] text-skeletonLoading bg-skeletonLoading h-[36px] rounded-[8px]"></div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default IndividualPositionDesign;
