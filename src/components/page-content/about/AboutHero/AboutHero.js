import Attribution from "@/components/utils/Attribution";
import useDataFetching from "@/hooks/useDataFetching";
import React, { useEffect, useState } from "react";

const AboutHero = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/about-page?populate[AboutHero][populate]=*";
  const { completeDataJSON: heroData } = useDataFetching(urlToFetch);

  return (
    <>
      {!heroData.data && (
        <div className="relative">
          <div className="mb-[72px] bg-skeletonLoading h-[70vh]"></div>
        </div>
      )}

      {heroData.data && (
        <div className="relative after:content-[''] after:absolute after:bg-[length:28px] after:w-full after:h-[8px] after:bg-[url(/vector-hill.svg)] after:bg-repeat-x after:-bottom-[2px]">
          <div
            style={{
              backgroundImage: `url(https://not-cool.onrender.com${heroData.data.attributes.AboutHero.BackgroundImage.data.attributes.formats.small.url}`,
              backgroundPosition: `${heroData.data.attributes.AboutHero.BackgroundPosition}`,
            }}
            className="mb-[72px] bg-midnightBlack h-[70vh] bg-cover bg-no-repeat"
          ></div>
        </div>
      )}
    </>
  );
};

export default AboutHero;
