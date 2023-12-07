import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import React from "react";

const History = () => {
  const urlToFetch =
    "http://localhost:1337/api/about-page?populate[YourHistory][populate][RepeatableFields][populate]=*";
  const { completeDataJSON: ourHistoryData } = useDataFetching(urlToFetch);

  return (
    <div className="mb-[72px]">
      <Image
        className="w-full block"
        src="/wave.svg"
        alt="Onda"
        width="0"
        height="0"
        unoptimized
        priority={true}
      />

      <div className="grid gap-12 bg-midnightBlack text-[white] px-[24px] lg:px-[48px]">
        {ourHistoryData.data &&
          ourHistoryData.data.attributes.YourHistory.RepeatableFields.map(
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

                  <p className="font-medium xl:text-[1.125rem]">
                    {mapItem.Description[0].children[0].text}
                  </p>
                </div>

                <div>
                  <Image
                    className="block w-full h-full rounded-[12px]"
                    src={`http://localhost:1337${mapItem.Image.data.attributes.formats.small.url}`}
                    alt={mapItem.ImageAlternativeTextForAccesibility}
                    width="0"
                    height="0"
                    unoptimized
                  />
                </div>
              </div>
            )
          )}
      </div>

      <Image
        className="w-full block scale-y-[-1]"
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
