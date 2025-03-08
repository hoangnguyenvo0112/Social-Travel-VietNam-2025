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
        }
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.response.use((response) => {
      if (response?.config?.url && response.data?.data?.accessToken) {
        this.accessToken = response.data.data.accessToken;
      }
      return response;
    });
  }
}

const http = new Http().instance;

export default http;
