// About.js
import LoadingScreen from "@/components/common/LoadingScreen/LoadingScreen";
import NavBar from "@/components/common/NavBar/NavBar";
import ServerDown from "@/components/common/ServerDown/ServerDown";
import Head from "next/head";
import React, { useState } from "react";
import AboutHero from "@/components/page-content/about/AboutHero/AboutHero";
import LazyLoadComponent from "@/components/common/LazyLoadComponent/LazyLoadComponent";
import useCheckFetch from "@/hooks/useCheckFetch";
import History from "@/components/page-content/about/History/History";
import Footer from "@/components/common/Footer/Footer";
import Introduction from "@/components/page-content/about/Introduction/Introduction";
import Testimonials from "@/components/page-content/homepage/Testimonials/Testimonials";
import MeetOurTeam from "@/components/page-content/about/MeetOurTeam/MeetOurTeam";
import CallToActionBooking from "@/components/common/CallToAction/CallToActionBooking";
import WhyChooseUs from "@/components/page-content/about/WhyChooseUs/WhyChooseUs";
import useDataFetching from "@/hooks/useDataFetching";
import ImageCarousel from "@/components/utils/ImageCarousel";

const About = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleClose = () => {
    setCurrentImageIndex(null);
  };

  const urlToFetchImage01 =
    "https://not-cool.onrender.com/api/about-page?populate[YourHistory][populate][RepeatableFields][populate]=*";
  const { completeDataJSON: contentData01 } =
    useDataFetching(urlToFetchImage01);

  const urlToFetchImage02 =
    "https://not-cool.onrender.com/api/content-media?populate[Testimonials][populate]=*";
  const { completeDataJSON: contentData02 } =
    useDataFetching(urlToFetchImage02);

  const urlToFetchImage03 =
    "https://not-cool.onrender.com/api/about-page?populate[YourTeam][populate][WorkerInformation][populate]=*";
  const { completeDataJSON: contentData03 } = useDataFetching(urlToFetchImage03);

  const generateImagePaths = () => {
    // Replace this with the actual logic to extract image paths from servicesData.data
    const ourHistoryImagePaths =
      contentData01.data.attributes.YourHistory.RepeatableFields.map(
        (mapItem) => {
          return `https://not-cool.onrender.com${mapItem.Image.data.attributes.formats.medium.url}`;
        }
      );

    const testimonialsImagePath = `https://not-cool.onrender.com${contentData02.data.attributes.Testimonials.Image.data.attributes.formats.small.url}`;

    const workersImagePaths =
      contentData03.data.attributes.YourTeam.WorkerInformation.map((mapItem) => {
        return `https://not-cool.onrender.com${mapItem.WorkerImage.data.attributes.formats.small.url}`;
      });

    // Combine ourHistoryImagePaths with other paths as needed
    const allImagePaths = [
      ...ourHistoryImagePaths,
      testimonialsImagePath,
      ...workersImagePaths,
    ];

    return allImagePaths;
  };

  const apiUrl = "https://not-cool.onrender.com/api/about-page?populate=*";
  const { loading, error } = useCheckFetch(apiUrl);

  if (loading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ServerDown />;
  }

  return (
    <div>
      <Head>
        <title>Sobre Nós | Doggy Daycare</title>
        <meta
          name="description"
          content="Conheça mais sobre a Doggy Daycare, sua creche para cães dedicada a proporcionar diversão, cuidado e companhia. Descubra como criamos um ambiente seguro e alegre para o bem-estar do seu melhor amigo, independentemente da raça."
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

      <LazyLoadComponent lazyComponent={<AboutHero />} />
      <LazyLoadComponent lazyComponent={<Introduction />} />
      <LazyLoadComponent
        lazyComponent={<History handleImageClick={handleImageClick} />}
      />
      <LazyLoadComponent lazyComponent={<WhyChooseUs />} />
      <LazyLoadComponent
        lazyComponent={
          <Testimonials extraClassName="border-solid border-skyBlue border-y-[4px]" />
        }
      />
      <LazyLoadComponent lazyComponent={<MeetOurTeam />} />
      <LazyLoadComponent lazyComponent={<CallToActionBooking />} />
      <LazyLoadComponent lazyComponent={<Footer />} />
    </div>
  );
};

export default About;
