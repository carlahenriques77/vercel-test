// SlideInMenu.js
import React, { useEffect, useState } from "react";
import Link from "next/link";

const SlideInMenu = ({ menuOpen, isLinkActive }) => {
  const linksData = [
    {
      text: "Home",
      href: "/",
    },
    {
      text: "Sobre",
      href: "/sobre",
    },
    {
      text: "Contato",
      href: "/sobre",
    },
    {
      text: "Vagas",
      href: "/sobre",
    },
    {
      text: "Reservarção",
      href: "/sobre",
    },
    {
      text: "Localizações",
      href: "/sobre",
    },
  ];

  const [isScreen1024Px, setIsScreen1024Px] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsScreen1024Px(true);
      } else {
        setIsScreen1024Px(false);
      }
    };

    // Initial check on component mount
    handleResize();

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Clean up event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div
      className={`hidden bg-[black] ${
        menuOpen ? "!block lg:!flex" : ""
      }`}
    >
      <ul
        className={`h-[100vh] flex flex-col items-center gap-3 text-[20px] overflow-auto max-h-[420px] py-[24px] lg:flex-row lg:py-[0px] lg:gap-4 lg:h-auto`}
      >
        {linksData.map((mapItem, itemIndex) => (
          <li key={itemIndex} className="w-full lg:w-fit">
            <Link
              className={`py-[6px] pl-[24px] border-b-[1px] border-t-[1px] border-white50 hover:border-skyBlue border-solid active:text-primaryBlue active:border-primaryBlue hover:text-skyBlue block w-full text-lightBlue lg:border-none lg:p-[12px] lg:font-bold lg:text-white75 lg:hover:text-[white] ${
                isLinkActive(mapItem.href)
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

export default SlideInMenu;
