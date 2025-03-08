import { toast as toastLib } from "react-toastify";
export function toast(message, config = {}) {
  return toastLib(message, {
    autoClose: 1000,
    ...config,
  });
}
