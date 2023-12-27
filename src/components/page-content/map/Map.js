import "leaflet/dist/leaflet.css";

import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";

import { Icon, divIcon, point } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import Image from "next/image";
import Button from "@/components/utils/Button";
import { useRef, useState } from "react";
import useDataFetching from "@/hooks/useDataFetching";

function Map() {
  const urlToFetch01 = `https://not-cool.onrender.com/api/locations-maps?populate=*`;
  const { completeDataJSON: servicesData } = useDataFetching(urlToFetch01);

  const [selectedMarker, setSelectedMarker] = useState(null);

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

  const MapEvent = () => {
    useMapEvents({
      click(clickEvent) {
        console.log(clickEvent.latlng.lat);
        console.log(clickEvent.latlng.lng);
      },
    });
    return false;
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
  };

  return (
    <>
      {servicesData.data ? (
        <div className="grid">
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
                  className="w-[16px] h-[16px]"
                  src={`/arrow-down.svg`}
                  width="0"
                  height="0"
                  unoptimized
                />
              </button>

              <TileLayer
                attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://www.stamen.com/" target="_blank">Stamen Design</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://tiles.stadiamaps.com/tiles/stamen_terrain/{z}/{x}/{y}{r}.png"
              />
              {/* For Dev Only. Will Show the Map Cordinates on Click, making Inserting
        Precise Markers to be Extremely Easy */}
              <MapEvent />

              <MarkerClusterGroup
                chunkedLoading
                showCoverageOnHover={false}
                iconCreateFunction={customClusterIcon}
              >
                {servicesData.data &&
                  servicesData.data.map((mapItem, itemIndex) => (
                    <Marker
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
                            className="w-[70px] h-[70px] lg:w-[90px] lg:h-[90px] object-cover hover:scale-[1.2] transition-all"
                            src={`https://not-cool.onrender.com${mapItem.attributes.Thumbnail.data.attributes.formats.small.url}`}
                            alt="Imagem do Local"
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
                          className="hover:scale-[1.2] transition-all  block w-full h-full "
                          src={`https://not-cool.onrender.com${mapItem.attributes.formats.small.url}`}
                          alt="Galeria do Local"
                          width="0"
                          height="0"
                          unoptimized
                        />
                      </div>
                    )
                  )}
                </div>

                <div className="grid gap-[16px] mt-[32px]">
                  <Button
                    pageHref="/formulario-reservar"
                    buttonText="Reservar Agora"
                    iconSrc="/calendar-icon.svg"
                    altText="Calendario Icone"
                    buttonClassName="!w-full  !border-primaryBlue"
                  />

                  <Button
                    pageHref={selectedMarker.attributes.GoogleMapsLink}
                    buttonText="Local no Google Maps"
                    iconSrc="/calendar-icon.svg"
                    altText="Calendario Icone"
                    buttonClassName="!w-full !border-deepMaroon bg-primaryBlue"
                  />
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}
        </div>
      ) : (
        <div className="mb-[72px] bg-black75 h-[70vh]"></div>
      )}
    </>
  );
}

export default Map;
