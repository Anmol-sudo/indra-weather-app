import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";
import Icon from "react-native-vector-icons/Feather";

const PrecipitationForecast = ({ props }) => {
  let { forecast, city } = props;
 
  
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Precipitation Forecast for {city}</Text>
      {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}> */}
        {forecast.map((item, index) => (
          <View key={index} style={styles.forecastItem}>
            <Text style={styles.time}>{item.time}</Text>
            <Icon
              name={item.type === "rain" ? "cloud-rain" : "cloud-snow"}
              size={24}
              color="#4287f5"
            />
            <Text style={styles.amount}>{item.amount}</Text>
          </View>
        ))}
      {/* </ScrollView> */}
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
    color: "#1565c0",
    marginBottom: 12,
  },
  forecastItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  time: {
    fontSize: 16,
    color: "#1565c0",
    width: "30%",
  },
  amount: {
    fontSize: 16,
    color: "#1565c0",
    width: "30%",
    textAlign: "right",
  },
});

export default PrecipitationForecast;
