import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import React from "react";
import { useState } from "react";

const Benefits = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/open-positions-page?populate[Benefits][populate][RepeatableFields][populate]=*";
  const { completeDataJSON: contentData } = useDataFetching(urlToFetch);

  return (
    <div className="my-[72px]">
      <Image
        aria-hidden={true}
        className="w-full block"
        src="/wave.svg"
        alt="Onda"
        width="0"
        height="0"
        unoptimized
        priority={true}
      />

      {contentData.data ? (
        <>
          <div className="py-[12%] sm:py-[8%] md:py-[4%] lg:py-[2%] grid gap-[24px] bg-midnightBlack text-[rgb(138,117,117)] px-[24px] lg:px-[48px]">
            <h2 className="text-skyBlue font-bold text-[1.75rem]">
              {contentData.data.attributes.Benefits.Title}
            </h2>

            <ul
              className={`grid gap-8 sm:items-center sm:mx-auto sm:grid-cols-2 lg:!max-w-fit lg:mx-none`}
            >
              {contentData.data.attributes.Benefits.RepeatableFields.map(
                (mapItem, itemIndex) => (
                  <li
                    className={`flex flex-col gap-3 xl:gap-4`}
                    key={mapItem.id}
                  >
                    <h3 className={`text-[white] font-bold text-[1.375rem] `}>
                      {mapItem.Title}
                    </h3>

                    <p className="text-white75 font-medium ">
                      {mapItem.Description[0].children[0].text}
                    </p>
                  </li>
                )
              )}
            </ul>
          </div>
        </>
      ) : (
        <>
          <div
            aria-hidden="true"
            className="px-[24px] lg:px-[48px] grid gap-8 bg-midnightBlack py-[48px]"
          >
            <h1 className="text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1.5rem]  w-fit">
              Lorem ipsum
            </h1>

            <div className="gap-8 md:gap-12 grid md:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 8 }, (_, itemIndex) => (
                <div
                  className={`flex flex-col gap-8 md:grid md:gap-8 md:items-center`}
                  key={itemIndex}
                >
                  <div className={`flex flex-col gap-3 md:order-1 xl:gap-4`}>
                    <h2 className="text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1.5rem] ">
                      Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                    </h2>

                    <p className="text-skeletonLoading bg-skeletonLoading rounded-[12px] ">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Similique est id voluptas laborum velit animi, rem commodi
                      exercitationem reprehenderit debitis, nam ab rerum magnam
                      placeat quasi optio ex facilis in?
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </>
      )}

      <Image
        aria-hidden={true}
        className="w-full block scale-y-[-1.02]"
        src="/wave.svg"
        alt="Onda"
        width="0"
        height="0"
        unoptimized
        priority={true}
      />
    </div>
  );
};

export default Benefits;
