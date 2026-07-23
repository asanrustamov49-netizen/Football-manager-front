import axios from "axios";

export const teamApi = axios.create({
  baseURL: "http://localhost:5000/teams",
});
