import Button from "@/components/utils/Button";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ServiceBenefits = ({ videoData, secondData }) => {
  return (
    <>
      {videoData.data && secondData.data && (
        <div>
          {videoData.data?.map((mapItem, itemIndex) => (
            <div key={mapItem.id}>
              <div className="px-[24px] lg:px-[48px] grid gap-[48px]">
                <Link
                  id="main-content"
                  href={"/servicos"}
                  className="text-deepMaroon font-bold flex gap-2 items-center hover:underline "
                >
                  <Image
                    aria-hidden={true}
                    className="rounded-[8px] w-[20px] h-[20px]"
                    src={`/left-arrow-icon-red.svg`}
                    alt="Flecha Apontando para a Esquerda Icone"
                    width="0"
                    height="0"
                    unoptimized
                  />
                  Voltar para a Página de Serviços
                </Link>

                <div className="gap-[24px] flex flex-col">
                  <div className="gap-[12px] flex flex-col">
                    <div>
                      <h1 className="font-bold text-[1.75rem]">
                        {mapItem.attributes.Title}
                      </h1>

                      <p className="text-[1.125rem] font-bold text-primaryBlue">
                        Benefícios deste Serviço:
                      </p>
                    </div>

                    <div>
                      <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                        {secondData.data?.map((mapItem, itemIndex) => (
                          <div key={mapItem.id}>
                            {mapItem.attributes.Benefits.BenefitsList.map(
                              (mapItem, itemIndex) => (
                                <li
                                  key={mapItem.id}
                                  className="flex items-start gap-[8px] font-medium "
                                >
                                  <span aria-hidden={true}>⚫</span>

                                  <p>{mapItem.Item}</p>
                                </li>
                              )
                            )}
                          </div>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ServiceBenefits;
