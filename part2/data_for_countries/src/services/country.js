import axios from "axios";
const api = "https://studies.cs.helsinki.fi/restcountries/api/all";
const API_key = import.meta.env.VITE_SOME_KEY;

const getAll = () => {
  const request = axios.get(api);
  return request.then((response) => response.data);
};

const getWeather = (city) => {
  const request = axios.get(
    `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_key}&units=metric`,
  );
  return request.then((response) => response.data);
};

export default { getAll, getWeather };
