import React from "react";
import HeroTextBox from "../../utils/HeroTextBox";

const HeroSection = ({
  backgroundImage,
  backgroundPosition,
  backgroundOverlay,
  title,
  description,
  extraClassName,
}) => {
  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundPosition: `${backgroundPosition}`,
      }}
      className={`hero-shadow bg-cover mb-[72px] h-full bg-midnightBlack w-full bg-no-repeat relative border-b-[4px] border-solid border-[black] ${extraClassName}`}
    >
      <div
        style={{
          backgroundColor: `rgba(0, 0, 0, 0.${backgroundOverlay})`,
        }}
        className="h-[70vh] flex justify-center items-center"
      >
        <HeroTextBox title={title} description={description} />
      </div>
    </div>
  );
};

export default HeroSection;
