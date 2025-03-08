import { BASE_URL, LOCAL_STORAGE_KEY } from "@/utils/constant";
import axios from "axios";

export class Http {
  instance;
  accessToken;

  constructor() {
    this.accessToken = localStorage.getItem(LOCAL_STORAGE_KEY.accessToken);
    this.instance = axios.create({
      baseURL: BASE_URL,
      headers: {
        "Content-Type": "application/json",
      },
    });

    this.instance.interceptors.request.use(
      (config) => {
     
        if (config.headers && this.accessToken) {
          config.headers.Authorization = this.accessToken;
        } else {
          config.headers.Authorization = localStorage.getItem(
            LOCAL_STORAGE_KEY.accessToken
          );
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
  }
}
const http = new Http().instance;

export default http;
