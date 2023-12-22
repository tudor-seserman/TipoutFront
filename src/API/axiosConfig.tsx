import axios from "axios";

export default axios.create({
  // DEVELOPMENT
  // PRODUCTION
  baseURL: "https://tipoutback.onrender.com",
});
