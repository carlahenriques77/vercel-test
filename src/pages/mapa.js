import Footer from "@/components/common/Footer/Footer";
import NavBar from "@/components/common/NavBar/NavBar";
import Testimonials from "@/components/page-content/homepage/Testimonials/Testimonials";
import dynamic from "next/dynamic";

const Map = dynamic(() => import("@/components/page-content/map/Map"), {
  ssr: false,
});

const MapPage = () => {
  return (
    <div>
      <NavBar />

      <Map />

      <Testimonials
        extraClassName="border-t-[8px] border-solid border-skyBlue !mt-[0px]"
        skeletonClassName="!mt-[0px]"
      />

      <Footer />
    </div>
  );
};

export default MapPage;
