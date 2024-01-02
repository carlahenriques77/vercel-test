import Image from "next/image";
import React from "react";

const ServiceGallery = ({ contentData01, handleImageClick }) => {
  const animationSpeed = "40s";

  return (
    <>
      {contentData01.data && (
        <>
          {contentData01.data?.map((mapItem, itemIndex) => (
            <div className="mb-[72px]" key={mapItem.id}>
              <div className="overflow-hidden bg-midnightBlack py-[72px] border-y-[4px] border-solid border-skyBlue">
                <style jsx>{`
                  @keyframes scroll {
                    0% {
                      transform: translateX(0);
                    }
                    100% {
                      transform: translateX(calc(-250px * 7));
                    }
                  }
                `}</style>

                <div
                  className="flex border-y-[4px] border-solid border-skyBlue"
                  style={{
                    animation: `scroll ${animationSpeed} linear infinite`,
                    width: "calc(250px * 20)",
                  }}
                >
                  {Array.from(
                    {
                      length: Math.max(
                        10 - mapItem.attributes.ImageSlideshow.data.length,
                        0
                      ),
                    },
                    (_, repetitionIndex) =>
                      mapItem.attributes.ImageSlideshow.data.map(
                        (mapItem, itemIndex) => (
                          <div
                            className="overflow-hidden"
                            key={`${mapItem.id}_${repetitionIndex}_${itemIndex}`}
                          >
                            <Image
                              aria-hidden={true}
                              className="cursor-zoom-in hover:scale-[1.2] transition-all w-full h-full object-cover"
                              src={`https://not-cool.onrender.com${mapItem.attributes.formats.small.url}`}
                              alt={`Illustração: ${itemIndex}`}
                              height="0"
                              width="0"
                              unoptimized
                              onClick={() => handleImageClick(itemIndex)}
                            />
                          </div>
                        )
                      )
                  )}
                </div>
              </div>
            </div>
          ))}
        </>
      )}
    </>
  );
};

export default ServiceGallery;
