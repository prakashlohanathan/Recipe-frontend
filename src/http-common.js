import axios from "axios";

export default axios.create({
  baseURL: "https://recipebook-be.onrender.com",
  headers: {
    "Content-type": "application/json"
  }
});

