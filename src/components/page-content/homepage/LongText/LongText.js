import Attribution from "@/components/utils/Attribution";
import Button from "@/components/utils/Button";
import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import React from "react";

const LongText = () => {
  const urlToFetch =
    "http://localhost:1337/api/content-media?populate[LongTextDescription][populate]=*";
  const { completeDataJSON: textData } = useDataFetching(urlToFetch);

  const urlToFetchImage =
    "http://localhost:1337/api/content-media?populate[LongTextDescription][populate][ThirdTextGroup][populate]=*";
  const { completeDataJSON: imageData } = useDataFetching(urlToFetchImage);

  return (
    <>
      {!textData.data && (
        <div className="pulsate px-[24px] lg:px-[48px] mt-[72px] flex flex-col gap-12">
          <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2">
            <div className="flex flex-col gap-4 xl:gap-5">
              <h1 className="text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1.5rem] xl:text-[1.625rem]">
                Lorem ipsum dolor sit amet.
              </h1>

              <p className="text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1rem] xl:text-[1.125rem]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Doloribus aliquid quisquam ad distinctio animi error delectus
                quae illo labore, saepe odio mollitia ipsum a, reprehenderit
                consectetur excepturi facere officia nihil.
              </p>
            </div>

            <div className="flex flex-col gap-4 xl:gap-5">
              <h1 className="text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1.5rem] xl:text-[1.625rem]">
                Lorem ipsum dolor sit amet.
              </h1>

              <p className="text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1rem] xl:text-[1.125rem]">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit.
                Doloribus aliquid quisquam ad distinctio animi error delectus
                quae illo labore, saepe odio mollitia ipsum a, reprehenderit
                consectetur excepturi facere officia nihil.
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="px-[24px] lg:px-[48px] mt-[72px]">
        {textData.data && (
          <>
            <div className="flex flex-col gap-12">
              <div className="flex flex-col gap-12 lg:grid lg:grid-cols-2">
                <div className="flex flex-col gap-4 xl:gap-5">
                  <h1 className="text-blueForText font-bold text-[1.5rem] xl:text-[1.625rem]">
                    {
                      textData.data.attributes.LongTextDescription
                        .FirstTextGroup.Title
                    }
                  </h1>

                  <p className="text-[1rem] xl:text-[1.125rem]">
                    {
                      textData.data.attributes.LongTextDescription
                        .FirstTextGroup.Description[0].children[0].text
                    }
                  </p>
                </div>

                <div className="flex flex-col gap-4 xl:gap-5">
                  <h1 className="text-blueForText font-bold text-[1.5rem] xl:text-[1.625rem]">
                    {
                      textData.data.attributes.LongTextDescription
                        .SecondTextGroup.Title
                    }
                  </h1>

                  <p className="text-[1rem] xl:text-[1.125rem]">
                    {
                      textData.data.attributes.LongTextDescription
                        .SecondTextGroup.Description[0].children[0].text
                    }
                  </p>
                </div>
              </div>

              <div className="flex flex-col gap-4 lg:grid lg:grid-cols-2">
                <div className="w-[272px] m-auto flex flex-col gap-1 text-center sm:w-[340px] lg:order-1">
                  {imageData.data && textData.data && (
                    <>
                      <Image
                        className="w-full"
                        src={`http://localhost:1337${imageData.data.attributes.LongTextDescription.ThirdTextGroup.IllustrationImage.data.attributes.formats.small.url}`}
                        alt={
                          imageData.data.attributes.LongTextDescription
                            .ThirdTextGroup.ImageAlternativeTextForAccesibility
                        }
                        width="0"
                        height="0"
                        unoptimized
                      />

                      <Attribution
                        sourceHref={
                          textData.data.attributes.LongTextDescription
                            .ThirdTextGroup.SourceLinkIfAny
                        }
                        attributionText={
                          textData.data.attributes.LongTextDescription
                            .ThirdTextGroup.AttributionIfAny
                        }
                        classNamesAndTextColor="text-black75 mt-[8px]"
                      />
                    </>
                  )}
                </div>

                <div className="mt-[12px] flex flex-col gap-[32px] lg:mt-[0px]">
                  <div className="flex flex-col gap-4 xl:gap-5">
                    <h1 className="text-blueForText font-bold text-[1.5rem] xl:text-[1.625rem]">
                      {
                        textData.data.attributes.LongTextDescription
                          .ThirdTextGroup.Title
                      }
                    </h1>

                    <p className="text-[1rem] xl:text-[1.125rem]">
                      {
                        textData.data.attributes.LongTextDescription
                          .ThirdTextGroup.Description[0].children[0].text
                      }
                    </p>
                  </div>

                  <Button
                    pageHref="/sobre"
                    buttonText="Leia mais sobre nós"
                    iconSrc="/book-icon.svg"
                    altText="Livro Icone"
                    buttonClassName="!mt-[0px]"
                  />
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default LongText;
