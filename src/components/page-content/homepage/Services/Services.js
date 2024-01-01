import Attribution from "@/components/utils/Attribution";
import Button from "@/components/utils/Button";
import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import React from "react";

const Services = ({ handleImageClick }) => {
  const urlToFetch01 = `https://not-cool.onrender.com/api/services-collections?populate=*`;
  const { completeDataJSON: servicesData } = useDataFetching(urlToFetch01);

  const urlToFetch02 = `https://not-cool.onrender.com/api/content-media?populate=*`;
  const { completeDataJSON: pageData } = useDataFetching(urlToFetch02);

  return (
    <>
      {servicesData.data && pageData.data ? (
        <div className="px-[24px] lg:px-[48px] mt-[72px] flex flex-col gap-4 md:gap-8">
          <h2 className="text-primaryBlue font-bold text-[1.75rem]">
            {pageData.data.attributes.ServicesSection.SectionTitle}
          </h2>

          <hr aria-hidden="true" className="border-black25" />

          <div className="flex flex-col gap-[60px] md:gap-12">
            {servicesData.data &&
              servicesData.data.map((mapItem, itemIndex) => (
                <div
                  className={`flex flex-col gap-8 md:grid md:gap-8 md:items-center ${
                    itemIndex % 2 === 0
                      ? "md-grid-cols-2fr-1fr"
                      : "md-grid-cols-1fr-2fr"
                  }`}
                  key={mapItem.id}
                >
                  <div
                    className={`flex flex-col gap-3 md:order-1 xl:gap-4 ${
                      itemIndex % 2 === 0 ? "md:order-[1]" : "md:order-[0]"
                    }`}
                  >
                    <h3 className="text-primaryBlue font-bold text-[1.5rem] xl:text-[1.625rem]">
                      {mapItem.attributes.Title}
                    </h3>

                    <p className="font-medium xl:text-[1.125rem]">
                      {mapItem.attributes.Description[0].children[0].text}
                    </p>

                    <Button
                      pageHref={`/servicos/${mapItem.attributes.slug}`}
                      buttonText="Veja mais sobre"
                      iconSrc="/paw-icon.svg"
                      altText="Pata de cachorro Icone"
                      buttonClassName="xl:mt-[24px]"
                    />
                  </div>

                  <div className="overflow-hidden rounded-[8px]">
                    <Image
                      aria-hidden={true}
                      className="w-full cursor-zoom-in hover:scale-[1.2] transition-all"
                      src={`https://not-cool.onrender.com${mapItem.attributes.Image.data.attributes.formats.small.url}`}
                      alt={`Illustração Serviço ${itemIndex}`}
                      width="0"
                      height="0"
                      unoptimized
                      onClick={() => handleImageClick(itemIndex + 2)}
                    />
                  </div>
                </div>
              ))}
          </div>
        </div>
      ) : (
        <div aria-hidden="true" className=" px-[24px] lg:px-[48px] mt-[72px] flex flex-col gap-4 md:gap-8">
          <h2 className="text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1.75rem]">
            Lorem ipsum dolor
          </h2>

          <div className="flex flex-col gap-8 md:gap-12">
            {Array.from({ length: 3 }, (_, itemIndex) => (
              <div
                className={`flex flex-col gap-8 md:grid md:gap-8 md:items-center ${
                  itemIndex % 2 === 0
                    ? "md-grid-cols-2fr-1fr"
                    : "md-grid-cols-1fr-2fr"
                }`}
                key={itemIndex}
              >
                <div
                  className={`flex flex-col gap-3 md:order-1 xl:gap-4 ${
                    itemIndex % 2 === 0 ? "md:order-[1]" : "md:order-[0]"
                  }`}
                >
                  <h2 className="text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1.5rem] xl:text-[1.625rem]">
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit.
                  </h2>

                  <p className="text-skeletonLoading bg-skeletonLoading rounded-[12px] xl:text-[1.125rem]">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Similique est id voluptas laborum velit animi, rem commodi
                    exercitationem reprehenderit debitis, nam ab rerum magnam
                    placeat quasi optio ex facilis in?
                  </p>

                  {/* Button Skeleton */}
                  <div className="!w-[72%] mt-[24px] text-skeletonLoading bg-skeletonLoading rounded-[12px] h-[28px]"></div>
                </div>

                {/* Image Skeleton */}
                <div className="h-[200px] w-[300px] mx-auto bg-skeletonLoading lg:w-full lg:h-full rounded-[12px]"></div>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Services;
