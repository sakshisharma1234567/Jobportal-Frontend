import axios from "axios";

const API = axios.create({
  baseURL: "https://jobportal-backend-1-6y9y.onrender.com/api",
});

export default API;
