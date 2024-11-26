import MainWeatherDisplay from "./components/MainWeatherDisplay";
import WeatherMetrics from "./components/WeatherMetrics";
import HourlyForecast from "./components/HourlyForecast";
import DailyForecast from "./components/DailyForecast";
import WeatherAlerts from "./components/WeatherAlerts";
import AirQualityIndex from "./components/AirQualityIndex"; // Import the new component
import PrecipitationForecast from "./components/PrecipitationForecast";
import UvIndex from "./components/UvIndex";
import WindForecast from "./components/WindForecast";
import PollenCount from "./components/PollenCount";
import Astronomy from "./components/Astronomy";
import WeatherMap from "./components/WeatherMap";
import {
  sampleWeatherMapData,
  sampleAstronomy,
  samplePollenCount,
  sampleWindForecast,
  sampleUvIndex,
  samplePrecipitationForecast,
  sampleAlerts,
  sampleAQI,
  sampleMainDisplayData,
  sampleMetricData,
} from "./data/sampleWeatherData";

export const _sections = [
  {
    key: "main",
    component: MainWeatherDisplay,
    props: sampleMainDisplayData,
  },
  {
    key: "metrics",
    component: WeatherMetrics,
    props: sampleMetricData,
  },
  {
    key: "aqi",
    component: AirQualityIndex,
    props: sampleAQI,
  },
  {
    key: "precipitation",
    component: PrecipitationForecast,
    props: { forecast: samplePrecipitationForecast },
  },
  {
    key: "uvIndex",
    component: UvIndex,
    props: sampleUvIndex,
  },
  {
    key: "windForecast",
    component: WindForecast,
    props: sampleWindForecast,
  },
  {
    key: "pollenCount",
    component: PollenCount,
    props: samplePollenCount,
  },
  {
    key: "astronomy",
    component: Astronomy,
    props: sampleAstronomy,
  },
  {
    key: "weatherMap",
    component: WeatherMap,
    props: sampleWeatherMapData,
  },
  {
    key: "alerts",
    component: WeatherAlerts,
    props: { alerts: sampleAlerts },
  }, // Add this line
  { key: "hourly", component: HourlyForecast },
  { key: "daily", component: DailyForecast },
];
