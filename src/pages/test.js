import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const SiteFeatures = () => {
  const urlToFetch =
    "http://localhost:1337/api/content-media?populate[SiteFeatures][populate][FeaturesRepetable][populate]=*";
  const { completeDataJSON: featuresData } = useDataFetching(urlToFetch);

  return (
    <div>
      // Add a CSS class for the pulsating animation
      <style jsx>{`
        .pulsate {
          animation: pulsate 1.5s ease-in-out infinite;
        }

        @keyframes pulsate {
          0% {
            opacity: 0.8;
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 0.8;
          }
        }
      `}</style>
      // Apply the class to the elements you want to pulsate
      <div
        className={`bg-skeletonLoading h-[48px] w-[48px] xl:h-[60px] xl:w-[60px] pulsate`}
      ></div>
    </div>
  );
};

export default SiteFeatures;
