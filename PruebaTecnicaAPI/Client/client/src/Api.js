import axios from "axios";
import config from "./config";

const api = axios.create({
  baseURL: config.apiBaseUrl, 
  timeout: 5000, 
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
