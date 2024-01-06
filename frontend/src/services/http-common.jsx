import axios from "axios";

const http = axios.create({
  baseURL: "http://mekanbul-alihappy.vercel.app/api",
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
});

export default http;
