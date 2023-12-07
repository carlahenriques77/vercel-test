import Attribution from "@/components/utils/Attribution";
import useDataFetching from "@/hooks/useDataFetching";
import React, { useEffect, useState } from "react";

const VideoHero = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/content-media?populate[HeroSection][populate][HeroVideosFormats][populate]=*";
  const { completeDataJSON: videoData } = useDataFetching(urlToFetch);

  return (
    <>
      {!videoData.data && (
        <>
          <div className="pulsate relative">
            <div className="mb-[72px] bg-skeletonLoading h-[70vh]"></div>
          </div>
        </>
      )}

      {videoData.data && (
        <div className="mb-[72px]">
          <div className="relative after:content-[''] after:absolute after:bg-[length:28px] after:w-full after:h-[8px] after:bg-[url(/vector-hill.svg)] after:bg-repeat-x after:-bottom-[2px]">
            <video
              autoPlay
              muted
              loop
              className="w-full object-cover h-[70vh] bg-midnightBlack"
            >
              <source
                src={`https://not-cool.onrender.com${videoData.data.attributes.HeroSection.HeroVideosFormats.MP4VideoForTheHeroSection.data.attributes.url}`}
                type="video/mp4"
              />
              <source
                src={`https://not-cool.onrender.com${videoData.data.attributes.HeroSection.HeroVideosFormats.WebmVideoForTheHeroSection.data.attributes.url}`}
                type="video/webm"
              />
              Your browser does not support the video tag.
            </video>
          </div>

          <div className="px-[24px] lg:px-[48px] text-center mt-[8px]">
            <Attribution
              sourceHref={
                videoData.data.attributes.HeroSection.HeroVideosFormats
                  .VideoSourceLinkIfAny
              }
              attributionText={
                videoData.data.attributes.HeroSection.HeroVideosFormats
                  .VideoAttributionIfAny
              }
              classNamesAndTextColor="text-black75"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default VideoHero;
