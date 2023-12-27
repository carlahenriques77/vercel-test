import "./App.css";

import {
  MapContainer,
  Marker,
  TileLayer,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";
import "node_modules/leaflet-geosearch/dist/geosearch.css";

import { Icon, divIcon, point } from "leaflet";
import markersParisJson from "./markers.json"; // Import the JSON data
import MarkerClusterGroup from "react-leaflet-cluster";

import { OpenStreetMapProvider, MapBoxProvider } from "leaflet-geosearch";

const provider = new OpenStreetMapProvider();

function App() {
  const customMarkerIcon = new Icon({
    // Icon by Local Folder. Can be done with URL, as well. Like this: iconUrl: "Image URL"
    iconUrl: require("./images/cafeteria.png"),

    // Size of the Icon
    iconSize: [38, 38],
  });

  const customClusterIcon = (clusterItem) => {
    return new divIcon({
      html: `<div class='cluster-icon'>${clusterItem.getChildCount()}</div>`,
      iconSize: [38, 38],
    });
  };

  // For Developers Only. Precise Leaflet Cordinates on Click for Marker placing
  const MapEvent = () => {
    useMapEvents({
      click(clickEvent) {
        // setState your coords here
        // coords exist in "clickEvent.latlng.lat" and "clickEvent.latlng.lng"
        console.log(clickEvent.latlng.lat);
        console.log(clickEvent.latlng.lng);
      },
    });
    return false;
  };

  return (
    // Get Map Skins at:
    // https://leaflet-extras.github.io/leaflet-providers/preview/

    <MapContainer center={[48.8566, 2.3522]} zoom={13}>
      <TileLayer
        /* Attribution because of Copyright */
        attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        // // // // // // // // // // // //

        /* Url to Load the Map Image*. It *might be necessary to Remove the {ext} at the end of the Link and Swap it for ".png / jpg" */
        url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.png"
      />

      {/* For Dev Only. Will Show the Map Cordinates on Click, making Inserting
      Precise Markers to be Extremely Easy */}
      <MapEvent />

      {/* "MarkerClusterGroup" will *Group the closest Markers together if the Zoom of the Map is too far away */}
      <MarkerClusterGroup
        /* I *think "chunkedLoading" will Improve the Performance of the Markers by Loading then better, *apparently */
        chunkedLoading
        iconCreateFunction={customClusterIcon}
        // // // // // // // // // // // //

        /* Will Remove the "Blue Area" Coverahe that appears on Cluster Hover */
        showCoverageOnHover={false}
      >
        {markersParisJson.map((markerItem) => (
          <Marker position={markerItem.geocodeLocation} icon={customMarkerIcon}>
            <Popup>
              <h2>
                This is a h2 Popup, and this is the "Map" Text Popup:{" "}
                {markerItem.popUpText}
              </h2>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}

export default App;
