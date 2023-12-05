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

const ComponentWithLazyLoad = ({ lazyComponent }) => {
  const ref = useRef();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
        }
      },
      { root: null, rootMargin: "0px", threshold: 0.9 }
    );

    if (ref.current) {
      observer.observe(ref.current);
    }

    return () => observer.unobserve(ref.current);
  }, []);

  return (
    <div ref={ref}>
      {inView && (
        <React.Suspense fallback={<div>Loading...</div>}>
          {lazyComponent}
        </React.Suspense>
      )}
    </div>
  );
};

const checkFetchData = async () => {
  const request = "https://not-cool.onrender.com/api/content-media?populate=*";

  // For Production URL
  // const request = "https://not-cool.onrender.com/api/content-media?populate=*";

  const response = await fetch(request);
  if (!response.ok) {
    // throw new Error("Network response was not ok")
    console.log("response not ok testing");
  }
};

const LazyLoadComponent = ({ lazyComponent }) => (
  <ComponentWithLazyLoad lazyComponent={lazyComponent} />
);

const Home = () => {
  const [loadingComponents, setLoadingComponents] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const fetchAndSetLoading = async () => {
      try {
        await checkFetchData();
      } catch (error) {
        setHasError(true);
        console.log("error:", error);
      } finally {
        setTimeout(() => {
          setLoadingComponents(false);
        }, 1000);
      }
    };

    fetchAndSetLoading();
  }, []);

  if (loadingComponents) {
    return <LoadingScreen />;
  } else if (hasError) {
    return (
      <>
        <ServerDown />
      </>
    );
  }

  return (
    <main>
      <Head>
        <title>Doggy Daycare: Seja bem-vindo!</title>
        <meta
          name="description"
          content="Oferecemos uma creche para cães onde eles desfrutam de diversão, cuidado e companhia. Proporcionamos um ambiente seguro e alegre para o bem-estar do seu melhor amigo, independente da sua raça."
        />
      </Head>

      <NavBar />

      <LazyLoadComponent lazyComponent={<VideoHero />} />
      <LazyLoadComponent lazyComponent={<SiteFeatures />} />
      <LazyLoadComponent lazyComponent={<NumberCounter />} />
      <LazyLoadComponent lazyComponent={<LongText />} />
      <LazyLoadComponent lazyComponent={<Testimonials />} />
      <LazyLoadComponent lazyComponent={<Services />} />
      <LazyLoadComponent lazyComponent={<BookNowCallToAction />} />
      <LazyLoadComponent lazyComponent={<Quote />} />
      <LazyLoadComponent lazyComponent={<Faq />} />
      <LazyLoadComponent lazyComponent={<HiringSection />} />
      <LazyLoadComponent lazyComponent={<Footer />} />
    </main>
  );
};

export default Home;
