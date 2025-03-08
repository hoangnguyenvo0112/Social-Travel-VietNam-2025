import { FORM_SCREEN_KEY } from "@/utils/constant";

function validateTravelPackage(errors, key, value) {
  if (
    ["name", "price", "price", "address", "numberOfPeople","description"].includes(key) &&
    !value
  ) {
    errors[key] = "Thông tin bắt buộc";
  } 
  switch (key) {
    case "price":
      if (parseInt(value) < 0 || isNaN(+value)) {
        errors[key] = "Thông tin không hợp lệ";
      }
      break;
    case "numberOfPeople":
      if (!Number.isInteger(value) || value < 0) {
        errors[key] = "Thông tin không hợp lệ";
      }
  }
}

export function validate(formScreen, key, value) {
  const errors = {};
  if (formScreen === FORM_SCREEN_KEY.travelPackage) {
    validateTravelPackage(errors, key, value);
  }
  return errors;
}

export function validateEntireValues(formScreen, data) {
  let errors;
  if (Array.isArray(data)) {
    errors = {};
    for (const index in data) {
      const item = data[index];
      const keys = Object.keys(item);
      for (const key of keys) {
        const value = item[key];
        errors[index] = {
          ...errors[index],
          ...validate(formScreen, key, value),
        };
      }
    }
  } else {
    errors = {};
    const keys = Object.keys(data);
    for (const key of keys) {
      const value = data[key];
      errors[key] = validate(formScreen, key, value)[key];
    }
  }
  return errors;
}
