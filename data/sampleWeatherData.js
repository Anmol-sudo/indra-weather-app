// Sample Weather Map data

export const sampleMainDisplayData = {
  city: "San Francisco",
  state: "CA",
  temperature: "72",
  condition: "Partly Cloudy",
  feelsLike: "70",
  highTemp: "75",
  lowTemp: "65",
  lastUpdated: "2:30 PM",
  sunrise: "6:42 AM",
  sunset: "7:23 PM",
};

export const sampleMetricData = {
  wind: { speed: 0, direction: 0 },
  pressure: 0,
  humidity: 0,
};

export const sampleWeatherMapData = {
  region: {
    latitude: 29.8543,
    longitude: 77.888,
  },
  weatherData: [
    { latitude: 29.8543, longitude: 77.888, weight: 1 },
    { latitude: 29.855, longitude: 77.889, weight: 0.8 },
    { latitude: 29.854, longitude: 77.887, weight: 0.6 },
    { latitude: 29.856, longitude: 77.886, weight: 0.7 },
    { latitude: 29.853, longitude: 77.89, weight: 0.5 },
  ],
};

// Sample Astronomy data
export const sampleAstronomy = {
  moonPhase: "Waxing Crescent",
  moonrise: "3:45 PM",
  moonset: "2:30 AM",
  starVisibility: "Good",
};

// Sample Pollen Count data
export const samplePollenCount = {
  overall: 5.6,
  types: [
    { name: "Tree", count: 3.2 },
    { name: "Grass", count: 6.8 },
    { name: "Weed", count: 4.5 },
    { name: "Mold", count: 2.1 },
  ],
};

// Sample Wind Forecast data
export const sampleWindForecast = {
  currentWind: { speed: 10, direction: 225 },
  forecast: [
    { time: "12 PM", speed: 12, direction: 240 },
    { time: "1 PM", speed: 11, direction: 235 },
    { time: "2 PM", speed: 13, direction: 230 },
    { time: "3 PM", speed: 12, direction: 225 },
    { time: "4 PM", speed: 10, direction: 220 },
  ],
};

// Sample UV index data
export const sampleUvIndex = {
  currentUv: 6,
  forecast: [
    { time: "12 PM", uv: 5 },
    { time: "1 PM", uv: 6 },
    { time: "2 PM", uv: 7 },
    { time: "3 PM", uv: 6 },
    { time: "4 PM", uv: 5 },
  ],
};

// Sample precipitation forecast data
export const samplePrecipitationForecast = [
  { time: "3 PM", type: "rain", amount: "0.1 in" },
  { time: "4 PM", type: "rain", amount: "0.3 in" },
  { time: "5 PM", type: "rain", amount: "0.2 in" },
  { time: "6 PM", type: "rain", amount: "0.1 in" },
  { time: "7 PM", type: "snow", amount: "0.5 in" },
];

// Sample alerts data
export const sampleAlerts = [
  {
    title: "Severe Thunderstorm Warning",
    description: "Possible hail and strong winds expected in the area.",
    expirationTime: "8:00 PM",
  },
  {
    title: "Flash Flood Watch",
    description:
      "Heavy rainfall may lead to flash flooding in low-lying areas.",
    expirationTime: "10:00 PM",
  },
];

// Sample AQI data
export const sampleAQI = {
  aqi: 42,
  description: "Good",
};
