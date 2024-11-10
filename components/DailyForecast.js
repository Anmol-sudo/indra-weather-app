import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const DailyForecastItem = ({ day, icon, highTemp, lowTemp }) => (
  <View style={styles.dailyItem}>
    <Text style={styles.dayText}>{day}</Text>
    <Icon name={icon} size={24} color="#4287f5" />
    <Text style={styles.tempText}>
      {highTemp}° / {lowTemp}°
    </Text>
  </View>
);

const DailyForecast = () => {
  const dailyData = [
    { day: "Mon", icon: "sun", highTemp: 75, lowTemp: 65 },
    { day: "Tue", icon: "cloud", highTemp: 73, lowTemp: 64 },
    { day: "Wed", icon: "cloud-rain", highTemp: 70, lowTemp: 62 },
    { day: "Thu", icon: "sun", highTemp: 72, lowTemp: 63 },
    { day: "Fri", icon: "cloud", highTemp: 71, lowTemp: 62 },
    { day: "Sat", icon: "sun", highTemp: 74, lowTemp: 65 },
    { day: "Sun", icon: "sun", highTemp: 76, lowTemp: 66 },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>7-Day Forecast</Text>
      <FlatList
        data={dailyData}
        renderItem={({ item }) => <DailyForecastItem {...item} />}
        keyExtractor={(item) => item.day}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 20,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  dailyItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  dayText: {
    fontSize: 16,
    width: 50,
  },
  tempText: {
    fontSize: 16,
  },
});

export default DailyForecast;
