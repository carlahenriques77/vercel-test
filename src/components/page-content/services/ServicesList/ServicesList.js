import Button from "@/components/utils/Button";
import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ServicesList = () => {
  const urlToFetch01 = `https://not-cool.onrender.com/api/services-collections?populate=*`;
  const { completeDataJSON: heroData } = useDataFetching(urlToFetch01);

  return (
    <>
      {heroData.data ? (
        <div className="px-[24px] lg:px-[48px] mb-[72px]">
          <ul className="grid gap-x-[16px] gap-y-[32px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {heroData.data.map((mapItem, itemIndex) => (
              <li
                className="shadow-xl bg-[white] rounded-[12px]"
                key={mapItem.id}
              >
                <div className="overflow-hidden rounded-t-[12px]">
                  <Link
                    tabIndex="-1"
                    aria-hidden={true}
                    href={`/servicos/${mapItem.attributes.slug}`}
                  >
                    <Image
                      className="w-full object-cover rounded-t-[12px] hover:scale-[1.2] transition-all"
                      src={`https://not-cool.onrender.com${mapItem.attributes.Image.data.attributes.formats.small.url}`}
                      alt={`Serviços Illustração ${itemIndex + 1}`}
                      width="0"
                      height="0"
                      unoptimized
                    />
                  </Link>
                </div>

                <div className="py-[24px] px-[16px] flex flex-col gap-[12px]">
                  <div className="flex flex-col gap-[8px]">
                    <h2 className="font-bold text-[black]">
                      {mapItem.attributes.Title}
                    </h2>

                    <p className="text-limit text-black75">
                      {mapItem.attributes.Description[0].children[0].text}
                    </p>
                  </div>

                  <Link
                    className="flex gap-2 items-center text-primaryBlue underline font-bold w-fit hover:brightness-[80%]"
                    href={`/servicos/${mapItem.attributes.slug}`}
                  >
                    Leia mais sobre
                    <Image
                      aria-hidden={true}
                      className="w-[16px] h-[12px]"
                      src="right-arrow-icon.svg"
                      alt="Flecha Apontando para a Direita Icone"
                      width={0}
                      height={0}
                      unoptimized
                    />
                  </Link>
                </div>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <>
          <div className="px-[24px] lg:px-[48px] mb-[72px]">
            <ul className="grid gap-x-[16px] gap-y-[32px] sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
              {Array.from({ length: 4 }, (_, index) => (
                <li key={index} className="shadow-xl bg-black25 rounded-[12px]">
                  <div className="rounded-t-[12px]"></div>

                  <div className="py-[24px] px-[16px] flex flex-col gap-[12px]">
                    <div className="flex flex-col gap-[8px]">
                      <h2 className="text-skeletonLoading bg-skeletonLoading rounded-[8px]">
                        Lorem ipsum
                      </h2>

                      <p className="text-skeletonLoading bg-skeletonLoading rounded-[8px]">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit.
                        Error illum voluptatibus harum quibusdam excepturi
                        necessitatibus? Eius doloribus labore aut dicta optio,
                        fugit est voluptatem soluta, reprehenderit sit minima ab
                        vitae.
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </>
  );
};

export default ServicesList;
