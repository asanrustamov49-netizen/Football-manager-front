import axios from "axios";

export const playerApi = axios.create({
  baseURL: "http://localhost:5000/players",
});
