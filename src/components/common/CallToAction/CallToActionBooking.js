import Attribution from "@/components/utils/Attribution";
import Button from "@/components/utils/Button";
import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const CallToActionBooking = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/about-page?populate[CallToAction][populate]=*";
  const { completeDataJSON: callToActionData } = useDataFetching(urlToFetch);

  return (
    <>
      {callToActionData.data ? (
        <>
          <div className="bg-[url(/pattern.webp)] bg-repeat text-[white] flex flex-col py-[8%] gap-9 px-[24px] md:py-[4%] lg:px-[48px] lg:items-center border-solid border-[black] border-t-[4px]">
            <div className="flex flex-col gap-4 xl:gap-5 md:text-center ,md:items-center">
              <h1 className="w-full font-bold text-[1.75rem]">
                {callToActionData.data.attributes.CallToAction.Title}
              </h1>

              <p className="font-semibold xl:text-[1.125rem] sm:max-w-[600px] md:mx-auto">
                {
                  callToActionData.data.attributes.CallToAction.Description[0]
                    .children[0].text
                }
              </p>

              <Button
                pageHref="/mapa"
                iconSrc="/map-icon.svg"
                altText="Mapa Icone"
                buttonText="Encontrar Localizações Próximas"
                buttonClassName="!mt-[24px] px-[28px] sm:w-fit sm:py-[16px] sm:px-[24px] md:mx-auto"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="text-skeletonLoading bg-black50 flex flex-col justify-center items-center relative gap-[16px] p-[32px]">
          <h1 className="text-skeletonLoading bg-skeletonLoading text-center text-[1.5rem] xl:text-[1.625rem] rounded-[8px]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </h1>

          <p className="rounded-[8px] text-skeletonLoading bg-skeletonLoading font-semibold max-w-[600px] mx-auto xl:text-[1.125rem]">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Expedita
            sint atque ad cumque quis maxime, voluptatibus exercitationem
            nostrum delectus ut modi asperiores repudiandae molestiae placeat
            non ipsa, ea nobis. Illo.
          </p>

          {/* Button Skeleton */}
          <div className="!w-[72%] mt-[24px] text-skeletonLoading bg-skeletonLoading rounded-[8px] max-w-[300px] h-[32px]"></div>
        </div>
      )}
    </>
  );
};

export default CallToActionBooking;
