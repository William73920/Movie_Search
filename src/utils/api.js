import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

const TOKEN = import.meta.env.VITE_APP_TMD_TOKEN;

const headers = {
  Authorization: "bearer " + TOKEN,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });
    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
