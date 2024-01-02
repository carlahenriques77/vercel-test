import HeroSection from "@/components/common/HeroSection/HeroSection";
import HeroTextBox from "@/components/utils/HeroTextBox";
import useDataFetching from "@/hooks/useDataFetching";
import React, { useEffect, useState } from "react";

const AboutHero = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/about-page?populate[HeroBaseUtils][populate]=*";
  const { completeDataJSON: contentData } = useDataFetching(urlToFetch);

  return (
    <>
      {contentData.data ? (
        <>
          <HeroSection
            backgroundImage={`https://not-cool.onrender.com${contentData.data.attributes.HeroBaseUtils.BackgroundImage.data.attributes.url}`}
            backgroundPosition={
              contentData.data.attributes.HeroBaseUtils.BackgroundPosition
            }
            backgroundOverlay={
              contentData.data.attributes.HeroBaseUtils.BackgroundOverlay
            }
            title={contentData.data.attributes.HeroBaseUtils.HeroText.Title}
            description={
              contentData.data.attributes.HeroBaseUtils.HeroText.Description
            }
          />
        </>
      ) : (
        <div aria-hidden="true" className="relative">
          <div className="mb-[72px] bg-black75 h-[70vh]">
            <div
              style={{
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -60%)",
              }}
              className="absolute text-skeletonLoading text-center flex flex-col gap-[12px] bg-skeletonLoading rounded-[8px] border-solid border-skeletonLoading border-[2px] p-[16px] select-none"
            >
              <h2 className="text-[1.125rem] md:text-[1.25rem] lg:text-[1.5rem] text-skeletonLoading">
                Lorem ipsum
              </h2>

              <p className="hidden lg:block text-[1rem] text-skeletonLoading">
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
