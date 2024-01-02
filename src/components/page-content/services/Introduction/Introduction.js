import useDataFetching from "@/hooks/useDataFetching";
import React from "react";

const Introduction = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/services-page?populate[Introduction][populate]=*";
  const { completeDataJSON: contentData } = useDataFetching(urlToFetch);

  return (
    <div className="px-[24px] lg:px-[48px] mb-[72px]">
      {contentData.data && (
        <>
          <div className="flex flex-col gap-4 xl:gap-5">
            <h2
              id="main-content"
              className="w-fit text-primaryBlue font-bold text-[1.75rem]"
            >
              {contentData.data.attributes.Introduction.Title}
            </h2>

            <p className="max-w-[800px] font-medium text-[1rem] ">
              {
                contentData.data.attributes.Introduction.Description[0]
                  .children[0].text
              }
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Introduction;
