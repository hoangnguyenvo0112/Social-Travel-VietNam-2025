import http from "./httpServices";
class PlaceAutoCompleteService {
  getPlaceAutoComplete(input) {
    return http
      .get("api/places/autoComplete", { params: { input } })
      .then((res) => {
        return res.data.data;
      });
  }
}
export const placeAutoCompleteService = new PlaceAutoCompleteService();
