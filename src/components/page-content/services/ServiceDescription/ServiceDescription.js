import useDataFetching from "@/hooks/useDataFetching";
import React from "react";

const ServiceDescription = ({ contentData01 }) => {
  return (
    <div className="px-[24px] lg:px-[48px] my-[72px]">
      {contentData01.data && (
        <>
          {contentData01.data?.map((mapItem, itemIndex) => (
            <div className="flex flex-col gap-[12px]" key={mapItem.id}>
              <h2 className="w-fit text-[black] font-bold text-[1.5rem]">
                Descrição:
              </h2>

              <p className="max-w-[800px] font-medium text-[1rem] ">
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
