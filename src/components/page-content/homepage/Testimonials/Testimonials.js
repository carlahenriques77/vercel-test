import Button from "@/components/utils/Button";
import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const Testimonials = ({
  extraClassName,
  skeletonClassName,
  handleImageClick,
}) => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/content-media?populate[Testimonials][populate]=*";
  const { completeDataJSON: contentData } = useDataFetching(urlToFetch);

  return (
    <>
      {contentData.data ? (
        <>
          <div
            className={`mt-[72px] bg-[url(/pattern.webp)] bg-repeat text-[white] flex flex-col py-[8%] gap-9 px-[24px] md:py-[4%] lg:px-[48px] lg:grid lg:grid-cols-2 lg:items-center ${extraClassName}`}
          >
            <div className="flex flex-col gap-4 xl:gap-5 sm:text-center sm:items-center lg:text-start lg:items-start">
              <h2 className="font-bold text-[1.75rem]">
                {contentData.data.attributes.Testimonials.Title}
              </h2>

              <p className="font-semibold  sm:max-w-[600px]">
                {
                  contentData.data.attributes.Testimonials.Description[0]
                    .children[0].text
                }
              </p>

              <Button
                pageHref="/depoimentos"
                iconSrc="/eye-icon.svg"
                altText="Olho Icone"
                buttonText="Veja a historia de nossos clientes"
                buttonClassName="!mt-[24px] !bg-blueForText border-navyBlue px-[28px] sm:w-fit sm:py-[16px] sm:px-[24px]"
              />
            </div>

            <Link
              tabIndex={-1}
              href={"/depoimentos"}
              className="block relative rounded-[12px] mx-auto sm:max-w-[600px] border-solid border-skyBlue border-[4px] xl:width-[88%] xl:max-w-[100%]"
            >
              <Image
                aria-hidden="true"
                className="w-full rounded-[12px]"
                src={`https://not-cool.onrender.com${contentData.data.attributes.Testimonials.Image.data.attributes.formats.small.url}`}
                alt="Depoimentos Illustração"
                width="0"
                height="0"
                unoptimized
                onClick={() => handleImageClick(1)}
              />

              <div
                style={{
                  backgroundColor: `rgba(0, 0, 0, 0.${contentData.data.attributes.Testimonials.GlassOverlayTransparency})`,
                }}
                className="w-full h-full absolute top-0 rounded-[12px] bg-transparent-hover hover:scale-[1.2] transition-all"
              ></div>
            </Link>
          </div>
        </>
      ) : (
        <div
          aria-hidden="true"
          className={`bg-black25 mt-[72px] text-[white] flex flex-col py-[8%] gap-9 px-[24px] md:py-[4%] lg:px-[48px] lg:grid lg:grid-cols-2 lg:items-center ${skeletonClassName}`}
        >
          <div className="flex flex-col gap-4 xl:gap-5 sm:text-center sm:items-center lg:text-start lg:items-start">
            <h2 className="text-skeletonLoading bg-skeletonLoading rounded-[12px] w-fit text-[1.75rem]">
              Lorem ipsum, dolor sit amet.
            </h2>

            <p className="text-skeletonLoading bg-skeletonLoading rounded-[12px]  sm:max-w-[600px]">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cumque
              pariatur quod tempore fugit! Corrupti aliquid minus
              necessitatibus.
            </p>

            {/* Button Skeleton */}
            <div className="!w-[72%] mt-[24px] text-skeletonLoading bg-skeletonLoading rounded-[12px] h-[28px]"></div>
          </div>

          {/* Image Skeleton */}
          <div className="h-[200px] w-full mx-auto bg-skeletonLoading lg:w-full lg:h-full rounded-[12px]"></div>
        </div>
      )}
    </>
  );
};

export default Testimonials;
