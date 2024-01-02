import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar/NavBar";
import Testimonials from "@/components/page-content/homepage/Testimonials/Testimonials";
import ImageCarousel from "@/components/utils/ImageCarousel";
import useDataFetching from "@/hooks/useDataFetching";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useEffect, useState } from "react";

// Create a loading component for Map
const LoadingMap = () => (
  <div className="bg-black75 !h-[100vh] md:!h-[80vh]"></div>
);

// Dynamically import Map component with a custom loader
const Map = dynamic(() => import("@/components/page-content/map/Map"), {
  loading: LoadingMap,
  ssr: false,
});

const MapPage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleClose = () => {
    setCurrentImageIndex(null);
  };

  const urlToFetch01 = `https://not-cool.onrender.com/api/locations-maps?populate=*`;
  const { completeDataJSON: contentData } = useDataFetching(urlToFetch01);

  const generateImagePaths = () => {
    const ourHistoryImagePaths = contentData.data?.map((mapItem) => {
      // Use flatMap to handle the nested arrays and flatten the result
      return mapItem.attributes.ImageGallery.data.flatMap((innerMapItem) => {
        // Return the full image path
        return `https://not-cool.onrender.com${innerMapItem.attributes.formats.small.url}`;
      });
    });

    // Flatten the result again to get a single array
    const allImagePaths = ourHistoryImagePaths?.flat() || [];

    console.log("allImagePaths:", allImagePaths);

    return allImagePaths;
  };

  return (
    <div>
      <Head>
        <title>Localizações | Doggy Daycare</title>
        <meta
          name="description"
          content="Descubra as diferentes localizações da nossa Creche em nosso mapa interativo. Encontre a filial mais próxima e saiba mais sobre nossos espaços dedicados ao cuidado e diversão dos seus animais de estimação."
        />
      </Head>

      <NavBar />

      {currentImageIndex !== null && (
        <ImageCarousel
          imagesArray={generateImagePaths()}
          closeModal={handleClose}
          initialIndex={currentImageIndex} // Pass the correct initial index
        />
      )}

      <Map handleImageClick={handleImageClick} />

      <Testimonials
        extraClassName="border-t-[8px] border-solid border-skyBlue !mt-[0px]"
        skeletonClassName="!mt-[0px]"
      />

      <Footer />
    </div>
  );
};

export default MapPage;
