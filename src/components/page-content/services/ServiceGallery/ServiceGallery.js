import React from "react";

const ServiceGallery = ({ videoData }) => {
  const animationSpeed = "40s";

  return (
    <>
      {videoData.data && (
        <>
          {videoData.data?.map((mapItem, itemIndex) => (
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
                            key={`${mapItem.id}_${repetitionIndex}_${itemIndex}`}
                          >
                            <img
                              className="w-full h-full object-cover"
                              src={`https://not-cool.onrender.com${mapItem.attributes.formats.small.url}`}
                              height="0"
                              width="0"
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
