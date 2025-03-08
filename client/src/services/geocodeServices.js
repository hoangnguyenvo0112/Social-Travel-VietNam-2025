import Geocode from "react-geocode";

class GeocodeService {
  constructor() {
    Geocode.setApiKey("AIzaSyAXK3kPMjlkrYVxsd_-6uQMQ8fXAO4b9n8");
    Geocode.setLanguage("en");
    Geocode.setRegion("VN");
    Geocode.setLanguage("en");
    Geocode.enableDebug();
  }
  getLocation(address) {
    return Geocode.fromAddress(address).then((res) => {
      return res;
    });
  }
  geocodeLatLng(lat, lng) {
    return Geocode.fromLatLng(lat, lng).then(
      (response) => {
        const address = response.results[0].formatted_address;
        let city, state, country;
        for (
          let i = 0;
          i < response.results[0].address_components.length;
          i++
        ) {
          for (
            let j = 0;
            j < response.results[0].address_components[i].types.length;
            j++
          ) {
            switch (response.results[0].address_components[i].types[j]) {
              case "locality":
                city = response.results[0].address_components[i].long_name;
                break;
              case "administrative_area_level_1":
                state = response.results[0].address_components[i].long_name;
                break;
              case "country":
                country = response.results[0].address_components[i].long_name;
                break;
            }
          }
        }

        return address;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}
export default new GeocodeService();
