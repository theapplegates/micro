import axios from "axios";

const axiosConfig = axios.create({
  baseURL: typeof window !== "undefined" ? window.location.origin : "",
});

export default axiosConfig;
