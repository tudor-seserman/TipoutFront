import axios from "axios";

export default axios.create({
  // DEVELOPMENT
  baseURL: "http://localhost:8080/",
  // PRODUCTION
  // baseURL: "https://tipoutback.onrender.com",
});
