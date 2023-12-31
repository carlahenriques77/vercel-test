import useDataFetching from "@/hooks/useDataFetching";
import React from "react";

const ServiceDescription = ({ videoData }) => {
  return (
    <div className="px-[24px] lg:px-[48px] my-[72px]">
      {videoData.data && (
        <>
          {videoData.data?.map((mapItem, itemIndex) => (
            <div className="flex flex-col gap-[12px]" key={mapItem.id}>
              <h2 className="w-fit text-[black] font-bold text-[24px]">
                Descrição:
              </h2>

              <p className="max-w-[800px] font-medium text-[1rem] xl:text-[1.125rem]">
                {mapItem.attributes.Description[0].children[0].text}
              </p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default ServiceDescription;
