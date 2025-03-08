import { useState } from "react";

import geocodeServices from "@/services/geocodeServices";
import { placeAutoCompleteService } from "@/services/placeAutoCompleteServices";
import SearchIcon from "@mui/icons-material/Search";
import { InputAdornment, TextField } from "@mui/material";
import { uniqueKey } from "@/utils/string";
let locationRecommend = [
  {
    name: "Tp Hồ Chí Minh",
    location: {
      lat: 10.762622,
      lng: 106.660172,
    },
  },
  {
    name: "Hà Nội",
    location: {
      lat: 21.028511,
      lng: 105.804817,
    },
  },
  {
    name: "Hải Phòng",
    location: {
      lat: 20.865139,
      lng: 106.68383,
    },
  },
  {
    name: "Đà Nẵng",
    location: {
      lat: 16.047079,
      lng: 108.20623,
    },
  },
];

const CheckIn = ({ onClick }) => {
  const [value, setValue] = useState("");
  const [filterLocation, setFilterLocation] = useState([]);

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          onClick && onClick({ lat: latitude, lng: longitude });
        },
        (error) => {
          console.error(error);
        }
      );
    } else {
      console.error("Geolocation is not supported by this browser.");
    }
  };

  const handleClick = (item) => {
    geocodeServices.getLocation(item.description).then((data) => {
      console.log(data);
      const location = data.results[0].geometry.location;
      onClick && onClick({ ...location, address: item.description });
    });
  };

  return (
    <div style={{ width: "100%" }}>
      <TextField
        type="text"
        value={value}
        placeholder="Tìm địa chỉ"
        fullWidth
        onChange={(evt) => {
          placeAutoCompleteService
            .getPlaceAutoComplete(evt.target.value)
            .then((data) => {
              console.log(data);
              data.predictions&& setFilterLocation(data.predictions);
            });

          setValue(evt.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
          }
        }}
        sx={{
          "& .MuiFormControl-root": {
            borderRadius: "99px",
            backgroundColor: "#616161",
          },
        }}
        InputProps={{
          style: { borderRadius: "99px" },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        // loading={isPlacePredictionsLoading}
      />
      <p className="my-1 text-lg text-gray-500">Gợi ý</p>
      <div className="border rounded-sm h-[300px] overflow-auto  mb-1">
        <div
          className="flex w-full hover:rounded-sm hover:bg-blue-50 p-1 items-center"
          onClick={handleCurrentLocation}
        >
          <i
            class="fa fa-map-pin ml-1 text-red-500 p-2 rounded-md"
            style={{ fontSize: "24px" }}
          ></i>
          <p>Vị trí hiện tại</p>
        </div>
        {filterLocation&&filterLocation.length>0 &&
          filterLocation.map((item, index) => (
            <div
              key={uniqueKey(index)}
              className="flex w-full hover:rounded-sm hover:bg-blue-50 p-1 items-center"
              onClick={() => handleClick(item)}
            >
              <i
                class="fa fa-map-marker-alt ml-1 text-red-500 p-2 rounded-md"
                style={{ fontSize: "24px" }}
              ></i>
              <p>{item.description}</p>
            </div>
          ))}
      </div>
    </div>
  );
};

export default CheckIn;
