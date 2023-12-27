import NavBar from "@/components/common/NavBar/NavBar";
import React from "react";
import Footer from "@/components/common/Footer/Footer";
import IndividualPositionDesign from "@/components/page-content/open-positions/MainContent/IndividualPositionDesign";

const OpenPosition = () => {
  return (
    <>
      <NavBar />

      <IndividualPositionDesign />

      <Footer />
    </>
  );
};

export default OpenPosition;
