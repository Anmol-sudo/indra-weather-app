import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";

const AlertItem = ({ title, description, expirationTime }) => (
  <View style={styles.alertItem}>
    <Text style={styles.alertTitle}>{title}</Text>
    <Text style={styles.alertDescription}>{description}</Text>
    <Text style={styles.alertExpiration}>Expires: {expirationTime}</Text>
  </View>
);

const WeatherAlerts = ({ props }) => {
  
  const { alerts } = props;

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Weather Alerts</Text>
      {alerts && alerts.length > 0 ? (
        <FlatList
          data={alerts}
          renderItem={({ item }) => <AlertItem {...item} />}
          keyExtractor={(item, index) => index.toString()}
        />
      ) : (
        <Text style={styles.noAlertsText}>No active weather alerts</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 16,
    backgroundColor: "#f8f8f8",
    borderRadius: 10,
    marginVertical: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  alertItem: {
    backgroundColor: "#fff",
    borderRadius: 8,
    padding: 12,
    marginBottom: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#ff9800",
  },
  alertTitle: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  alertDescription: {
    fontSize: 14,
    color: "#666",
    marginBottom: 4,
  },
  alertExpiration: {
    fontSize: 12,
    color: "#999",
  },
  noAlertsText: {
    fontSize: 16,
    color: "#666",
    fontStyle: "italic",
  },
});

export default WeatherAlerts;
