import { useEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  View,
  Vibration,
} from "react-native";

import Header from "./components/Header";
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
import { getCurrentWeather } from "./services/weatherService";

const { width: screenWidth } = Dimensions.get("window");

const WeatherSection = ({ component: Component, ...props }) => (
  <Component {...props} />
);

export default function App() {
  const [currentLocation, setCurrentLocation] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const [sections, setSections] = useState([
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
  ]);

  useEffect(() => {
    fetchWeather(currentLocation);
  }, [currentLocation]);

  const fetchWeather = async (location) => {
    try {
      const data = await getCurrentWeather(location);
      setWeatherData(data);
      updateComponentsData(data);

      Vibration.vibrate(500);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const updateComponentsData = (data) => {
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.key === "main") {
          return {
            ...section,
            props: {
              city: data.name,
              state: data.sys.country, // You might want to map country code to state name
              temperature: data.main.temp.toFixed(1),
              condition: data.weather[0].main,
              feelsLike: data.main.feels_like.toFixed(1),
              highTemp: data.main.temp_max.toFixed(1),
              lowTemp: data.main.temp_min.toFixed(1),
              lastUpdated: new Date().toLocaleTimeString(),
              sunrise: new Date(data.sys.sunrise * 1000).toLocaleTimeString(),
              sunset: new Date(data.sys.sunset * 1000).toLocaleTimeString(),
            },
          };
        } else if (section.key === "metrics") {
          return {
            ...section,
            props: {
              wind: {
                speed: data.wind.speed,
                direction: data.wind.deg,
              },
              pressure: data.main.pressure,
              humidity: data.main.humidity,
              city: data.name,
            },
          };
        } else if (section.key === "aqi") {

          // Function to get AQI description
          const getAQIDescription = (aqi) => {
            if (aqi <= 50) return "Good";
            if (aqi <= 100) return "Moderate";
            if (aqi <= 150) return "Unhealthy for Sensitive Groups";
            if (aqi <= 200) return "Unhealthy";
            if (aqi <= 300) return "Very Unhealthy";
            return "Hazardous";
          };
          
          return {
            ...section,
            props: {
              aqi: data.aqi,
              aqiDescription: getAQIDescription(data.aqi),
              city: data.name,
            },
          };
        } else {
          return section;
        }
      })
    );
  };

  const handleLocationChange = (newLocation, weatherData) => {
    setCurrentLocation(newLocation);
    const updatedSections = sections.map((section) => {
      if (section.key) {
        return {
          ...section,
          props: {
            ...section.props,
          },
        };
      }
      return section;
    });
    setSections(updatedSections);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.container}>
        <Header onLocationChange={handleLocationChange} />
        <View style={styles.contentContainer}>
          <FlatList
            data={sections}
            renderItem={({ item }) => <WeatherSection {...item} />}
            keyExtractor={(item) => item.key}
            showsVerticalScrollIndicator={false}
            bounces={true}
            overScrollMode="always"
            decelerationRate="normal"
            contentContainerStyle={styles.flatListContent}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Add this
    borderColor: "pink",
    borderWidth: 2,
    padding: 16,
    width: screenWidth,
    flexDirection: "column",
    justifyContent: "flex-start",
  },
  contentContainer: {
    // backgroundColor: "pink",
    flex: 1,
    // padding: 16,
  },
  scrollView: {},
  flatListContent: {
    flexGrow: 1,
    paddingBottom: 20,
  },
});
