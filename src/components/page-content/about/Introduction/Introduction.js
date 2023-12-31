import useDataFetching from "@/hooks/useDataFetching";
import React from "react";

const Introduction = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/about-page?populate[Introduction][populate]=*";
  const { completeDataJSON: introductionData } = useDataFetching(urlToFetch);

  return (
    <div className="px-[24px] lg:px-[48px] mb-[72px]">
      {introductionData.data ? (
        <>
          <div className="flex flex-col gap-4 xl:gap-5 max-w-[800px] relative after:bg-[url(/kids-toy.svg)] after:-z-20 after:content-[''] after:absolute after:w-[100px] after:h-[80px] after:bg-no-repeat after:bg-contain after:block after:-right-[0px] after:bottom-[0px] after:-rotate-[16deg] lg:after:w-[140px] lg:after:h-[140px]">
            <h1
              id="main-content"
              className="w-fit text-primaryBlue font-bold text-[1.75rem]"
            >
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
      ) : (
        <>
          <div className=" px-[24px] lg:px-[48px] mt-[72px] flex flex-col gap-7">
            <div className="flex flex-col gap-[12px] text-center">
              <div className="flex justify-center relative py-3">
                <h1 className="w-fit text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1.75rem] px-[24px] lg:px-[48px] ">
                  Lorem ipsum dolor sit
                </h1>
              </div>

              <p className="text-skeletonLoading bg-skeletonLoading rounded-[12px] px-[24px] md:mx-auto md:w-[80%] lg:px-[48px] xl:text-[1.125rem]">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi nesciunt natus unde dolorem voluptas. Sit architecto,
                facere.
              </p>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Introduction;
