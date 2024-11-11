import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";

const PollenCount = ({ props }) => {
  const [loading, setLoading] = useState(true);
  const [pollenData, setPollenData] = useState({
    overall: undefined,
    types: [],
  });

  useEffect(() => {
    if (props.overall !== undefined && props.types) {
      setPollenData({ overall: props.overall, types: props.types });
      setLoading(false);
    }
  }, [props.overall, props.types]);

  const getPollenLevel = (count) => {
    if (count < 2.5) return "Low";
    if (count < 5.0) return "Moderate";
    if (count < 7.5) return "High";
    return "Very High";
  };

  const getPollenColor = (count) => {
    if (count < 2.5) return "#4CAF50";
    if (count < 5.0) return "#FFC107";
    if (count < 7.5) return "#FF9800";
    return "#F44336";
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading pollen data...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Pollen Count</Text>
      {pollenData.overall !== undefined && (
        <View style={styles.overallContainer}>
          <Icon
            name="flower-pollen"
            size={24}
            color={getPollenColor(pollenData.overall)}
          />
          <Text
            style={[
              styles.overallText,
              { color: getPollenColor(pollenData.overall) },
            ]}
          >
            {getPollenLevel(pollenData.overall)} (Overall:{" "}
            {pollenData.overall.toFixed(1)})
          </Text>
        </View>
      )}
      <View style={styles.tableContainer}>
        <View style={styles.tableHeader}>
          <Text style={styles.headerCell}>Pollen Type</Text>
          <Text style={styles.headerCell}>Count</Text>
          <Text style={styles.headerCell}>Level</Text>
        </View>
        <ScrollView>
          {pollenData.types.map((type) => (
            <View key={type.name} style={styles.tableRow}>
              <Text style={styles.cellName}>{type.name}</Text>
              <Text style={styles.cellValue}>{type.count.toFixed(1)}</Text>
              <Text
                style={[
                  styles.cellLevel,
                  { color: getPollenColor(type.count) },
                ]}
              >
                {getPollenLevel(type.count)}
              </Text>
            </View>
          ))}
        </ScrollView>
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
  tableContainer: {
    borderWidth: 1,
    borderColor: "#BDC3C7",
    borderRadius: 8,
  },
  tableHeader: {
    flexDirection: "row",
    backgroundColor: "#F0F4F8",
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  headerCell: {
    flex: 1,
    fontWeight: "bold",
    color: "#34495E",
  },
  tableRow: {
    flexDirection: "row",
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderTopWidth: 1,
    borderTopColor: "#BDC3C7",
  },
  cellName: {
    flex: 1,
    color: "#2C3E50",
  },
  cellValue: {
    flex: 1,
    textAlign: "auto",
    fontWeight: "bold",
    color: "#34495E",
  },
  cellLevel: {
    flex: 1,
    textAlign: "auto",
    fontWeight: "bold",
  },
});

export default PollenCount;
