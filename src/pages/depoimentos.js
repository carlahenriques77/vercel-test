// pages/your-page.js
import CallToActionBooking from "@/components/common/CallToAction/CallToActionBooking";
import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar/NavBar";
import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import { useRef, useState } from "react";

const TestimonialsPage = () => {
  const urlToFetch01 =
    "https://not-cool.onrender.com/api/testimonials-page?populate[TestimonialsRepeatable][populate]=*";
  const { completeDataJSON: videoData } = useDataFetching(urlToFetch01);

  // State to track whether each video is playing or paused
  const [videoStates, setVideoStates] = useState(
    Array.from({ length: 3 }, () => false)
  );

  // Function to toggle play/pause for a specific video index
  const togglePlay = (index) => {
    const newVideoStates = [...videoStates];
    const video = document.getElementById(`myVideo${index}`);

    if (newVideoStates[index]) {
      video.pause();
    } else {
      video.play();
    }

    newVideoStates[index] = !newVideoStates[index];
    setVideoStates(newVideoStates);
  };

  return (
    <div>
      <NavBar />

      {videoData.data ? (
        <div className="px-[24px] lg:px-[48px] w-full overflow-hidden text-[black] py-[72px]">
          <div className="relative z-10 grid gap-[8px]">
            <h1 className="text-[28px] font-bold uppercase">
              {videoData.data.attributes.Title}
            </h1>

            <p className="text-[18px] font-medium">
              {videoData.data.attributes.Description}
            </p>
          </div>

          <div className="relative z-10 grid grid-cols-3 gap-[12px] mt-[24px]">
            {videoData.data.attributes.TestimonialsRepeatable.map(
              (mapItem, itemIndex) => (
                <div
                  className="w-full text-[white] bg-[black] rounded-[8px] grid gap-[24px]"
                  key={mapItem.id}
                >
                  <div className="gradient-blue-red px-[4px] pt-[4px] rounded-t-[8px]">
                    <div
                      className={`relative w-full h-[300px] object-cover rounded-t-[8px] overflow-hidden`}
                    >
                      <video
                        id={`myVideo${itemIndex}`}
                        controls={videoStates[itemIndex]}
                        className={`w-full h-full object-cover bg-midnightBlack`}
                      >
                        <source
                          src={`https://not-cool.onrender.com${mapItem.VideoMP4.data.attributes.url}`}
                          type="video/mp4"
                        />
                      </video>

                      {!videoStates[itemIndex] && (
                        <div
                          style={{
                            backgroundColor: `rgba(0, 0, 0, 0.8)`,
                          }}
                          className="absolute top-0 flex flex-col gap-2 items-center justify-center w-full h-full"
                        >
                          <button
                            className="hover-effect01"
                            onClick={() => togglePlay(itemIndex)}
                          >
                            <Image
                              className="block h-[80px] w-full"
                              src={`/play-button.svg`}
                              alt="Botão de Video Play"
                              width="0"
                              height="0"
                              unoptimized
                            />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="gradient-blue-red px-[4px] pb-[4px] rounded-b-[8px]">
                    <div className="px-[16px] pb-[16px] pt-[12px] grid gap-[12px] bg-[black] rounded-b-[8px]">
                      <h2 className="gradient-blue-red-test text-[20px] font-bold flex items-center gap-[8px]">
                        <Image
                          aria-hidden={true}
                          className="border-solid border-crimsonRed border-[2px] w-[40px] h-[40px] block rounded-[100%] object-cover"
                          src={`https://not-cool.onrender.com${mapItem.ProfilePicture.data.attributes.formats.small.url}`}
                          width={0}
                          height={0}
                          unoptimized
                        />
                        {mapItem.Name}
                      </h2>

                      <p className="">
                        <span className="text-primaryBlue text-[18px]">❝</span>
                        {mapItem.TestimonialText}
                        <span className="text-primaryBlue text-[18px]">❞</span>
                      </p>
                    </div>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      ) : (
        <></>
      )}

      <CallToActionBooking />

      <Footer />
    </div>
  );
};

export default TestimonialsPage;
