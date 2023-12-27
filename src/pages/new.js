// pages/index.js
import { useState } from "react";
import ImageCarousel from "@/components/utils/ImageCarousel";

const HomePage = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(null);

  const handleImageClick = (index) => {
    setCurrentImageIndex(index);
  };

  const handleClose = () => {
    setCurrentImageIndex(null);
  };

  return (
    <div>
      <h1>Image Carousel Example on another Page</h1>

      <div className="section">
        <p>Separted Content 01:</p>
        <img src={"/test-image.jpg"} onClick={() => handleImageClick(0)} />
      </div>

      <div className="section">
        <p>Separted Content 02:</p>
        <img src={"/pattern.webp"} onClick={() => handleImageClick(1)} />
      </div>

      <div className="section">
        <p>Separted Content 03:</p>
        <img src={"/pattern-black.png"} onClick={() => handleImageClick(2)} />
      </div>

      {currentImageIndex !== null && (
        <ImageCarousel
          imagesArray={[
            "/test-image.jpg",
            "/pattern.webp",
            "/pattern-black.png",
            // Add more image paths as needed
          ]}
          closeModal={handleClose}
          initialIndex={currentImageIndex} // Pass the correct initial index
        />
      )}
    </div>
  );
};

export default HomePage;
