import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import MapView from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";

// Écrans pour chaque fonctionnalité
function ChatScreen() {
  return (
    <View style={styles.screen}>
      <Text>Chat Screen</Text>
    </View>
  );
}

function SettingsScreen() {
  return (
    <View style={styles.screen}>
      <Text>Settings Screen</Text>
    </View>
  );
}

function HelpScreen() {
  return (
    <View style={styles.screen}>
      <Text>Help Screen</Text>
    </View>
  );
}

function DriverModeScreen() {
  return (
    <View style={styles.screen}>
      <Text>Driver Mode Screen</Text>
    </View>
  );
}

// Écran principal avec la carte
function MainScreen({ navigation }) {
  const [pickup, setPickup] = useState("Current Location");
  const [destination, setDestination] = useState("");

  return (
    <View style={styles.container}>
      {/* Carte */}
      <MapView style={styles.map} />

      {/* Barre inférieure */}
      <View style={styles.bottomPanel}>
        {/* Barre supérieure avec icône hamburger */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.openDrawer()}>
            <Ionicons name="menu-outline" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.title}>Plan your ride</Text>
        </View>

        {/* Option "Pick-up now" */}
        <TouchableOpacity style={styles.pickupOption}>
          <Ionicons name="time-outline" size={16} color="#333" />
          <Text style={styles.pickupText}>Pick-up now</Text>
          <Ionicons name="chevron-down-outline" size={16} color="#333" />
        </TouchableOpacity>

        {/* Section localisation */}
        <View style={styles.locationContainer}>
          {/* Localisation actuelle */}
          <View style={styles.locationRow}>
            <Ionicons name="location-outline" size={16} color="#007aff" />
            <Text style={styles.locationText}>{pickup}</Text>
          </View>

          <View style={styles.divider} />

          {/* Destination */}
          <View style={styles.locationRow}>
            <Ionicons name="navigate-outline" size={16} color="#333" />
            <TextInput
              style={styles.destinationInput}
              placeholder="Where to?"
              placeholderTextColor="#aaa"
              value={destination}
              onChangeText={setDestination}
            />
          </View>
        </View>
      </View>
    </View>
  );
}

// Drawer Navigator
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Main">
        <Drawer.Screen name="Plan your ride" component={MainScreen} />
        <Drawer.Screen name="Chat" component={ChatScreen} />
        <Drawer.Screen name="Settings" component={SettingsScreen} />
        <Drawer.Screen name="Help" component={HelpScreen} />
        <Drawer.Screen name="Driver Mode" component={DriverModeScreen} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  map: {
    flex: 1,
  },
  bottomPanel: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    padding: 15,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -2 },
    elevation: 5,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 10,
    color: "#333",
  },
  pickupOption: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 8,
    marginBottom: 12,
    width: 150,
  },
  pickupText: {
    flex: 1,
    marginLeft: 8,
    fontSize: 14,
    color: "#333",
  },
  locationContainer: {
    backgroundColor: "#f5f5f5",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 10,
    padding: 10,
  },
  locationRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 6,
  },
  locationText: {
    marginLeft: 8,
    fontSize: 14,
    color: "#007aff",
    fontWeight: "500",
  },
  destinationInput: {
    marginLeft: 8,
    flex: 1,
    fontSize: 14,
    color: "#333",
  },
  divider: {
    height: 1,
    backgroundColor: "#ddd",
    marginVertical: 8,
  },
  screen: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#fff",
  },
});
