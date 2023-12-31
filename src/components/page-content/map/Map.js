import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvents,
  useMap,
  Tooltip,
} from "react-leaflet";

import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import Image from "next/image";
import Button from "@/components/utils/Button";
import { useEffect, useRef, useState } from "react";
import useDataFetching from "@/hooks/useDataFetching";
import ImageCarousel from "@/components/utils/ImageCarousel";

const Map = () => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [imageIndex, setImageIndex] = useState(null);
  const [selectedGallery, setSelectedGallery] = useState(null);

  const [cursorCoordinates, setCursorCoordinates] = useState({
    lat: 0,
    lng: 0,
  });

  const [showPopup, setShowPopup] = useState(false);

  console.log("showPopup:", showPopup);

  const MapEvent = () => {
    const map = useMap();

    useMapEvents({
      click: (event) => {
        const { lat, lng } = event.latlng;
        setCursorCoordinates({ lat, lng });
        map.openPopup(
          `Lat: ${lat.toFixed(6)}, Lng: ${lng.toFixed(6)}`,
          [lat, lng],
          { autoClose: false }
        );
      },
    });

    return null;
  };

  const urlToFetch01 = `https://not-cool.onrender.com/api/locations-maps?populate=*`;
  const { completeDataJSON: servicesData } = useDataFetching(urlToFetch01);

  const handleImageClick = (index) => {
    setImageIndex(index);
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    setSelectedGallery(marker.attributes.ImageGallery);
  };

  const handleClose = () => {
    setImageIndex(null);
  };

  const targetElementRef = useRef(null);

  const scrollToTarget = () => {
    const navbarHeight = 140;
    const targetPosition = targetElementRef.current.offsetTop - navbarHeight;

    if (targetElementRef.current) {
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };

  const customMarkerIcon = new Icon({
    iconUrl: "/marker.png",
    iconSize: [38, 55],
  });

  const customClusterIcon = (clusterItem) => {
    return new divIcon({
      html: `<div class='bg-midnightBlack font-bold h-[3.4rem] w-[3.4rem] text-[white] flex items-center justify-center rounded-[50%] text-[24px] shadow-xl border-solid border-skyBlue border-[2px]'>${clusterItem.getChildCount()}</div>`,
      iconSize: [38, 38],
    });
  };

  return (
    <>
      {servicesData.data ? (
        <div id="main-content" className="grid">
          {imageIndex !== null && selectedGallery && (
            <ImageCarousel
              imagesArray={selectedGallery.data.map(
                (innerMapItem) =>
                  `https://not-cool.onrender.com${innerMapItem.attributes.formats.small.url}`
              )}
              closeModal={handleClose}
              initialIndex={imageIndex}
            />
          )}

          <div className="sm:px-[24px] bg-midnightBlack relative">
            <MapContainer
              className="!h-[100vh] md:!h-[80vh] !relative border-solid sm:border-x-[8px] border-skyBlue"
              center={[-23.55320622219640555, -46.6291093826294]}
              zoom={15}
              scrollWheelZoom={true}
            >
              <button
                className="z-[1000] absolute top-[100px] ml-[12px] cursor-pointer bg-crimsonRed rounded-[4px] active:brightness-60 active:translate-y-[2px] text-[white] font-bold flex gap-[16px] justify-center items-center px-[12px] py-[8px]"
                onClick={scrollToTarget}
              >
                <Image
                  aria-hidden={true}
                  className="w-[16px] h-[16px]"
                  src={`/arrow-down.svg`}
                  alt="Flecha apontando para baixo"
                  width="0"
                  height="0"
                  unoptimized
                />
              </button>

              {showPopup && (
                <Popup
                  position={[cursorCoordinates.lat, cursorCoordinates.lng]}
                  autoClose={false}
                  closeButton={false}
                  minWidth={140}
                >
                  {`Lat: ${cursorCoordinates.lat.toFixed(
                    6
                  )}, Lng: ${cursorCoordinates.lng.toFixed(6)}`}
                </Popup>
              )}

              <TileLayer
                attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png"
              />

              <MapEvent />

              <MarkerClusterGroup
                chunkedLoading
                showCoverageOnHover={false}
                iconCreateFunction={customClusterIcon}
              >
                {servicesData.data &&
                  servicesData.data.map((mapItem, itemIndex) => (
                    <Marker
                      key={mapItem.id}
                      position={mapItem.attributes.MarkerLocation}
                      icon={customMarkerIcon}
                      eventHandlers={{
                        click: () => handleMarkerClick(mapItem),
                      }}
                    >
                      <Popup>
                        <h3 className="uppercase text-crimsonRed text-[20px] font-bold">
                          {mapItem.attributes.Title}
                        </h3>

                        <div className="overflow-hidden border-solid border-skyBlue border-[2px] rounded-[100px] w-fit h-fit mt-[8px]">
                          <Image
                            aria-hidden={true}
                            className="w-[70px] h-[70px] lg:w-[90px] lg:h-[90px] object-cover cursor-zoom-in hover:scale-[1.2] transition-all"
                            src={`https://not-cool.onrender.com${mapItem.attributes.Thumbnail.data.attributes.formats.small.url}`}
                            alt={`Thumbnail do Local`}
                            width="0"
                            height="0"
                            unoptimized
                          />
                        </div>

                        <ul className="text-[white] font-bold mt-[16px] grid gap-y-[8px]">
                          <li>
                            <p className="!m-[0px]">
                              Local:{" "}
                              <span className="text-white75">
                                {mapItem.attributes.SpecificLocation}
                              </span>
                            </p>
                          </li>

                          <li>
                            <p className="!m-[0px]">
                              Contato:{" "}
                              <span className="text-white75">
                                {mapItem.attributes.Contact}
                              </span>
                            </p>
                          </li>

                          <li>
                            <p className="!m-[0px]">
                              Horas Abertas:{" "}
                              <span className="text-white75">
                                {mapItem.attributes.BusinessHours}
                              </span>
                            </p>
                          </li>
                        </ul>

                        <div className="mt-[16px]">
                          <button
                            className="cursor-pointer bg-crimsonRed px-[32px] py-[16px] rounded-lg active:brightness-60 active:translate-y-[2px] text-[white] font-bold md:max-w-[600px] flex flex-row gap-[16px] justify-center items-center your-button-class"
                            onClick={scrollToTarget}
                          >
                            Mais Informações...
                          </button>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
              </MarkerClusterGroup>
            </MapContainer>
          </div>

          {selectedMarker ? (
            <div
              className="border-solid border-t-[8px] border-skyBlue bg-midnightBlack w-full h-full px-[24px] lg:px-[48px] py-[48px]"
              ref={targetElementRef}
            >
              <div>
                <h1 className="uppercase text-skyBlue text-[24px] font-bold">
                  Mostrando Informação Sobre:{" "}
                  <span className="text-crimsonRed">
                    {selectedMarker.attributes.Title}
                  </span>
                </h1>
              </div>

              <div>
                <ul className="text-[white] font-bold mt-[24px] grid gap-x-[16px] gap-y-[8px] ">
                  <li>
                    <p className="!m-[0px]">
                      Local:{" "}
                      <span className="text-white75">
                        {selectedMarker.attributes.SpecificLocation}
                      </span>
                    </p>
                  </li>

                  <li>
                    <p className="!m-[0px]">
                      Contato:{" "}
                      <span className="text-white75">
                        {selectedMarker.attributes.Contact}
                      </span>
                    </p>
                  </li>

                  <li>
                    <p className="!m-[0px]">
                      Horas Abertas:{" "}
                      <span className="text-white75">
                        {selectedMarker.attributes.BusinessHours}
                      </span>
                    </p>
                  </li>

                  {selectedMarker.attributes.ImportantFields.map(
                    (mapItem, itemIndex) => (
                      <li key={mapItem.id}>
                        <p className="!m-[0px] text-skyBlue">
                          <span className="text-crimsonRed">*</span>
                          {mapItem.BoldText}:{" "}
                          <span className="text-white75">
                            {mapItem.SubText}
                          </span>
                        </p>
                      </li>
                    )
                  )}
                </ul>
              </div>

              <div className="mt-[32px]">
                <div>
                  <h1 className="uppercase text-crimsonRed text-[24px] font-bold">
                    {selectedMarker.attributes.Title},{" "}
                    <span className="text-skyBlue">Galleria:</span>
                  </h1>
                </div>

                <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-[16px] mt-[24px]">
                  {selectedMarker.attributes.ImageGallery.data.map(
                    (mapItem, itemIndex) => (
                      <div
                        className="max-w-[300px] sm:max-w-full mx-auto sm:mx-none overflow-hidden border-solid border-[4px] border-skyBlue rounded-[8px]"
                        key={mapItem.id}
                      >
                        <Image
                          aria-hidden={true}
                          className="cursor-zoom-in hover:scale-[1.2] transition-all block w-full h-full "
                          src={`https://not-cool.onrender.com${mapItem.attributes.formats.small.url}`}
                          alt={`Illustração do Local número: ${itemIndex}`}
                          width="0"
                          height="0"
                          unoptimized
                          onClick={() => handleImageClick(itemIndex)}
                        />
                      </div>
                    )
                  )}
                </div>

                <div className="w-full grid gap-[16px] mt-[32px]">
                  <Button
                    pageHref="/reservar"
                    buttonText="Reservar Agora"
                    iconSrc="/calendar-icon.svg"
                    altText="Calendario Icone"
                    buttonClassName="!w-full !max-w-[100%] !border-primaryBlue"
                  />

                  <Button
                    pageHref={selectedMarker.attributes.GoogleMapsLink}
                    buttonText="Local no Google Maps"
                    iconSrc="/map-icon.svg"
                    altText="Mapa Icone"
                    buttonClassName="!w-full !max-w-[100%] !border-deepMaroon bg-primaryBlue"
                  />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="bg-black75 !h-[100vh] md:!h-[80vh]"></div>
      )}
    </>
  );
};

export default Map;
