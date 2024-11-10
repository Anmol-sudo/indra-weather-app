import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const WindForecast = ({ props }) => {
  let { currentWind, forecast } = props;

  const getWindDirection = (degrees) => {
    const directions = ["N", "NE", "E", "SE", "S", "SW", "W", "NW"];
    return directions[Math.round(degrees / 45) % 8];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Wind Forecast</Text>
      <View style={styles.currentWind}>
        <Icon name="wind" size={24} color="#0277bd" />
        <Text style={styles.windValue}>
          {currentWind.speed} mph {getWindDirection(currentWind.direction)}
        </Text>
      </View>
      <View style={styles.forecast}>
        {forecast.map((item, index) => (
          <View key={index} style={styles.forecastItem}>
            <Text style={styles.time}>{item.time}</Text>
            <View style={styles.windInfo}>
              <Text style={styles.windSpeed}>{item.speed} mph</Text>
              <Text style={styles.windDirection}>
                {getWindDirection(item.direction)}
              </Text>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e3f2fd",
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#0277bd",
    marginBottom: 12,
  },
  currentWind: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  windValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#0277bd",
    marginLeft: 8,
  },
  forecast: {
    borderTopWidth: 1,
    borderTopColor: "#bbdefb",
    paddingTop: 12,
  },
  forecastItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  time: {
    fontSize: 16,
    color: "#0277bd",
  },
  windInfo: {
    flexDirection: "row",
  },
  windSpeed: {
    fontSize: 16,
    color: "#0277bd",
    marginRight: 8,
  },
  windDirection: {
    fontSize: 16,
    color: "#0277bd",
    fontWeight: "bold",
  },
});

export default WindForecast;
