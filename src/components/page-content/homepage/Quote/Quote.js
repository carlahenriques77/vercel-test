import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const Quote = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/content-media?populate[QuoteDivider][populate]=*";
  const { completeDataJSON: quoteData } = useDataFetching(urlToFetch);

  return (
    <>
      {!quoteData.data && (
        <div className="pulsate bg-black25 rounded-[12px] mt-[72px] text-skeletonLoading bg-skeletonLoading rounded-[12px] flex justify-center items-center relative">
          <h1 className="text-skeletonLoading bg-skeletonLoading text-center text-[1.5rem] xl:text-[1.625rem] my-[12%] text-[white] rounded-[12px]">
            Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          </h1>
        </div>
      )}

      {quoteData.data && (
        <div className="mt-[72px]">
          <div
            style={{
              backgroundImage: `url(https://not-cool.onrender.com${quoteData.data.attributes.QuoteDivider.BackgroundImage.data.attributes.formats.small.url})`,
            }}
            className="bg-no-repeat bg-cover bg-center flex justify-center items-center relative bg-fixed"
          >
            <div
              style={{
                backgroundColor: `rgba(0, 0, 0, 0.${quoteData.data.attributes.QuoteDivider.GlassOverlayTransparency})`,
              }}
              className="w-[100%] h-[100%] px-[24px] lg:px-[48px]"
            >
              <h1 className="text-center text-shadow-black text-[1.5rem] xl:text-[1.625rem] my-[12%] font-bold text-[white]">
                {quoteData.data.attributes.QuoteDivider.Quote}
              </h1>

              <Image
                style={{
                  top: "100%",
                  left: "50%",
                  transform: "translate(-50%, -45%)",
                }}
                className="absolute w-[200px] md:w-[30%]"
                src="/trail-and-ball.svg"
                alt="Bolinha de tennis"
                width="0"
                height="0"
                unoptimized
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Quote;
