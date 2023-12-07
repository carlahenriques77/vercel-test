import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SiteFeatures = () => {
  const urlToFetch =
    "http://localhost:1337/api/content-media?populate[SiteFeatures][populate][FeaturesRepetable][populate]=*";
  const { completeDataJSON: featuresData } = useDataFetching(urlToFetch);

  return (
    <>
      {!featuresData.data && (
        <div className="pulsate px-[24px] lg:px-[48px] gap-11 grid relative md:justify-items-center lg:grid-cols-3 lg:gap-7">
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="grid justify-items-center text-center gap-2 z-[100] h-fit md:gap-3"
            >
              <h3 className="text-skeletonLoading bg-skeletonLoading rounded-[12px] text-2xl font-bold uppercase xl:text-[1.625rem]">
                Lorem ipsum dolor
              </h3>

              <div className="bg-skeletonLoading p-4 rounded-[100%] bg-midnightBlack">
                <div className="h-[48px] w-[48px] xl:h-[60px] xl:w-[60px]"></div>
              </div>

              <p className="text-skeletonLoading bg-skeletonLoading rounded-[12px] font-medium xl:text-[1.125rem]">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Suscipit officiis temporibus excepturi, doloremque quidem
                recusandae.
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="px-[24px] lg:px-[48px] gap-11 grid relative md:justify-items-center lg:grid-cols-3 lg:gap-7">
        {featuresData.data && (
          <>
            <Image
              className="!absolute w-full md:!w-[50%]"
              src="/dog-paws.webp"
              alt="Marcas de patas de cachorro"
              width="0"
              height="0"
              unoptimized
              priority={true}
            />
            {featuresData.data.attributes.SiteFeatures.FeaturesRepetable.map(
              (mapItem) => (
                <div
                  className="grid justify-items-center text-center gap-2 z-[100] h-fit md:gap-3"
                  key={mapItem.id}
                >
                  <h3 className="text-primaryBlue text-2xl font-bold uppercase xl:text-[1.625rem]">
                    {mapItem.FeatureTitle}
                  </h3>

                  <div className="p-4 rounded-[100%] border-[3px] border-solid border-primaryBlue bg-midnightBlack">
                    <Image
                      className="h-[48px] w-[48px] xl:h-[60px] xl:w-[60px]"
                      src={`http://localhost:1337${mapItem.FeatureIcon.data.attributes.url}`}
                      alt={mapItem.ImageAlternativeTextForAccesibility}
                      width="48"
                      height="48"
                      unoptimized
                    />
                  </div>

                  <p className="font-medium xl:text-[1.125rem]">
                    {mapItem.FeatureDescription}
                  </p>
                </div>
              )
            )}
          </>
        )}
      </div>
    </>
  );
};

export default SiteFeatures;
