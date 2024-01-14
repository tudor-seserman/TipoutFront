import axios from "axios";


export default axios.create({
  // DEVELOPMENT
  baseURL: { REACT_APP_BASE_URL },
  // PRODUCTION
  // baseURL: "https://tipoutback.onrender.com",
});
