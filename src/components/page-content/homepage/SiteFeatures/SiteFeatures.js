import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SiteFeatures = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/content-media?populate[SiteFeatures][populate][FeaturesRepetable][populate]=*";
  const { completeDataJSON: featuresData } = useDataFetching(urlToFetch);

  return (
    <>
      {featuresData.data ? (
        <>
          <h2 id="main-content" className="visually-hidden">Recursos Especiais do nosso Site</h2>

          <ul className="px-[24px] lg:px-[48px] gap-11 grid relative md:justify-items-center lg:grid-cols-3 lg:gap-7">
            <Image
              aria-hidden={true}
              className="!absolute w-full md:!w-[50%]"
              src="/dog-paws.webp"
              alt="Marcas de patas de cachorro"
              width="0"
              height="0"
              unoptimized
              priority={true}
            />

            {featuresData.data.attributes.SiteFeatures.FeaturesRepetable.map(
              (mapItem, itemIndex) => (
                <li
                  className="grid justify-items-center text-center gap-2 z-[100] h-fit md:gap-3"
                  key={mapItem.id}
                >
                  {itemIndex === 0 ? (
                    <h3 className="text-primaryBlue text-2xl font-bold uppercase xl:text-[1.625rem]">
                      {mapItem.FeatureTitle}
                    </h3>
                  ) : (
                    <h3 className="text-primaryBlue text-2xl font-bold uppercase xl:text-[1.625rem]">
                      {mapItem.FeatureTitle}
                    </h3>
                  )}

                  <div className="p-4 rounded-[100%] border-[3px] border-solid border-primaryBlue bg-midnightBlack">
                    <Image
                      aria-hidden={true}
                      className="h-[48px] w-[48px] xl:h-[60px] xl:w-[60px]"
                      src={`https://not-cool.onrender.com${mapItem.FeatureIcon.data.attributes.url}`}
                      alt={`Icone ${itemIndex}`}
                      width="48"
                      height="48"
                      unoptimized
                    />
                  </div>

                  <p className="font-medium xl:text-[1.125rem]">
                    {mapItem.FeatureDescription}
                  </p>
                </li>
              )
            )}
          </ul>
        </>
      ) : (
        <div
          aria-hidden="true"
          className=" px-[24px] lg:px-[48px] gap-11 grid relative md:justify-items-center lg:grid-cols-3 lg:gap-7"
        >
          {Array.from({ length: 3 }, (_, index) => (
            <div
              key={index}
              className="grid justify-items-center text-center gap-2 z-[100] h-fit md:gap-3"
            >
              <h3 className="text-skeletonLoading bg-skeletonLoading rounded-[12px] text-2xl font-bold uppercase xl:text-[1.625rem]">
                Lorem ipsum dolor
              </h3>

              <div className="p-4 rounded-[100%] bg-midnightBlack">
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
    </>
  );
};

export default SiteFeatures;
