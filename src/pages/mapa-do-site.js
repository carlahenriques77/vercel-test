// pages/sitemap.js
import React from "react";
import Link from "next/link";
import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar/NavBar";
import NewSharedData from "@/components/utils/NewSharedData";
import Head from "next/head";

const Sitemap = () => {
  const linksData = NewSharedData();

  return (
    <>
      <Head>
        <title>SiteMap | Doggy Daycare</title>
        <meta
          name="description"
          content="Explore o mapa do site da nossa Creche para Cães para encontrar facilmente as principais páginas e informações importantes sobre nossos serviços e políticas."
        />
      </Head>

      <NavBar />

      <div className="py-[72px] md:px-[24px] lg:px-[48px] text-[white] ">
        <div className="grid gap-[24px]">
          {linksData.allLinks.map((section, index) => (
            <div className="grid gap-[16px] h-fit shadow-xl" key={index}>
              <div className="grid custom-grid">
                <div className="w-full rounded-l-[8px] bg-skyBlue h-full"></div>

                <div className="rounded-r-[8px] bg-[black] p-[24px] grid gap-[16px]">
                  <h2 className="font-bold text-[22px]">{section.title}</h2>

                  <ul className="font-medium px-[8px] grid gap-[12px]">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <div className="flex gap-[4px]">
                          <span className="text-primaryBlue">*</span>

                          <Link
                            className="text-[18px] hover:underline"
                            href={link.href}
                          >
                            {link.text}
                          </Link>
                        </div>

                        {link.sublinks && link.sublinks.length > 0 && (
                          <ul className="px-[12px] gap-[4px] grid mt-[4px]">
                            {link.sublinks.map((sublink, sublinkIndex) => (
                              <li key={sublinkIndex}>
                                <div className="flex gap-[4px]">
                                  <span className="text-lightBlue">*</span>

                                  <Link
                                    className="text-[18px] hover:underline"
                                    href={sublink.href}
                                  >
                                    {sublink.text}
                                  </Link>
                                </div>
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </>
  );
};

export default Sitemap;
