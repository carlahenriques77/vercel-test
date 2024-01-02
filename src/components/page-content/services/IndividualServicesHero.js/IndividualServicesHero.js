import HeroSection from "@/components/common/HeroSection/HeroSection";
import useDataFetching from "@/hooks/useDataFetching";
import React from "react";

const IndividualServicesHero = ({ contentData01 }) => {
  return (
    <>
      {contentData01.data && (
        <>
          {contentData01.data?.map((mapItem, itemIndex) => (
            <div
              key={mapItem.id}
              style={{
                backgroundImage: `url(https://not-cool.onrender.com${mapItem.attributes.Image.data.attributes.url})`,
                backgroundPosition: `${mapItem.attributes.BackgroundPosition}`,
              }}
              className={`hero-shadow bg-cover mb-[72px] bg-skeletonLoading w-full bg-no-repeat relative border-b-[4px] border-solid border-[black] h-[70vh]`}
            ></div>
          ))}
        </>
      )}
    </>
  );
};

export default IndividualServicesHero;
