import Attribution from "@/components/utils/Attribution";
import Button from "@/components/utils/Button";
import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Testimonials = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/content-media?populate[Testimonials][populate]=*";
  const { completeDataJSON: testimonialsData } = useDataFetching(urlToFetch);

  return (
    <>
      {!testimonialsData.data && (
        <div className="pulsate bg-black25 mt-[72px] text-[white] flex flex-col py-[8%] gap-9 px-[24px] md:py-[4%] lg:px-[48px] lg:grid lg:grid-cols-2 lg:items-center">
          <div className="flex flex-col gap-4 xl:gap-5 sm:text-center sm:items-center lg:text-start lg:items-start">
            <h1 className="text-skeletonLoading bg-skeletonLoading rounded-[12px] w-fit text-[1.75rem]">
              Lorem ipsum, dolor sit amet.
            </h1>

            <p className="text-skeletonLoading bg-skeletonLoading rounded-[12px] xl:text-[1.125rem] sm:max-w-[600px]">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque
              pariatur quod tempore fugit! Corrupti aliquid minus
              necessitatibus.
            </p>

            {/* Button Skeleton */}
            <div className="!w-[72%] mt-[24px] text-skeletonLoading bg-skeletonLoading rounded-[12px] h-[28px]"></div>
          </div>

          {/* Image Skeleton */}
          <div className="h-[200px] w-[300px] mx-auto bg-skeletonLoading lg:w-full lg:h-full rounded-[12px]"></div>
        </div>
      )}

      {testimonialsData.data && (
        <>
          <div className="mt-[72px] bg-[url(/pattern.webp)] bg-repeat text-[white] flex flex-col py-[8%] gap-9 px-[24px] md:py-[4%] lg:px-[48px] lg:grid lg:grid-cols-2 lg:items-center">
            <div className="flex flex-col gap-4 xl:gap-5 sm:text-center sm:items-center lg:text-start lg:items-start">
              <h1 className="font-bold text-[1.75rem]">
                {testimonialsData.data.attributes.Testimonials.Title}
              </h1>

              <p className="font-semibold xl:text-[1.125rem] sm:max-w-[600px]">
                {
                  testimonialsData.data.attributes.Testimonials.Description[0]
                    .children[0].text
                }
              </p>

              <Button
                pageHref="/sobre"
                buttonText="Veja a historia de nossos clientes"
                buttonClassName="!mt-[24px] !bg-blueForText px-[28px] sm:w-fit sm:py-[16px] sm:px-[24px]"
              />
            </div>

            <Link
              href={"/testimonial"}
              className="block relative rounded-[12px] mx-auto sm:max-w-[600px]"
            >
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
            </Link>
          </div>
        </>
      )}
    </>
  );
};

export default Testimonials;
