import axios from "axios";

export const fetcher = (url) =>
  fetch(`https://foodie-api-1nof.onrender.com/${url}`).then((res) =>
    res.json()
  );

export const authFetcher = (url, config) =>
  fetch(`https://foodie-api-1nof.onrender.com/${url}`, config).then((res) =>
    res.json()
  );

export const axiosapi = axios.create({
  baseURL: "https://foodie-api-1nof.onrender.com/",
});
