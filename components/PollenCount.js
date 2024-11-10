import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const PollenCount = ({ props }) => {
  const { overall, types } = props;

  const getPollenLevel = (count) => {
    if (count <= 2.4) return "Low";
    if (count <= 4.8) return "Moderate";
    if (count <= 7.2) return "High";
    return "Very High";
  };

  const getPollenColor = (count) => {
    if (count <= 2.4) return "#4CAF50";
    if (count <= 4.8) return "#FFC107";
    if (count <= 7.2) return "#FF9800";
    return "#F44336";
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pollen Count</Text>
      <View style={styles.overallContainer}>
        <Icon name="flower" size={24} color={getPollenColor(overall)} />
        <Text style={[styles.overallText, { color: getPollenColor(overall) }]}>
          {getPollenLevel(overall)} ({overall.toFixed(1)})
        </Text>
      </View>
      <View style={styles.typesContainer}>
        {types.map((type, index) => (
          <View key={index} style={styles.typeItem}>
            <Text style={styles.typeText}>{type.name}</Text>
            <Text
              style={[styles.typeCount, { color: getPollenColor(type.count) }]}
            >
              {type.count.toFixed(1)}
            </Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F0F4F8",
    borderRadius: 10,
    padding: 16,
    marginVertical: 10,
  },
  heading: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2C3E50",
    marginBottom: 12,
  },
  overallContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  overallText: {
    fontSize: 20,
    fontWeight: "bold",
    marginLeft: 8,
  },
  typesContainer: {
    borderTopWidth: 1,
    borderTopColor: "#BDC3C7",
    paddingTop: 12,
  },
  typeItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  typeText: {
    fontSize: 16,
    color: "#2C3E50",
  },
  typeCount: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default PollenCount;
