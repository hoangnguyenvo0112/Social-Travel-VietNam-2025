import { FORM_SCREEN } from "@/utils/constant";

function validateConfigService(errors, key, value) {
  if (
    ["title", "numberOfPost", "price", "description"].includes(key) &&
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
    case "numberOfPost":
      if (!Number.isInteger(value) || value < 0) {
        errors[key] = "Thông tin không hợp lệ";
      }
  }
}

export function validate(formScreen, key, value) {
  const errors = {};
  if (formScreen === FORM_SCREEN.CONFIG_SERVICE) {
    validateConfigService(errors, key, value);
  }
  return errors;
}

export function validateEntireValues(formScreen, data) {
  const errors = [];
  if (Array.isArray(data)) {
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
  }
  return errors;
}
