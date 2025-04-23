import axios from "axios";
import { appConfig } from "../config/config";

const ApiClient = axios.create({
  baseURL: appConfig.backendUrl,
  withCredentials: true,
});


export { ApiClient };
