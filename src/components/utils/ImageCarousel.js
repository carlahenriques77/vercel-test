// components/ImageSlider.js
import React, { useState, useEffect } from "react";
import { useRef } from "react";

const ImageCarousel = ({ imagesArray, closeModal, initialIndex }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(initialIndex);

  const handlePrev = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? imagesArray.length - 1 : prevIndex - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === imagesArray.length - 1 ? 0 : prevIndex + 1
    );
  };

  useEffect(() => {
    document.getElementById("close-button").focus();
  }, []);

  return (
    <div
      style={{
        backgroundColor: `rgba(0, 0, 0, 0.8)`,
      }}
      className="z-[4000] fixed top-0 left-0 w-full h-full flex justify-center items-center"
      onClick={closeModal}
      role="dialog"
      aria-modal={currentImageIndex ? "true" : "false"}
    >
      <button
        aria-label="Fechar o Modal"
        id="close-button"
        className="z-[50000] absolute top-[0px] right-[24px] text-[2.5rem] text-[white] cursor-pointer"
        onClick={closeModal}
      >
        &times;
      </button>

      <button
        aria-label="Mover Slide para a Imagem anterior"
        className="z-[50000] absolute top-[50%] text-[1.875rem] text-[white] cursor-pointer left-[15px] px-[24px]"
        onClick={(e) => {
          e.stopPropagation();
          handlePrev();
        }}
      >
        &#10094;
      </button>

      <button
        aria-label="Mover Slide para a Proxima Imagem"
        className="z-[50000] absolute top-[50%] text-[1.875rem] text-[white] cursor-pointer right-[15px] px-[24px]"
        onClick={(e) => {
          e.stopPropagation();
          handleNext();
        }}
      >
        &#10095;
      </button>

      <div
        aria-hidden="true"
        style={{
          display: "flex",
          transform: `translateX(${-currentImageIndex * 100}%)`,
          transition: "transform 0.5s",
        }}
        className="relative"
        onClick={(e) => e.stopPropagation()}
      >
        {imagesArray.map((imageUrl, index) => (
          <div
            className="items-center justify-center flex"
            key={index}
            style={{ flex: "0 0 100%" }}
            onClick={closeModal}
          >
            <img
              className="max-w-[100%] max-h-[80vh]"
              src={imageUrl}
              alt={`Slide ${index}`}
              onClick={(e) => {
                e.stopPropagation();
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCarousel;
