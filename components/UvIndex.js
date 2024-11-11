import React from "react";
import { View, Text, StyleSheet } from "react-native";

const UvIndex = ({ props }) => {
  
  let { city, currentUv, forecast } = props;
  
  const getUvLevel = (index) => {
    if (index <= 2) return "Low";
    if (index <= 5) return "Moderate";
    if (index <= 7) return "High";
    if (index <= 10) return "Very High";
    return "Extreme";
  };

  const getUvColor = (index) => {
    if (index <= 2) return "#3EA72D";
    if (index <= 5) return "#FFF300";
    if (index <= 7) return "#F18B00";
    if (index <= 10) return "#E53210";
    return "#B567A4";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>UV Index</Text>
      <View style={styles.currentUv}>
        <Text style={styles.uvValue}>{currentUv}</Text>
        <Text style={[styles.uvLevel, { color: getUvColor(currentUv) }]}>
          {getUvLevel(currentUv)}
        </Text>
      </View>
      <View style={styles.forecast}>
        {forecast.map((item, index) => (
          <View key={index} style={styles.forecastItem}>
            <Text style={styles.time}>{item.time}</Text>
            <Text style={[styles.forecastUv, { color: getUvColor(item.uv) }]}>
              {item.uv}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#e1f5fe",
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
  currentUv: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  uvValue: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#0277bd",
    marginRight: 12,
  },
  uvLevel: {
    fontSize: 18,
    fontWeight: "bold",
  },
  forecast: {
    borderTopWidth: 1,
    borderTopColor: "#b3e5fc",
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
  forecastUv: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default UvIndex;
