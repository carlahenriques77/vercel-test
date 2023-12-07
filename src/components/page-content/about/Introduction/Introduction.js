import useDataFetching from "@/hooks/useDataFetching";
import React from "react";

const Introduction = () => {
  const urlToFetch =
    "http://localhost:1337/api/about-page?populate[Introduction][populate]=*";
  const { completeDataJSON: introductionData } = useDataFetching(urlToFetch);

  return (
    <div className="px-[24px] lg:px-[48px] mb-[72px]">
      {introductionData.data && (
        <>
          <div className="flex flex-col gap-4 xl:gap-5 text-center items-center max-w-[600px] mx-auto relative before:bg-[url(/dog-toys.svg)] before:-z-20 before:content-[''] before:absolute before:w-[100px] before:h-[80px] before:bg-no-repeat before:bg-contain before:block before:-left-[0px] before:-top-[0px] before:-rotate-[16deg] after:bg-[url(/kids-toy.svg)] after:-z-20 after:content-[''] after:absolute after:w-[100px] after:h-[80px] after:bg-no-repeat after:bg-contain after:block after:-right-[0px] after:bottom-[0px] after:-rotate-[16deg] lg:before:w-[140px] lg:before:h-[140px] lg:after:w-[140px] lg:after:h-[140px]">
            <h1 className="w-fit text-primaryBlue font-bold text-[1.75rem]">
              {introductionData.data.attributes.Introduction.Title}
            </h1>

            <p className="font-medium text-[1rem] xl:text-[1.125rem]">
              {
                introductionData.data.attributes.Introduction.Description[0]
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
