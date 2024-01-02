import Head from "next/head";
import React, { useState, useEffect } from "react";

const LoadingScreen = () => {
  // State to store the selected loading message
  const [randomMessage, setRandomMessage] = useState("");

  // Function to set a random message when the component mounts
  useEffect(() => {
    // Array of random loading messages
    const loadingMessages = [
      "Preparando uma experiência única. Por favor, aguarde!",
      // ... (other loading messages)
    ];

    let lastMessageIndex = -1;

    const getRandomIndex = () => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * loadingMessages.length);
      } while (newIndex === lastMessageIndex);
      return newIndex;
    };

    // Initial random message
    const initialIndex = getRandomIndex();
    setRandomMessage(loadingMessages[initialIndex]);

    // Set a random message every 3 seconds
    const intervalId = setInterval(() => {
      const newIndex = getRandomIndex();
      setRandomMessage(loadingMessages[newIndex]);
      lastMessageIndex = newIndex;
    }, 6000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []); // Empty dependency array as loadingMessages is now defined inside the useEffect

  return (
    <>
      <Head>
        <title>Carregando... | Doggy Daycare</title>
      </Head>

      <div className="w-[100vw] fixed bg-[black] z-[500] px-[24px] lg:px-[48px] flex flex-col gap-4 justify-center items-center h-[100vh]">
        <div className="loader">
          <div className="loader__bar"></div>
          <div className="loader__bar"></div>
          <div className="loader__bar"></div>
          <div className="loader__bar"></div>
          <div className="loader__bar"></div>
          <div className="loader__ball"></div>
        </div>

        <div className="flex flex-col gap-3 text-center">
          <h1
            aria-live="polite"
            className="font-bold text-[1.5rem]  text-crimsonRed"
            aria-label="Carregando Conteúdo do Strapi, por favor, aguarde..."
          >
            Carregando Conteúdo do Strapi<span className="loading-dots"></span>
          </h1>

          <p aria-hidden="true" className="font-bold text-primaryBlue">
            {randomMessage}
          </p>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
