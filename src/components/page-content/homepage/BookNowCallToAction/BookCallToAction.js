import Button from "@/components/utils/Button";
import useDataFetching from "@/hooks/useDataFetching";
import React from "react";

const BookNowCallToAction = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/content-media?populate[BookNow][populate]=*";
  const { completeDataJSON: contentData } = useDataFetching(urlToFetch);

  return (
    <>
      {contentData.data ? (
        <div className="mt-[72px] flex flex-col gap-7">
          <div className="flex flex-col gap-[12px] text-center">
            <div
              className={
                "relative pt-3 pb-3 after:bg-[url(/dog-walking-paws.webp)] after:content-[''] after:absolute after:w-full after:h-full after:bg-repeat-x after:-z-10 after:bg-center after:left-0 after:top-0"
              }
            >
              <h2 className="text-primaryBlue font-bold text-[1.75rem] px-[24px] lg:px-[48px] ">
                {contentData.data.attributes.BookNow.Title}
              </h2>
            </div>

            <p className="font-bold px-[24px] md:mx-auto md:w-[80%] lg:px-[48px] ">
              {
                contentData.data.attributes.BookNow.Description[0].children[0]
                  .text
              }
            </p>
          </div>

          <div className="px-[24px] mt-[12px] lg:px-[48px] grid sm:grid-cols-2 gap-[16px] sm:mx-auto md:w-[60%] lg:w-[50%]">
            <Button
              pageHref="/reservar"
              buttonText="Reservar Agora"
              iconSrc="/calendar-icon.svg"
              altText="Calendario Icone"
              buttonClassName="!w-full mt-[0px] !border-midnightBlack"
            />

            <Button
              pageHref="/mapa"
              buttonText="Conheça Nossas Instalações"
              iconSrc="/map-icon.svg"
              altText="Mapa Icone"
              buttonClassName="!w-full !bg-midnightBlack mt-[0px]"
            />
          </div>
        </div>
      ) : (
        <div
          aria-hidden="true"
          className=" px-[24px] lg:px-[48px] mt-[72px] flex flex-col gap-7"
        >
          <div className="flex flex-col gap-[12px] text-center">
            <div className="flex justify-center relative py-3">
              <h2 className="w-fit text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1.75rem] px-[24px] lg:px-[48px] ">
                Lorem ipsum dolor sit
              </h2>
            </div>

            <p className="text-skeletonLoading bg-skeletonLoading rounded-[12px] px-[24px] md:mx-auto md:w-[80%] lg:px-[48px] ">
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Excepturi nesciunt natus unde dolorem voluptas. Sit architecto,
              facere.
            </p>
          </div>

          <div className="mt-[12px] grid grid-cols-2 gap-2 sm:gap-[16px] sm:mx-auto md:w-[60%] lg:w-[50%]">
            {/* Button Skeleton */}
            <div className="w-full text-skeletonLoading bg-skeletonLoading rounded-[12px] h-[40px]"></div>

            {/* Button Skeleton */}
            <div className="w-full text-skeletonLoading bg-skeletonLoading rounded-[12px] h-[40px]"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default BookNowCallToAction;
