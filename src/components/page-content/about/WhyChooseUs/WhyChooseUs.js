import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import React from "react";

const WhyChooseUs = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/about-page?populate[WhyUs][populate][RepeatableFields][populate]=*";
  const { completeDataJSON: whyUsData } = useDataFetching(urlToFetch);

  return (
    <>
      {whyUsData.data ? (
        <div className="px-[24px] lg:px-[48px] mb-[72px]">
          <h1 className="text-center text-primaryBlue font-bold text-[1.75rem] mb-[36px]">
            {whyUsData.data.attributes.WhyUs.Title}
          </h1>

          <div className="grid gap-[16px]">
            {whyUsData.data.attributes.WhyUs.RepeatableFields.map(
              (mapItem, itemIndex) => (
                <div
                  key={mapItem.id}
                  className="gradient-blue-red p-[4px] break-inside-avoid rounded-[12px]"
                >
                  <div className="flex flex-col rounded-[12px] gap-2 md:gap-3 bg-[black] p-[24px] text-[white]">
                    <h2 className="text-skyBlue text-[1.5rem] font-bold xl:text-[1.625rem] w-full">
                      {mapItem.Title}
                    </h2>

                    <p className="text-[white] xl:text-[1.125rem]">
                      {mapItem.Description[0].children[0].text}
                    </p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <div className="px-[24px] lg:px-[48px] mb-[124px]">
          <h1 className="w-fit rounded-[8px] text-skeletonLoading bg-skeletonLoading text-center font-bold text-[1.75rem] mb-[36px] mx-auto">
            Lorem ipsum dolor
          </h1>

          <div className="md:columns-2 lg:columns-3">
            {Array.from({ length: 6 }, (_, itemIndex) => (
              <div
                key={itemIndex}
                className="mb-[16px] p-[4px] break-inside-avoid rounded-[12px]"
              >
                <div className="flex flex-col rounded-[12px] gap-2 md:gap-3 bg-black50 p-[24px] text-[white]">
                  <h3 className="w-fit rounded-[8px] text-skeletonLoading bg-skeletonLoading text-[1.5rem] font-bold xl:text-[1.625rem]">
                    Lorem ipsum
                  </h3>

                  <p className="rounded-[8px] text-skeletonLoading bg-skeletonLoading font-medium xl:text-[1.125rem]">
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                    Error natus, harum quasi voluptatibus ea a facere voluptates
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default WhyChooseUs;
