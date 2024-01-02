// pages/index.js

import { useState } from "react";
import Head from "next/head";
import YouTube from "react-youtube";
import Image from "next/image";
import useDataFetching from "@/hooks/useDataFetching";

const WorkersTestimonials = () => {
  const urlToFetch01 =
    "https://not-cool.onrender.com/api/open-positions-page?populate[WokersTestimonials][populate][VideoFormat][populate]=*";
  const { completeDataJSON: contentData01 } = useDataFetching(urlToFetch01);

  const urlToFetch02 =
    "https://not-cool.onrender.com/api/open-positions-page?populate[WokersTestimonials][populate]=*";
  const { completeDataJSON: contentData02 } =
    useDataFetching(urlToFetch02);

  const [player, setPlayer] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const onReady = (event) => {
    // event.target is the YouTube player
    setPlayer(event.target);
  };

  const playVideo = () => {
    if (player) {
      const playerState = player.getPlayerState();

      if (playerState !== window.YT.PlayerState.PLAYING) {
        player.playVideo();

        setIsPlaying(true);
      }
    }
  };

  return (
    <div>
      <Head>
        <style>{`
          iframe {
            width: 100%;
            height: 70vh;
          }
        `}</style>
      </Head>
      {contentData01.data && contentData02.data ? (
        <div className="mt-[72px]">
          <div
            style={{
              backgroundImage: `url(https://not-cool.onrender.com${contentData02.data.attributes.WokersTestimonials.BackgroundImage.data.attributes.formats.small.url})`,
              backgroundPosition: `${contentData02.data.attributes.WokersTestimonials.BackgroundPosition}`,
            }}
            className={`bg-midnightBlack bg-no-repeat bg-cover border-solid border-[black] border-t-[4px] ${
              isPlaying ? "hidden" : "block"
            }`}
          >
            <div
              style={{
                backgroundColor: `rgba(0, 0, 0, 0.7)`,
              }}
              className="flex flex-col gap-2 items-center justify-center w-[100%] h-[70vh]"
            >
              <button className="hover-effect01" onClick={playVideo}>
                <h2 className="text-[white] text-center font-bold text-[1.75rem]">
                  <span className="text-crimsonRed">Escute</span> dos nossos{" "}
                  <br aria-hidden="true" />{" "}
                  <span className="text-skyBlue">Trabalhadores</span>!
                </h2>

                <Image
                  aria-hidden={true}
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

          <div
            className={`video-container w-full  ${
              !isPlaying ? "!hidden" : "!block"
            }`}
          >
            <YouTube
              videoId={`${contentData01.data.attributes.WokersTestimonials.YoutubeVideoID}`}
              opts={{
                playerVars: {
                  autoplay: 0,
                  controls: 1,
                },
              }}
              onReady={onReady}
            />
          </div>
        </div>
      ) : (
        <>
          <div aria-hidden="true">
            <div className="bg-skeletonLoading h-[70vh]"></div>
          </div>
        </>
      )}
    </div>
  );
};

export default WorkersTestimonials;
