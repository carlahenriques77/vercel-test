import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import React, { useState } from "react";

const MeetOurTeam = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/about-page?populate[YourTeam][populate][WorkerInformation][populate]=*";
  const { completeDataJSON: teamData } = useDataFetching(urlToFetch);

  const [clickedItem, setClickedItem] = useState(null);

  const handleClick = (itemIndex) => {
    setClickedItem((prevClickedItem) =>
      prevClickedItem === itemIndex ? null : itemIndex
    );
  };

  return (
    <>
      {teamData.data ? (
        <div className="my-[72px] px-[24px] lg:px-[48px]" aria-hidden={true}>
          <h1 className="text-center text-[black] font-bold text-[1.75rem]">
            {teamData.data.attributes.YourTeam.Title}
          </h1>

          <div className="mt-[28px] grid items-center justify-center gap-[16px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {teamData.data.attributes.YourTeam.WorkerInformation.map(
              (mapItem, itemIndex) => (
                <div
                  key={mapItem.id}
                  className="hover-bg relative cursor-zoom-in"
                  onClick={() => handleClick(itemIndex)}
                >
                  <Image
                    className="object-cover block w-[300px] h-[300px] sm:w-full"
                    src={`https://not-cool.onrender.com${mapItem.WorkerImage.data.attributes.formats.small.url}`}
                    alt={`Trabalhador da Creche Illustração ${itemIndex}`}
                    width={300}
                    height={300}
                    unoptimized
                  />

                  <div
                    className={`hover-bg text-[white] p-[12px] bottom-0 w-full absolute rounded-b-[8px] flex-col gap-[8px] font-bold text-center h-[45%] bg-midnightBlack ${
                      clickedItem === itemIndex ? "!hidden" : "!flex"
                    }`}
                  >
                    <Image
                      className="top-[-148px] w-[40px] h-[40px] absolute"
                      src="/cursor-click.svg"
                      alt="Cursor"
                      width={300}
                      height={300}
                      unoptimized
                    />

                    <p className="text-[1.125rem]">{mapItem.Name}</p>

                    <div className="text-white75 flex flex-col gap-[4px]">
                      <span>{mapItem.Role}</span>
                      <span>{mapItem.FacilityLocation}</span>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="my-[72px] px-[24px] lg:px-[48px]">
          <h1 className="w-fit rounded-[8px] text-skeletonLoading bg-skeletonLoading text-center font-bold text-[1.75rem] mb-[36px] mx-auto">
            Lorem ipsum dolor
          </h1>

          <div className="md:columns-2 lg:columns-4">
            {Array.from({ length: 8 }, (_, itemIndex) => (
              <div
                key={itemIndex}
                className="mb-[16px] p-[4px] break-inside-avoid rounded-[12px]"
              >
                <div className="flex flex-col rounded-[12px] gap-2 md:gap-3 bg-black50 p-[24px] text-[white] h-[250px]"></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default MeetOurTeam;
