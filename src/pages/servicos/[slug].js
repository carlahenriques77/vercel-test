import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar/NavBar";
import CallToActionBooking from "@/components/common/CallToAction/CallToActionBooking";
import IndividualServicesHero from "@/components/page-content/services/IndividualServicesHero.js/IndividualServicesHero";
import ServiceBenefits from "@/components/page-content/services/ServiceBenefits/ServiceBenefits";
import ServiceDescription from "@/components/page-content/services/ServiceDescription/ServiceDescription";
import ServiceGallery from "@/components/page-content/services/ServiceGallery/ServiceGallery";
import ServicePricing from "@/components/page-content/services/ServicePricing/ServicePricing";
import React, { useEffect, useState } from "react";
import CallToActionContact from "@/components/common/CallToAction/CallToActionContact";
import useDataFetchSlug from "@/hooks/useDataFetchSlug";
import { useRouter } from "next/router";
import LazyLoadComponent from "@/components/common/LazyLoadComponent/LazyLoadComponent";
import useCheckFetch from "@/hooks/useCheckFetch";
import LoadingScreen from "@/components/common/LoadingScreen/LoadingScreen";
import ServerDown from "@/components/common/ServerDown/ServerDown";
import useDataFetching from "@/hooks/useDataFetching";
import ImageCarousel from "@/components/utils/ImageCarousel";

const IndividualServices = () => {
  const router = useRouter();
  const { slug } = router.query;

  const [loading, setLoading] = useState(true);
  const [videoData, setVideoData] = useState(null);
  const [secondData, setSecondData] = useState(null);
  const [thirdData, setThirdData] = useState(null);

  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleClose = () => {
    setCurrentImageIndex(null);
  };

  const urlToFetch01 = `https://not-cool.onrender.com/api/services-collections?filters[slug]=${slug}&populate=*`;
  const { completeDataJSON: completeDataJSON01 } = useDataFetchSlug(
    urlToFetch01,
    { slug }
  );

  const urlToFetch02 = `https://not-cool.onrender.com/api/services-collections?filters[slug]=${slug}&populate[Benefits][populate]=*`;
  const { completeDataJSON: completeDataJSON02 } = useDataFetchSlug(
    urlToFetch02,
    { slug }
  );

  const urlToFetch03 = `https://not-cool.onrender.com/api/services-collections?filters[slug]=${slug}&populate[Pricing][populate]=*`;
  const { completeDataJSON: completeDataJSON03 } = useDataFetchSlug(
    urlToFetch03,
    { slug }
  );

  useEffect(() => {
    const fetchData = async () => {
      if (!slug) {
        setLoading(false);
        return;
      }

      setVideoData(completeDataJSON01);
      setSecondData(completeDataJSON02);
      setThirdData(completeDataJSON03);
      setLoading(false);
    };

    fetchData();
  }, [slug, completeDataJSON01, completeDataJSON02, completeDataJSON03]);

  const generateImagePaths = () => {
    const videoImagePaths = videoData.data?.flatMap((videoItem) =>
      videoItem.attributes.ImageSlideshow.data.map(
        (imageItem) =>
          `https://not-cool.onrender.com${imageItem.attributes.formats.small.url}`
      )
    );

    const allImagePaths = [...videoImagePaths];

    return allImagePaths;
  };

  const apiUrl =
    "https://not-cool.onrender.com/api/services-collections?populate=*";
  const { loading: checkLoading, error } = useCheckFetch(apiUrl);

  if (checkLoading) {
    return <LoadingScreen />;
  }

  if (error) {
    return <ServerDown />;
  }

  return (
    <div>
      <NavBar />

      {currentImageIndex !== null && (
        <ImageCarousel
          imagesArray={generateImagePaths()}
          closeModal={handleClose}
          initialIndex={currentImageIndex} // Pass the correct initial index
        />
      )}

      {videoData &&
      videoData.data &&
      secondData &&
      secondData.data &&
      thirdData &&
      thirdData.data &&
      !loading ? (
        <>
          <LazyLoadComponent
            lazyComponent={<IndividualServicesHero videoData={videoData} />}
          />

          <LazyLoadComponent
            lazyComponent={
              <ServiceBenefits videoData={videoData} secondData={secondData} />
            }
          />

          <LazyLoadComponent
            lazyComponent={<ServiceDescription videoData={videoData} />}
          />

          <LazyLoadComponent
            lazyComponent={
              <ServiceGallery
                videoData={videoData}
                handleImageClick={handleImageClick}
              />
            }
          />

          <LazyLoadComponent
            lazyComponent={<ServicePricing thirdData={thirdData} />}
          />

          <LazyLoadComponent
            lazyComponent={
              <CallToActionContact extraClassName="md:text-center md:mx-auto" />
            }
          />

          <LazyLoadComponent lazyComponent={<Footer />} />
        </>
      ) : (
        <>
          <div>
            <div className="mb-[72px] bg-skeletonLoading h-[70vh]"></div>
          </div>

          <div>
            <div className="px-[24px] lg:px-[48px] grid gap-[48px]">
              <div className="w-fit bg-skeletonLoading text-skeletonLoading rounded-[8px]">
                Lorem ipsum dolor
              </div>

              <div className="gap-[24px] flex flex-col">
                <div className="gap-[24px] flex flex-col">
                  <div className="gap-[12px] flex flex-col">
                    <h1 className="p-[8px] w-fit bg-skeletonLoading text-skeletonLoading rounded-[8px]">
                      Lorem ipsum dolor
                    </h1>

                    <p className="w-fit bg-skeletonLoading text-skeletonLoading rounded-[8px]">
                      Lorem ipsum
                    </p>
                  </div>

                  <div>
                    <ul className="grid gap-2 sm:grid-cols-2 lg:grid-cols-3">
                      {Array.from({ length: 7 }, (_, itemIndex) => (
                        <li
                          key={itemIndex}
                          className="w-fit bg-skeletonLoading text-skeletonLoading rounded-[8px]"
                        >
                          Lorem ipsum dolor
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="px-[24px] lg:px-[48px] mt-[72px] flex flex-col gap-7">
            <div className="flex flex-col gap-[12px]">
              <div className="flex relative py-3">
                <h1 className="w-fit text-skeletonLoading bg-skeletonLoading rounded-[12px] text-[1.75rem] px-[24px] lg:px-[48px] ">
                  Lorem ipsum dolor sit
                </h1>
              </div>

              <p className="text-skeletonLoading bg-skeletonLoading rounded-[12px] px-[24px] md:w-[80%] lg:px-[48px] xl:text-[1.125rem]">
                Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                Excepturi nesciunt natus unde dolorem voluptas. Sit architecto,
                facere.
              </p>
            </div>
          </div>

          <div className="mt-[72px]">
            <div className="mb-[72px] bg-black75 h-[30vh]"></div>
          </div>

          <div className="my-[72px] px-[24px] lg:px-[48px] rounded-[8px]">
            <div className="bg-skeletonLoading h-[40vh] rounded-[8px]"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default IndividualServices;
