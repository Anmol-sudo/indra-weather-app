import React, { useState, useCallback, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Dimensions,
  Alert,
} from "react-native";
import * as Font from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import Icon5 from "react-native-vector-icons/FontAwesome5";
import Icon6 from "react-native-vector-icons/FontAwesome6";
import {getCurrentWeather } from "../services/weatherService";


const { width: screenWidth } = Dimensions.get("window");

const Header = ({ onLocationChange, toggleDrawer }) => {
  const [appIsReady, setAppIsReady] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function prepare() {
      try {
        await Font.loadAsync({
          "Roboto-Medium": require("../assets/fonts/Roboto-Medium.ttf"),
        });
        await new Promise((resolve) => setTimeout(resolve, 500));
      } catch (e) {
        console.warn(e);
      } finally {
        setAppIsReady(true);
      }
    }
    prepare();
  }, []);

  const onLayoutRootView = useCallback(async () => {
    if (appIsReady) {
      await SplashScreen.hideAsync();
    }
  }, [appIsReady]);

  const handleSearch = async () => {
    if (searchQuery.trim()) {
      try {
        const weatherData = await getCurrentWeather(searchQuery);
        
        onLocationChange(searchQuery, weatherData); // Pass both location and weather data
        setIsSearching(false);
        setSearchQuery("");
      } catch (error) {
        console.error("Error fetching weather data:", error);
        Alert.alert("Error", "Failed to fetch weather data. Please try again.");
      }
    }
  };

  if (!appIsReady) {
    return null;
  }

  return (
    <View style={styles.headerContainer} onLayout={onLayoutRootView}>
      {isSearching ? (
        <View style={styles.searchContainer}>
          <TextInput
            style={styles.searchInput}
            placeholder="Enter location..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={() => setIsSearching(false)}>
            <Icon5 name="times" size={24} color="#000" />
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <View style={styles.leftIcon}>
            <TouchableOpacity onPress={toggleDrawer}>
              <Icon5 name="bars" size={30} color="#000" />
            </TouchableOpacity>
          </View>
          <View style={styles.centerTitle}>
            <Text style={styles.headerTitle}>INDRA</Text>
          </View>
          <View style={styles.rightIcons}>
            <TouchableOpacity
              onPress={() => setIsSearching(true)}
              style={styles.iconSpacing}
            >
              <Icon5 name="search" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity onPress={toggleDrawer}>
              <Icon6 name="circle-user" size={30} color="#000" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    width: screenWidth * 0.92,
    height: 73,
    borderColor: "black",
    borderWidth: 1,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
  },
  leftIcon: {
    flex: 1,
    alignItems: "flex-start",
  },
  centerTitle: {
    flex: 2,
    alignItems: "center",
  },
  headerTitle: {
    fontFamily: "Roboto-Medium",
    fontSize: 24,
    fontWeight: "bold",
  },
  rightIcons: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
  },
  searchContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
  },
  searchInput: {
    flex: 1,
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  iconSpacing: {
    marginRight: 16,
  },
});

export default Header;
