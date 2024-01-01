// pages/index.js
import useDataFetching from "@/hooks/useDataFetching";
import { useState } from "react";
import CountUp from "react-countup";
import { Waypoint } from "react-waypoint";

const NumberCounter = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/content-media?populate[NumberCounter][populate]=*";
  const { completeDataJSON: numberCounterData } = useDataFetching(urlToFetch);

  const [startAnimation, setStartAnimation] = useState(false);

  const handleEnter = () => {
    setStartAnimation(true);
  };

  let backgroundImageUrl;

  if (numberCounterData.data) {
    const imageSize = numberCounterData.data.attributes.NumberCounter.ImageSize;

    backgroundImageUrl = `https://not-cool.onrender.com${numberCounterData.data.attributes.NumberCounter.CounterBackgroundImage.data.attributes.url}`;
  }

  return (
    <>
      {/* Content */}
      {numberCounterData.data ? (
        <div
          style={{
            backgroundImage: `url(${backgroundImageUrl})`,
          }}
          className="bg-cover bg-center relative bg-fixed"
        >
          <h2 className="visually-hidden">Estatísticas do Nosso Sucesso</h2>

          <ul
            style={{
              backgroundColor: `rgba(0, 0, 0, 0.${numberCounterData.data.attributes.NumberCounter.GlassOverlayTransparency})`,
            }}
            className="px-[24px] lg:px-[48px] mt-[72px] flex flex-col gap-2 items-center justify-center py-[12%] w-[100%] h-[100%] md:gap-[16px] md:py-[4%] lg:grid lg:grid-cols-3 border-solid border-[black] border-y-[4px]"
          >
            {numberCounterData.data.attributes.NumberCounter.NumberCounterRepetable.map(
              (mapItem) => (
                <li
                  key={mapItem.id}
                  className="w-full text-center p-4 border-4 border-solid border-deepMaroon bg-midnightBlack"
                >
                  <Waypoint onEnter={handleEnter} />

                  <h3 className="flex gap-1 flex-col">
                    <CountUp
                      className="text-crimsonRed font-black text-[1.5rem] xl:text-[1.625rem]"
                      duration={mapItem.DurationInSeconds}
                      end={mapItem.CounterAmount}
                      start={startAnimation}
                    />

                    <span className="font-semibold text-white75 xl:text-[1.125rem]">
                      {mapItem.CounterSubtitle}
                    </span>
                  </h3>
                </li>
              )
            )}
          </ul>
        </div>
      ) : (
        <div
          aria-hidden="true"
          className="bg-skeletonLoading relative bg-fixed"
        >
          <div className="px-[24px] lg:px-[48px] mt-[72px] flex flex-col gap-2 items-center justify-center py-[12%] w-[100%] h-[100%] md:gap-[16px] md:py-[4%] lg:grid lg:grid-cols-3">
            {Array.from({ length: 3 }, (_, index) => (
              <div
                key={index}
                className="w-full flex gap-1 flex-col items-center p-4 bg-white50 rounded-[12px]"
              >
                <span className="text-skeletonLoading bg-skeletonLoading rounded-[12px] w-fit font-black text-[1.5rem] xl:text-[1.625rem]">
                  Lorem
                </span>

                <span className="text-skeletonLoading bg-skeletonLoading rounded-[12px] w-fit xl:text-[1.125rem]">
                  Lorem ipsum
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default NumberCounter;
