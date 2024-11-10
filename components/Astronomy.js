import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const Astronomy = ({props}) => {
    let { moonPhase, moonrise, moonset, starVisibility } = props;
  const getMoonPhaseIcon = (phase) => {
    switch (phase) {
      case "New Moon":
        return "moon-outline";
      case "Waxing Crescent":
        return "moon-waxing-crescent";
      case "First Quarter":
        return "moon-first-quarter";
      case "Waxing Gibbous":
        return "moon-waxing-gibbous";
      case "Full Moon":
        return "moon";
      case "Waning Gibbous":
        return "moon-waning-gibbous";
      case "Last Quarter":
        return "moon-last-quarter";
      case "Waning Crescent":
        return "moon-waning-crescent";
      default:
        return "moon-outline";
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Astronomy</Text>
      <View style={styles.infoContainer}>
        <View style={styles.moonPhaseContainer}>
          <Icon name={getMoonPhaseIcon(moonPhase)} size={48} color="#1d2939" />
          <Text style={styles.moonPhaseText}>{moonPhase}</Text>
        </View>
        <View style={styles.moonTimesContainer}>
          <Text style={styles.moonTimeText}>Moonrise: {moonrise}</Text>
          <Text style={styles.moonTimeText}>Moonset: {moonset}</Text>
        </View>
      </View>
      <View style={styles.starVisibilityContainer}>
        <Icon name="star" size={24} color="#1d2939" />
        <Text style={styles.starVisibilityText}>
          Star Visibility: {starVisibility}
        </Text>
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
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 16,
  },
  moonPhaseContainer: {
    alignItems: "center",
  },
  moonPhaseText: {
    marginTop: 8,
    fontSize: 16,
    color: "#2C3E50",
  },
  moonTimesContainer: {
    justifyContent: "center",
  },
  moonTimeText: {
    fontSize: 14,
    color: "#2C3E50",
    marginBottom: 4,
  },
  starVisibilityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  starVisibilityText: {
    fontSize: 16,
    color: "#2C3E50",
    marginLeft: 8,
  },
});

export default Astronomy;
