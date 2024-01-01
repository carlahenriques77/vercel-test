import React from "react";

const HeroTextBox = ({ title, description }) => {
  return (
    <div
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      className="shadow-2xl font-black absolute text-[white] text-center flex flex-col gap-[12px] bg-[black] rounded-[8px] border-solid border-skyBlue border-[2px] p-[16px] select-none"
    >
      <h1 className="text-[1.125rem] md:text-[1.25rem] lg:text-[1.5rem] text-primaryBlue">
        {title}
      </h1>

      <p className="hidden lg:block text-[1rem] gradient-blue-red-test">
        {description}
      </p>
    </div>
  );
};

export default HeroTextBox;
