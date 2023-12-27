// KenBurnsSlideshow.js

import useDataFetching from "@/hooks/useDataFetching";
import Image from "next/image";
import React, { useState } from "react";
import { useSpring, animated } from "react-spring";

// ... (imports and other code)

const KenBurnsSlideshow = () => {
  const urlToFetch =
    "https://not-cool.onrender.com/api/open-positions-page?populate[SeeAboutUs][populate]=*";
  const { completeDataJSON: ourHistoryData } = useDataFetching(urlToFetch);

  // Use the fetched image URLs if available
  const images =
    ourHistoryData.data &&
    ourHistoryData.data.attributes.SeeAboutUs.ImageKenBurns.data &&
    ourHistoryData.data.attributes.SeeAboutUs.ImageKenBurns.data.map(
      (mapItem) => `https://not-cool.onrender.com${mapItem.attributes.url}`
    );

  const getRandomDirection = () => {
    const directions = [
      "scale(1.2) translate(5%, 5%)",
      "scale(1.2) translate(-5%, -5%)",
      "scale(1.2) translate(0, 0)",
    ];
    return directions[Math.floor(Math.random() * directions.length)];
  };

  const [index, setIndex] = useState(0);

  const props = useSpring({
    from: { transform: getRandomDirection() },
    to: { transform: "scale(1) translate(0, 0)" },
    reset: true,
    config: { duration: 5000 },
    onRest: () => setIndex((index + 1) % (images?.length || 1)), // Added a safeguard here
  });

  return (
    <>
      {ourHistoryData.data ? (
        <div className="blob-shape relative w-[100%] h-[440px] overflow-hidden border-solid border-[black] border-[4px] rounded-[800px]">
          <div>
            {images?.map((image, i) => (
              <animated.img
                key={i}
                src={`${image}`} // Assuming your images are in the 'public/images' folder
                alt={`Slide ${i}`}
                className="w-full h-full absolute object-cover"
                style={{
                  zIndex: i === index ? 1 : 0,
                  ...props,
                }}
              />
            ))}
          </div>
        </div>
      ) : (
        <> </>
      )}
    </>
  );
};

export default KenBurnsSlideshow;
