import React from "react";
import { View, Text, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, Heatmap } from "react-native-maps";

const { width, height } = Dimensions.get("window");

const ASPECT_RATIO = width / height;
const LATITUDE_DELTA = 0.0922;
const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;

const WeatherMap = ({ props }) => {
    let { region, weatherData } = props;
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Weather Map</Text>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: region.latitude,
          longitude: region.longitude,
          latitudeDelta: LATITUDE_DELTA,
          longitudeDelta: LONGITUDE_DELTA,
        }}
      >
        <Marker
          coordinate={{
            latitude: region.latitude,
            longitude: region.longitude,
          }}
          title="Current Location"
        />
        <Heatmap
          points={weatherData}
          radius={50}
          opacity={0.7}
          gradient={{
            colors: ["#79BC6A", "#BBCF4C", "#EEC20B", "#F29305", "#E50000"],
            startPoints: [0, 0.25, 0.5, 0.75, 1],
            colorMapSize: 256,
          }}
        />
      </MapView>
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
  map: {
    width: "100%",
    height: 300,
    borderRadius: 10,
  },
});

export default WeatherMap;
