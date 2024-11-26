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

import {
  getCurrentWeather,
  getForecastWeather,
} from "./services/weatherService";
import { _sections } from "./appConfig";

const { width: screenWidth } = Dimensions.get("window");

const WeatherSection = ({ component: Component, ...props }) => (
  <Component {...props} />
);

export default function App() {
  const [currentLocation, setCurrentLocation] = useState("Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null);
  const [sections, setSections] = useState(_sections);

  useEffect(() => {
    fetchWeather(currentLocation);
  }, [currentLocation]);

  const fetchWeather = async (location) => {
    try {
      let _weatherData = await getCurrentWeather(location);
      let _forecastData = await getForecastWeather(location);
      setWeatherData(_weatherData);
      setForecastData(_forecastData);
      updateComponentsData(_weatherData, _forecastData);

      Vibration.vibrate(500);
    } catch (error) {
      console.error("Error fetching weather:", error);
    }
  };

  const updateComponentsData = (weatherData, forecastData) => {
    setSections((prevSections) =>
      prevSections.map((section) => {
        if (section.key === "main") {
          return {
            ...section,
            props: {
              city: weatherData.name,
              state: weatherData.sys.country, // You might want to map country code to state name
              temperature: weatherData.main.temp.toFixed(1),
              condition: weatherData.weather[0].main,
              feelsLike: weatherData.main.feels_like.toFixed(1),
              highTemp: weatherData.main.temp_max.toFixed(1),
              lowTemp: weatherData.main.temp_min.toFixed(1),
              lastUpdated: new Date().toLocaleTimeString(),
              sunrise: new Date(
                weatherData.sys.sunrise * 1000
              ).toLocaleTimeString(),
              sunset: new Date(
                weatherData.sys.sunset * 1000
              ).toLocaleTimeString(),
            },
          };
        } else if (section.key === "metrics") {
          return {
            ...section,
            props: {
              wind: {
                speed: weatherData.wind.speed,
                direction: weatherData.wind.deg,
              },
              pressure: weatherData.main.pressure,
              humidity: weatherData.main.humidity,
              city: weatherData.name,
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
              aqi: weatherData.aqi,
              aqiDescription: getAQIDescription(weatherData.aqi),
              city: weatherData.name,
            },
          };
        } else if (section.key === "precipitation") {
          const precipitationForecast = forecastData.list
            .slice(0, 8) // Next 24 hours (3-hour steps)
            .map((item) => ({
              time: new Date(item.dt * 1000).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              }),
              type: item.rain ? "rain" : item.snow ? "snow" : "clear",
              amount: item.rain
                ? `${item.rain["3h"]} mm`
                : item.snow
                ? `${item.snow["3h"]} mm`
                : "0 mm",
            }));

          return {
            ...section,
            props: {
              forecast: precipitationForecast,
              city: weatherData.name,
            },
          };
        } 
        else if (section.key === "uvIndex") {
          return {
            ...section,
            props: {
              currentUv: weatherData.uvi,
              forecast: weatherData.uvForecast,
              city: weatherData.name,
            },
          };
        }
        else if (section.key === "windForecast") {
          return {
            ...section,
            props: {
              city: weatherData.name,
              currentWind: weatherData.windForecast.currentWind,
              forecast: weatherData.windForecast.forecast,
            },
          };
        }
        else if (section.key === "pollenCount") {
          return {
            ...section,
            props: {
              city: weatherData.name,
              pollenCount: weatherData.pollenCount,
            },
          };
        }
        else {
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
