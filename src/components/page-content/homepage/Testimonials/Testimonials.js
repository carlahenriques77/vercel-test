import Attribution from "@/components/utils/Attribution";
import PrimaryButton from "@/components/utils/PrimaryButton";
import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import React, { useEffect, useState } from "react";

const Testimonials = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/content-media?populate[Testimonials][populate]=*";
  const { completeDataJSON: testimonialsData } = useDataFetching(urlToFetch);

  return (
    <div className="mt-[72px] bg-[url(/pattern.webp)] bg-repeat text-[white] flex flex-col py-[8%] gap-9 px-[24px] md:py-[4%] lg:px-[48px] lg:grid lg:grid-cols-2 lg:items-center">
      {testimonialsData.data && (
        <>
          <div className="flex flex-col gap-4 xl:gap-5 sm:text-center sm:items-center lg:text-start lg:items-start">
            <h1 className="font-bold text-[28px]">
              {testimonialsData.data.attributes.Testimonials.Title}
            </h1>

            <p className="font-semibold xl:text-[18px] sm:max-w-[600px]">
              {
                testimonialsData.data.attributes.Testimonials.Description[0]
                  .children[0].text
              }
            </p>

            <PrimaryButton
              pageHref="/sobre"
              buttonText="Veja a historia de nossos clientes"
              iconSrc="/eye-icon.svg"
              altText="Olho Icone"
              buttonClassName="!mt-[24px] !bg-blueForText sm:w-fit sm:py-[16px] sm:px-[24px]"
            />
          </div>

          <div className="relative rounded-[12px] mx-auto sm:max-w-[600px]">
            <Image
              className="w-full rounded-[12px]"
              src={`https://not-cool.onrender.com${testimonialsData.data.attributes.Testimonials.Image.data.attributes.formats.small.url}`}
              alt={
                testimonialsData.data.attributes.Testimonials
                  .ImageAlternativeTextForAccesibility
              }
              width="0"
              height="0"
              unoptimized
            />

            <div
              style={{
                backgroundColor: `rgba(0, 0, 0, 0.${testimonialsData.data.attributes.Testimonials.GlassOverlayTransparency})`,
              }}
              className="w-full h-full absolute top-0 rounded-[12px] bg-transparent-hover"
            ></div>
          </div>
        </>
      )}
    </div>
  );
};

export default Testimonials;
