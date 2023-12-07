import Attribution from "@/components/utils/Attribution";
import Button from "@/components/utils/Button";
import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import React from "react";

const Services = () => {
  const urlToFetch =
    "http://localhost:1337/api/content-media?populate[ServicesSection][populate][ServicesText][populate]=*";
  const { completeDataJSON: servicesData } = useDataFetching(urlToFetch);

  return (
    <>
      {!servicesData.data && (
        <div className="px-[24px] lg:px-[48px] mt-[72px] flex flex-col gap-4 md:gap-8">
          <h1 className="text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1.75rem]">
            Lorem ipsum dolor
          </h1>

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

      {servicesData.data && (
        <div className="px-[24px] lg:px-[48px] mt-[72px] flex flex-col gap-4 md:gap-8">
          <h1 className="text-primaryBlue font-bold text-[1.75rem]">
            {servicesData.data.attributes.ServicesSection.SectionTitle}
          </h1>

          <div className="flex flex-col gap-8 md:gap-12">
            {servicesData.data.attributes.ServicesSection.ServicesText.map(
              (mapItem, itemIndex) => (
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
                    <h2 className="text-blueForText font-bold text-[1.5rem] xl:text-[1.625rem]">
                      {mapItem.Title}
                    </h2>

                    <p className="font-medium xl:text-[1.125rem]">
                      {mapItem.Description}
                    </p>

                    <Button
                      pageHref="/servicos"
                      buttonText="Veja mais sobre"
                      iconSrc="/paw-icon.svg"
                      altText="Pata de cachorro Icone"
                      buttonClassName="xl:mt-[24px]"
                    />
                  </div>

                  <div>
                    <Image
                      className="rounded-[8px]"
                      src={`http://localhost:1337${mapItem.Image.data.attributes.formats.small.url}`}
                      alt={mapItem.ImageAlternativeTextForAccesibility}
                      width="0"
                      height="0"
                      unoptimized
                      style={{ width: "100%" }}
                    />

                    <div className="text-center mt-2">
                      <Attribution
                        sourceHref={mapItem.ImageSourceIfAny}
                        attributionText={mapItem.ImageAttributionIfAny}
                        classNamesAndTextColor="text-black75"
                      />
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Services;
