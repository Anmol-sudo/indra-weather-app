import axios from "axios";

const API_KEY="920e2b686a75eb36cc0cf14c2df1a2b4"
const BASE_URL="https://api.openweathermap.org/data/2.5"

export const getCurrentWeather = async (city) => {
  console.log(city);
  try {
    const response = await axios.get(`${BASE_URL}/weather`, {
      params: {
        q: city,
        appid: API_KEY,
        units: "metric", // for Celsius
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

// ... rest of your code

// export const getForecastWeather = async (city) => {
//   try {
//     const response = await axios.get(`${BASE_URL}/forecast`, {
//       params: {
//         q: city,
//         appid: API_KEY,
//         units: "metric", // for Celsius
//       },
//     });
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching forecast data:", error);
//     throw error;
//   }
// };
