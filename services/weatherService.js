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

    // Create a pollen count proxy from AQI data
    const aqi = aqiResponse.data.list[0].main.aqi;
    const components = aqiResponse.data.list[0].components;
    console.log(aqiResponse.data.list[0].components);
    
    const pollenCount = {
      overall: aqi * 2, // Scale AQI to match our 0-10 scale
      types: [
        { name: "PM2.5", count: components.pm2_5 },
        { name: "PM10", count: components.pm10 },
        { name: "NO2", count: components.no2 },
        { name: "O3", count: components.o3 },
      ],
    };

    // Fetch UV Index data
    // Fetch UV Index data from WeatherAPI
    const forecastResponse = await axios.get(
      `${WEATHERAPI_BASE_URL}/forecast.json`,
      {
        params: {
          key: WEATHERAPI_API_KEY,
          q: city,
          days: 1,
          aqi: "no",
          alerts: "no",
        },
      }
    );

    const currentUv = forecastResponse.data.current.uv;
    const uvForecast = forecastResponse.data.forecast.forecastday[0].hour
      // .filter((hourData) => new Date(hourData.time) > new Date())
      .slice(0, 5)
      .map((hourData) => ({
        time: new Date(hourData.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        uv: hourData.uv,
      }));

    // Extract current wind data
    const currentWind = {
      speed: forecastResponse.data.current.wind_mph,
      direction: forecastResponse.data.current.wind_degree,
      directionText: forecastResponse.data.current.wind_dir,
    };

    // Extract wind forecast data for the next 5 hours
    const windForecast = forecastResponse.data.forecast.forecastday[0].hour
      // .filter((hourData) => new Date(hourData.time) > new Date())
      .slice(0, 5)
      .map((hourData) => ({
        time: new Date(hourData.time).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        }),
        speed: hourData.wind_mph,
        direction: hourData.wind_degree,
        directionText: hourData.wind_dir,
      }));

    return {
      ...response.data,
      aqi: aqiResponse.data.list[0].main.aqi,
      uvi: currentUv,
      pollenCount: aqiResponse.data.list[0].components,
      uvForecast: uvForecast,
      windForecast: {
        currentWind: currentWind,
        forecast: windForecast,
      },
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
