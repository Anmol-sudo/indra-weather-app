import axios from "axios";

const OPENWEATHER_API_KEY = "920e2b686a75eb36cc0cf14c2df1a2b4";
const OPENWEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5";

const WEATHERAPI_API_KEY = "cf3fa30529fd4c8186883856241111";
const WEATHERAPI_BASE_URL = "http://api.weatherapi.com/v1/current.json";


export const getCurrentWeather = async (city) => {
  try {
    const response = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
      params: {
        q: city,
        appid: OPENWEATHER_API_KEY,
        units: "metric", // for Celsius
      },
    });

    // Fetch AQI data
    const coords = response.data.coord;
    const aqiResponse = await axios.get(
      `${OPENWEATHER_BASE_URL}/air_pollution`,
      {
        params: {
          lat: coords.lat,
          lon: coords.lon,
          appid: OPENWEATHER_API_KEY,
        },
      }
    );

    // Fetch UV Index data
    // Fetch UV Index data from WeatherAPI
    const uvResponse = await axios.get(`${WEATHERAPI_BASE_URL}/forecast.json`, {
      params: {
        key: WEATHERAPI_API_KEY,
        q: city,
        days: 1,
        aqi: "no",
        alerts: "no",
      },
    });

    const currentUv = uvResponse.data.current.uv;
    const uvForecast = uvResponse.data.forecast.forecastday[0].hour
      .filter((hourData) => new Date(hourData.time) > new Date())
      .slice(0, 5)
      .map((hourData) => ({
        time: new Date(hourData.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        uv: hourData.uv,
      }));

    return {
      ...response.data,
      aqi: aqiResponse.data.list[0].main.aqi,
      uvi: currentUv,
      uvForecast: uvForecast
    };
  } catch (error) {
    console.error("Error fetching weather data:", error);
    throw error;
  }
};

// ... rest of your code

export const getForecastWeather = async (city) => {
  try {
    const response = await axios.get(`${OPENWEATHER_BASE_URL}/forecast`, {
      params: {
        q: city,
        appid: OPENWEATHER_API_KEY,
        units: "metric", // for Celsius
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching forecast data:", error);
    throw error;
  }
};
