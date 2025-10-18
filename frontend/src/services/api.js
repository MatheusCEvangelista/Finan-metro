import axios from "axios";

const API = axios.create({
    baseURL: "https://finan-metro.onrender.com/api",
});

export default API;
