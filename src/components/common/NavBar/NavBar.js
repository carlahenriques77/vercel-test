import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import Menu from "@/components/common/NavBar/Menu";

const NavBar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScreen1024Px, setIsScreen1024Px] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const router = useRouter();

  // Function to determine if a link is active
  const isLinkActive = (pathname) => router.pathname === pathname;

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setMenuOpen(true);
        setIsScreen1024Px(true);
      } else {
        setMenuOpen(false);
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
    <>
      <nav className="text-[white] z-[2000] top-0 sticky">
        <div className="px-[24px] h-full py-[8px] lg:px-[48px] bg-[black] border-b-8 border-b-skyBlue border-solid w-full flex justify-between items-center">
          <div className="w-fit h-fit relative after:bg-[url(/logo-arc.png)] after:z-20 after:content-[''] after:absolute after:w-[73px] after:h-[20px] after:bg-no-repeat after:bg-contain after:mt-[8px] after:right-[82px] after:block lg:after:mt-[11px]">
            <Link className="block" href={"/"}>
              <Image
                className="block h-[50px] w-full"
                src="/logo.webp"
                alt="Logo e Botão da Homepage"
                width="0"
                height="0"
                unoptimized
                priority={true}
              />
            </Link>
          </div>

          {isScreen1024Px ? (
            <Menu menuOpen={menuOpen} isLinkActive={isLinkActive} />
          ) : (
            <button
              aria-label={menuOpen ? "Fechar Menu" : "Abrir Menu"}
              aria-expanded={menuOpen}
              className="flex flex-col cursor-pointer lg:hidden"
              onClick={toggleMenu}
            >
              <div
                className={`transition-02s w-[35px] h-1 bg-[white] my-[3px] p-0  ${
                  menuOpen ? "hamburger-spin-positive" : ""
                }`}
              ></div>
              <div
                className={`transition-02s w-[35px] h-1 bg-[white] my-[3px] p-0 ${
                  menuOpen ? "!bg-[black]" : ""
                }`}
              ></div>
              <div
                className={`transition-02s w-[35px] h-1 bg-[white] my-[3px] p-0 ${
                  menuOpen ? "hamburger-spin-negative" : ""
                }`}
              ></div>
            </button>
          )}
        </div>

        {!isScreen1024Px && (
          <Menu menuOpen={menuOpen} isLinkActive={isLinkActive} />
        )}
      </nav>
    </>
  );
};
export default NavBar;
