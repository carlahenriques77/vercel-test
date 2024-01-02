import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import React from "react";

const WhyChooseUs = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/about-page?populate[WhyUs][populate][RepeatableFields][populate]=*";
  const { completeDataJSON: contentData } = useDataFetching(urlToFetch);

  return (
    <>
      {contentData.data ? (
        <div className="px-[24px] lg:px-[48px] mb-[72px]">
          <h2 className="text-center text-primaryBlue font-bold text-[1.75rem] mb-[36px]">
            {contentData.data.attributes.WhyUs.Title}
          </h2>

          <ul className="grid gap-[16px]">
            {contentData.data.attributes.WhyUs.RepeatableFields.map(
              (mapItem, itemIndex) => (
                <li
                  key={mapItem.id}
                  className="gradient-blue-red p-[4px] break-inside-avoid rounded-[12px]"
                >
                  <div className="flex flex-col rounded-[12px] gap-2 md:gap-3 bg-[black] p-[24px] text-[white]">
                    <h3 className="text-skyBlue text-[1.5rem] font-bold  w-full">
                      {mapItem.Title}
                    </h3>

                    <p className="text-[white] ">
                      {mapItem.Description[0].children[0].text}
                    </p>
                  </div>
                </li>
              )
            )}
          </ul>
        </div>
      ) : (
        <div aria-hidden="true" className="px-[24px] lg:px-[48px] mb-[124px]">
          <h2 className="w-fit rounded-[8px] text-skeletonLoading bg-skeletonLoading text-center font-bold text-[1.75rem] mb-[36px] mx-auto">
            Lorem ipsum dolor
          </h2>

          <div className="md:columns-2 lg:columns-3">
            {Array.from({ length: 6 }, (_, itemIndex) => (
              <div
                key={itemIndex}
                className="mb-[16px] p-[4px] break-inside-avoid rounded-[12px]"
              >
                <div className="flex flex-col rounded-[12px] gap-2 md:gap-3 bg-black50 p-[24px] text-[white]">
                  <h3 className="w-fit rounded-[8px] text-skeletonLoading bg-skeletonLoading text-[1.5rem] font-bold ">
                    Lorem ipsum
                  </h3>

                  <p className="rounded-[8px] text-skeletonLoading bg-skeletonLoading font-medium ">
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
