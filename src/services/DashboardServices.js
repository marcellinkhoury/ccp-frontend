import axios from "axios";
const BASE_URL = "http://127.0.0.1:8000/api";
const getProfiles = async () => {
  const response = await axios.get(BASE_URL + "/getProfiles");
  return response.data;
};

export { getProfiles };
