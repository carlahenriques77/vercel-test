import Head from "next/head";
import React, { useState, useEffect } from "react";

const LoadingScreen = () => {
  // Array of random loading messages
  const loadingMessages = [
    "Preparando uma experiência única. Por favor, aguarde!",
    "Aguarde enquanto construímos um mundo repleto de surpresas.",
    "Aguarde enquanto preparamos algo especial para você.",
    "Montando um playground perfeito para os momentos felizes dos seus pets.",
    "Em breve, um conteúdo incrível estará disponível. Aguarde conosco!",
    "Estamos trabalhando para proporcionar a melhor experiência. Aguarde um momento!",
    "Montando um espaço aconchegante para os seus pets. Em breve!",
    "Estamos preparando algo incrível. Agradecemos pela sua paciência!",
    "Espere conosco enquanto criamos algo único e surpreendente.",
  ];

  // State to store the selected loading message
  const [randomMessage, setRandomMessage] = useState("");

  // Function to set a random message when the component mounts
  useEffect(() => {
    let lastMessageIndex = -1;

    const getRandomIndex = () => {
      let newIndex;
      do {
        newIndex = Math.floor(Math.random() * loadingMessages.length);
      } while (newIndex === lastMessageIndex); // Ensure it's different from the last index
      return newIndex;
    };

    // Initial random message
    const initialIndex = getRandomIndex();
    setRandomMessage(loadingMessages[initialIndex]);

    // Set a random message every 3 seconds
    const intervalId = setInterval(() => {
      const newIndex = getRandomIndex();
      setRandomMessage(loadingMessages[newIndex]);
      lastMessageIndex = newIndex; // Update the last index
    }, 6000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(intervalId);
  }, []);

  return (
    <>
      <Head>
        <title>Carregando...</title>
      </Head>

      <div className="w-[100vw] fixed bg-[black] z-[500] px-[24px] lg:px-[48px] flex flex-col gap-4 justify-center items-center h-[100vh]">
        <video
          className="w-[100px] bg-[black] p-[12px] rounded-[12px] border-solid border-white75 border-[2px]"
          autoPlay
          loop
          muted
          speed="0.5"
        >
          <source src="/loading-animation.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>

        <div className="flex flex-col gap-3 text-center">
          <h1 className="font-bold text-[24px] xl:text-[26px] text-white75">
            Carregando Conteúdo do Strapi<span className="loading-dots"></span>
          </h1>

          <p className="font-bold text-white75">{randomMessage}</p>
        </div>
      </div>
    </>
  );
};

export default LoadingScreen;
