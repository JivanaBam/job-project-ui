import axios from "axios";

// axios instance
const $axios = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 5000,
});

export default $axios;
