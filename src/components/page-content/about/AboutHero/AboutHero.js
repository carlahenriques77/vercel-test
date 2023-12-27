import HeroSection from "@/components/common/HeroSection/HeroSection";
import HeroTextBox from "@/components/utils/HeroTextBox";
import useDataFetching from "@/hooks/useDataFetching";
import React, { useEffect, useState } from "react";

const AboutHero = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/about-page?populate[HeroBaseUtils][populate]=*";
  const { completeDataJSON: heroData } = useDataFetching(urlToFetch);

  return (
    <>
      {heroData.data ? (
        <>
          <HeroSection
            backgroundImage={`https://not-cool.onrender.com${heroData.data.attributes.HeroBaseUtils.BackgroundImage.data.attributes.url}`}
            backgroundPosition={
              heroData.data.attributes.HeroBaseUtils.BackgroundPosition
            }
            backgroundOverlay={
              heroData.data.attributes.HeroBaseUtils.BackgroundOverlay
            }
            title={heroData.data.attributes.HeroBaseUtils.HeroText.Title}
            description={
              heroData.data.attributes.HeroBaseUtils.HeroText.Description
            }
          />
        </>
      ) : (
        <div className="relative">
          <div className="mb-[72px] bg-black75 h-[70vh]">
            <div
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -60%)",
              }}
              className="absolute text-skeletonLoading text-center flex flex-col gap-[12px] bg-skeletonLoading rounded-[8px] border-solid border-skeletonLoading border-[2px] p-[16px] select-none"
            >
              <h1 className="text-[18px] md:text-[20px] lg:text-[24px] text-skeletonLoading">
                Lorem ipsum
              </h1>

              <p className="hidden lg:block text-[16px] text-skeletonLoading">
                Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                Sapiente tempore perferendis consectetur unde ad velit nisi
                necessitatibus
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default AboutHero;
