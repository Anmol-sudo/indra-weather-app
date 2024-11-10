import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const HourlyForecastItem = ({ time, icon, temperature }) => (
  <View style={styles.hourlyItem}>
    <Text style={styles.timeText}>{time}</Text>
    <Icon name={icon} size={24} color="#4287f5" />
    <Text style={styles.temperatureText}>{temperature}°</Text>
  </View>
);

const HourlyForecast = () => {
  const hourlyData = [
    { time: "12 PM", icon: "sun", temperature: 72 },
    { time: "1 PM", icon: "cloud", temperature: 73 },
    { time: "2 PM", icon: "cloud-rain", temperature: 71 },
    { time: "3 PM", icon: "sun", temperature: 74 },
    { time: "4 PM", icon: "sun", temperature: 75 },
    { time: "5 PM", icon: "cloud", temperature: 73 },
    { time: "6 PM", icon: "cloud", temperature: 72 },
    { time: "7 PM", icon: "moon", temperature: 70 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hourly Forecast</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {hourlyData.map((item, index) => (
          <HourlyForecastItem
            key={index}
            time={item.time}
            icon={item.icon}
            temperature={item.temperature}
          />
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  hourlyItem: {
    alignItems: "center",
    marginHorizontal: 10,
    paddingVertical: 10,
  },
  timeText: {
    fontSize: 14,
    marginBottom: 5,
  },
  temperatureText: {
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default HourlyForecast;
