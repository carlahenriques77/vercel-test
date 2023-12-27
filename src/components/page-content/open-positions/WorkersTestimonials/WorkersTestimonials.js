import Attribution from "@/components/utils/Attribution";
import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

const WorkersTestimonials = () => {
  const urlToFetch01 =
    "https://not-cool.onrender.com/api/open-positions-page?populate[WokersTestimonials][populate][VideoFormat][populate]=*";
  const { completeDataJSON: videoData } = useDataFetching(urlToFetch01);

  const urlToFetch02 =
    "https://not-cool.onrender.com/api/open-positions-page?populate[WokersTestimonials][populate]=*";
  const { completeDataJSON: backgroundImageData } =
    useDataFetching(urlToFetch02);

  const [isPlaying, setIsPlaying] = useState(false);

  // Create a ref to access the video element
  const videoRef = useRef(null);

  // Function to toggle play/pause when the button is clicked
  const togglePlay = () => {
    const video = videoRef.current;
    setIsPlaying(true);

    if (video.paused) {
      video.play();
    } else {
      video.pause();
    }
  };
  return (
    <>
      {videoData.data && backgroundImageData.data ? (
        <>
          <div className="mt-[72px] relative">
            {isPlaying ? null : (
              <div
                style={{
                  backgroundImage: `url(https://not-cool.onrender.com${backgroundImageData.data.attributes.WokersTestimonials.BackgroundImage.data.attributes.formats.small.url})`,
                }}
                className="bg-midnightBlack bg-fixed bg-no-repeat bg-cover border-solid border-[black] border-t-[4px]"
              >
                <div
                  style={{
                    backgroundColor: `rgba(0, 0, 0, 0.7)`,
                  }}
                  className="flex flex-col gap-2 items-center justify-center w-[100%] h-[70vh]"
                >
                  <button className="hover-effect01" onClick={togglePlay}>
                    <h1 className="text-[white] text-center font-bold text-[28px]">
                      <span className="text-crimsonRed">Escute</span> dos nossos{" "}
                      <br /> <span className="text-skyBlue">Trabalhadores</span>
                      !
                    </h1>

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
              </div>
            )}

            <video
              ref={videoRef}
              controls
              className={`border-solid border-[black] border-t-[4px] w-full object-cover h-[70vh] bg-midnightBlack ${
                isPlaying ? "block" : "hidden"
              }`}
            >
              <source
                src={`https://not-cool.onrender.com${videoData.data.attributes.WokersTestimonials.VideoFormat.MP4VideoForTheHeroSection.data.attributes.url}`}
                type="video/mp4"
              />
              <source
                src={`https://not-cool.onrender.com${videoData.data.attributes.WokersTestimonials.VideoFormat.WebmVideoForTheHeroSection.data.attributes.url}`}
                type="video/webm"
              />
            </video>
          </div>
        </>
      ) : (
        <>
          <div>
            <div className="bg-skeletonLoading h-[70vh]"></div>
          </div>
        </>
      )}
    </>
  );
};

export default WorkersTestimonials;
