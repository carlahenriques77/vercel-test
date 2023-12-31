import React, { useEffect, useRef, useState } from "react";

import VideoHero from "@/components/page-content/homepage/VideoHero/VideoHero";
import SiteFeatures from "@/components/page-content/homepage/SiteFeatures/SiteFeatures";
import NumberCounter from "@/components/page-content/homepage/NumberCounter/NumberCounter";
import LongText from "@/components/page-content/homepage/LongText/LongText";
import Testimonials from "@/components/page-content/homepage/Testimonials/Testimonials";
import Services from "@/components/page-content/homepage/Services/Services";
import BookNowCallToAction from "@/components/page-content/homepage/BookNowCallToAction/BookCallToAction";
import Quote from "@/components/page-content/homepage/Quote/Quote";
import Faq from "@/components/page-content/homepage/Faq/Faq";
import HiringSection from "@/components/page-content/homepage/HiringSection/HiringSection";
import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar/NavBar";
import LoadingScreen from "@/components/common/LoadingScreen/LoadingScreen";
import ServerDown from "@/components/common/ServerDown/ServerDown";
import Head from "next/head";
import LazyLoadComponent from "@/components/common/LazyLoadComponent/LazyLoadComponent";
import useCheckFetch from "@/hooks/useCheckFetch";
import useDataFetching from "@/hooks/useDataFetching";
import ImageCarousel from "@/components/utils/ImageCarousel";

const Home = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleClose = () => {
    setCurrentImageIndex(null);
  };

  const urlToFetchImage01 =
    "https://not-cool.onrender.com/api/content-media?populate[LongTextDescription][populate][ThirdTextGroup][populate]=*";
  const { completeDataJSON: imageData } = useDataFetching(urlToFetchImage01);

  const urlToFetchImage02 = `https://not-cool.onrender.com/api/services-collections?populate=*`;
  const { completeDataJSON: servicesData } = useDataFetching(urlToFetchImage02);

  const urlToFetchImage03 =
    "https://not-cool.onrender.com/api/content-media?populate[Testimonials][populate]=*";
  const { completeDataJSON: testimonialsData } =
    useDataFetching(urlToFetchImage03);

  const generateImagePaths = () => {
    const longTextImagePath = `https://not-cool.onrender.com${imageData.data.attributes.LongTextDescription.ThirdTextGroup.IllustrationImage.data.attributes.formats.small.url}`;

    const testimonialsImagePath = `https://not-cool.onrender.com${testimonialsData.data.attributes.Testimonials.Image.data.attributes.formats.small.url}`;

    // Replace this with the actual logic to extract image paths from servicesData.data
    const serviceImagePaths = servicesData.data.map((mapItem) => {
      return `https://not-cool.onrender.com${mapItem.attributes.Image.data.attributes.formats.small.url}`;
    });

    // Combine serviceImagePaths with other paths as needed
    const allImagePaths = [
      longTextImagePath,
      testimonialsImagePath,
      ...serviceImagePaths,
    ];

    return allImagePaths;
  };

  const apiUrl = "https://not-cool.onrender.com/api/content-media?populate=*";
  const { loading, error } = useCheckFetch(apiUrl);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ServerDown />;
  }

  return (
    <main>
      <Head>
        <title>Seja bem-vindo! | Doggy Daycare</title>

        <meta
          name="description"
          content="Oferecemos uma creche para cães onde eles desfrutam de diversão, cuidado e companhia. Proporcionamos um ambiente seguro e alegre para o bem-estar do seu melhor amigo, independente da sua raça."
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

      <LazyLoadComponent lazyComponent={<VideoHero />} />
      <LazyLoadComponent lazyComponent={<SiteFeatures />} />
      <LazyLoadComponent lazyComponent={<NumberCounter />} />
      <LazyLoadComponent
        lazyComponent={<LongText handleImageClick={handleImageClick} />}
      />
      <LazyLoadComponent
        lazyComponent={
          <Testimonials
            handleImageClick={handleImageClick}
            extraClassName="border-solid border-skyBlue border-y-[4px]"
          />
        }
      />
      <LazyLoadComponent
        lazyComponent={<Services handleImageClick={handleImageClick} />}
      />
      <LazyLoadComponent lazyComponent={<BookNowCallToAction />} />
      <LazyLoadComponent lazyComponent={<Quote />} />
      <LazyLoadComponent lazyComponent={<Faq />} />
      <LazyLoadComponent lazyComponent={<HiringSection />} />
      <LazyLoadComponent lazyComponent={<Footer />} />
    </main>
  );
};

export default Home;
