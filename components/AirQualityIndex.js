import React from "react";
import { View, Text, StyleSheet } from "react-native";

const AirQualityIndex = ({ props }) => {
    let {aqi, description} = props;
    
    return (
    <View style={styles.container}>
      <Text style={styles.heading}>Air Quality Index</Text>
      <View style={styles.content}>
        <Text style={styles.aqiValue}>{aqi}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e8f5e9",
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2e7d32",
    marginBottom: 8,
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
  },
  aqiValue: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#2e7d32",
    marginRight: 12,
  },
  description: {
    fontSize: 16,
    color: "#1b5e20",
  },
});

export default AirQualityIndex;
