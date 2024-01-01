// Menu.js
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import NewSharedData from "@/components/utils/NewSharedData";

const Menu = ({ menuOpen, isLinkActive }) => {
  const router = useRouter();

  const linksData = NewSharedData();

  const vagasHref = linksData.allLinks[0].links.find(
    (item) => item.text === "Vagas"
  )?.href;
  const servicosHref = linksData.allLinks[0].links.find(
    (item) => item.text === "Serviços"
  )?.href;

  return (
    <div
      className={`hidden bg-[black] ${
        menuOpen ? "!block h-[100vh] lg:h-auto lg:!flex" : ""
      }`}
    >
      <ul
        className={`max-h-[420px] flex flex-col items-center gap-3 text-[1.25rem] overflow-auto py-[24px] lg:flex-row lg:py-[0px] lg:h-auto lg:gap-[6px] lg:overflow-visible xl:gap-[12px]`}
      >
        {linksData.allLinks[0].links.map((mapItem, itemIndex) => (
          <li key={itemIndex} className="w-full lg:w-fit">
            <Link
              className={`py-[6px] pl-[24px] border-b-[1px] border-t-[1px] border-white50 hover:border-skyBlue border-solid active:text-primaryBlue active:border-primaryBlue hover:text-skyBlue block w-full text-lightBlue lg:border-none lg:p-[12px] lg:font-bold lg:text-white75 lg:hover:text-[white] ${
                isLinkActive(mapItem.href)
                  ? "!text-skyBlue !border-skyBlue lg:!text-[white]"
                  : ""
              } ${
                mapItem.href === vagasHref && router.asPath.includes("/vagas/")
                  ? "!text-skyBlue !border-skyBlue lg:!text-[white]"
                  : ""
              } ${
                mapItem.href === servicosHref &&
                router.asPath.includes("/servicos/")
                  ? "!text-skyBlue !border-skyBlue lg:!text-[white]"
                  : ""
              }`}
              href={mapItem.href}
            >
              {mapItem.text}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Menu;
