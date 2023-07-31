import axios from "axios";

const baseURL = import.meta.env.VITE_API;

export const apiUrl = import.meta.env.VITE_API;

export const api = axios.create({
  baseURL,
  headers: {
    Accept: "Application/Json",
    "Content-Type": "Application/Json",
  },
});
