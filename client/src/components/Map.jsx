import geocodeServices from "@/services/geocodeServices";
import GoogleMapReact from "google-map-react";
import { memo, useEffect, useState } from "react";

const Marker = () => (
  <i
    class="fa fa-map-marker-alt ml-1 text-red-500 hover:animate-bounce"
    style={{ fontSize: "28px" }}
  ></i>
);

const Map = ({ onClick, location = { lat: 11.0604, lng: 106.7963 } }) => {
  console.log("rend");
  const [myLocation, setMyLocation] = useState({});
  useEffect(() => {
    if (location && location.lat && location.lng) {
      setMyLocation({
        lat: parseFloat(location.lat),
        lng: parseFloat(location.lng),
      });
    }
  }, [location]);

  const handleApiLoaded = (map, maps) => {
    console.log({ map, maps });
    // use map and maps objects
  };
  const handleClickGoogleMap = (mapProps, map, clickEvent) => {
    geocodeServices.geocodeLatLng(mapProps.lat, mapProps.lng).then((data) => {
      onClick && onClick(data);
    });
  };
  return (
    <div className="w-full h-[200px] rounded-sm bg-black">
      <GoogleMapReact
        onClick={handleClickGoogleMap}
        bootstrapURLKeys={{ key: "AIzaSyAXK3kPMjlkrYVxsd_-6uQMQ8fXAO4b9n8" }}
        defaultCenter={myLocation}
        defaultZoom={15}
        yesIWantToUseGoogleMapApiInternals
        onGoogleApiLoaded={({ map, maps }) => handleApiLoaded(map, maps)}
      >
        {myLocation && <Marker lat={myLocation.lat} lng={myLocation.lng} />}
      </GoogleMapReact>
    </div>
  );
};

export default memo(Map);
