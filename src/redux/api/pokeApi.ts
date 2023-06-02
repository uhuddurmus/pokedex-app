import axios from "axios";


const baseURL = "https://pokeapi.co/api/v2";

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const filterResponse = (response:any) => {
  if (response.status >= 200 && response.status < 300) {
    return response.data;
  }
  throw new Error(response.statusText);
};

export async function pokeApiGet(path:any, params:any) {
  try {
    const response = await axiosInstance.get(path, { params });
    return filterResponse(response);

  } catch (error) {
    console.error('Hata:', error);
    throw error;
  }
}
