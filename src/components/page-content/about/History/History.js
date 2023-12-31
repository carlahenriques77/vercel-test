import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import React from "react";
import Attribution from "@/components/utils/Attribution";

const History = ({ handleImageClick }) => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/about-page?populate[YourHistory][populate][RepeatableFields][populate]=*";
  const { completeDataJSON: ourHistoryData } = useDataFetching(urlToFetch);

  return (
    <div className="mb-[72px]">
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

      {ourHistoryData.data ? (
        <div className="py-[12%] sm:py-[8%] md:py-[4%] grid gap-12 bg-midnightBlack text-[white] px-[24px] lg:px-[48px]">
          {ourHistoryData.data.attributes.YourHistory.RepeatableFields.map(
            (mapItem, itemIndex) => (
              <div
                className={`grid gap-8 sm:max-w-[640px] sm:items-center sm:mx-auto sm:text-center lg:grid-cols-2 lg:text-start lg:!max-w-fit lg:mx-none`}
                key={mapItem.id}
              >
                <div
                  className={`flex flex-col gap-4 xl:gap-5 ${
                    itemIndex % 2 === 0 ? "md:order-[1]" : "md:order-[0]"
                  }`}
                >
                  <h1
                    className={`font-bold text-[24px] xl:text-[1.625rem] ${
                      itemIndex % 2 === 0 ? "text-crimsonRed" : "text-skyBlue"
                    }`}
                  >
                    {mapItem.Title}
                  </h1>

                  <p className="xl:text-[1.125rem]">
                    {mapItem.Description[0].children[0].text}
                  </p>
                </div>

                <div className="overflow-hidden">
                  <Image
                    aria-hidden={true}
                    className="block w-full h-full rounded-[12px] cursor-zoom-in hover:scale-[1.2] transition-all"
                    src={`https://not-cool.onrender.com${mapItem.Image.data.attributes.formats.medium.url}`}
                    alt={`Illustração ${itemIndex}`}
                    width="0"
                    height="0"
                    unoptimized
                    onClick={() => handleImageClick(itemIndex)}
                  />
                </div>
              </div>
            )
          )}
        </div>
      ) : (
        <div className="px-[24px] lg:px-[48px] flex flex-col gap-4 md:gap-8 bg-midnightBlack py-[48px]">
          <div className=" flex flex-col gap-8 md:gap-12">
            {Array.from({ length: 3 }, (_, itemIndex) => (
              <div
                className={`flex flex-col gap-8 md:grid md:gap-8 md:items-center ${
                  itemIndex % 2 === 0
                    ? "md-grid-cols-2fr-1fr"
                    : "md-grid-cols-1fr-2fr"
                }`}
                key={itemIndex}
              >
                <div
                  className={`flex flex-col gap-3 md:order-1 xl:gap-4 ${
                    itemIndex % 2 === 0 ? "md:order-[1]" : "md:order-[0]"
                  }`}
                >
                  <h2 className="text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1.5rem] xl:text-[1.625rem]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </h2>

                  <p className="text-skeletonLoading bg-skeletonLoading rounded-[12px] xl:text-[1.125rem]">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Similique est id voluptas laborum velit animi, rem commodi
                    exercitationem reprehenderit debitis, nam ab rerum magnam
                    placeat quasi optio ex facilis in?
                  </p>
                </div>

                {/* Image Skeleton */}
                <div className="h-[200px] w-[300px] mx-auto bg-skeletonLoading lg:w-full lg:h-full rounded-[12px]"></div>
              </div>
            ))}
          </div>
        </div>
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

export default History;
