import React, { useState } from "react";
import { View, StyleSheet, TextInput, TouchableOpacity, Text, KeyboardAvoidingView, Platform, Dimensions } from "react-native";
import { WebView } from "react-native-webview";
import { Ionicons } from "@expo/vector-icons";

export default function HomePage() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [htmlContent, setHtmlContent] = useState(""); // Stocker le contenu HTML

  const generateHTML = (startAddress = "", endAddress = "") => {
    return `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Fleet Map</title>
        <script src="https://unpkg.com/leaflet@1.9.3/dist/leaflet.js"></script>
        <script src="https://unpkg.com/leaflet-routing-machine@3.2.12/dist/leaflet-routing-machine.min.js"></script>
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.3/dist/leaflet.css" />
        <style>
          #map { height: 100vh; width: 100%; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          const map = L.map('map').setView([48.864716, 2.349014], 13);

          let routingControl;

          async function geocode(address) {
            const response = await fetch(\`https://nominatim.openstreetmap.org/search?q=\${encodeURIComponent(address)}&format=json&limit=1\`);
            const data = await response.json();
            if (data.length > 0) {
              return [parseFloat(data[0].lat), parseFloat(data[0].lon)];
            } else {
              alert(\`Address not found: \${address}\`);
              return null;
            }
          }

          async function calculateRoute(startAddress, endAddress) {
            const startCoords = await geocode(startAddress);
            const endCoords = await geocode(endAddress);

            if (!startCoords || !endCoords) return;

            if (routingControl) {
              map.removeControl(routingControl); // Supprime l'ancien contrôle de routage
            }

            routingControl = L.Routing.control({
              waypoints: [
                L.latLng(startCoords[0], startCoords[1]),
                L.latLng(endCoords[0], endCoords[1])
              ],
              routeWhileDragging: true
            }).addTo(map);
          }

          function clearRoute() {
            if (routingControl) {
              map.removeControl(routingControl); // Supprime le contrôle de routage
              routingControl = null;
            }
          }

          if ("${startAddress}" && "${endAddress}") {
            calculateRoute("${startAddress}", "${endAddress}");
          }

          window.clearRoute = clearRoute; // Expose la fonction pour l'appeler depuis React Native
        </script>
      </body>
      </html>
    `;
  };

  const handleRoute = () => {
    if (!pickup.trim() || !destination.trim()) {
      alert("Veuillez entrer les adresses de départ et de destination.");
    } else {
      setHtmlContent(generateHTML(pickup.trim(), destination.trim()));
    }
  };

  const clearRoute = () => {
    setHtmlContent(generateHTML()); // Recharge la carte sans itinéraire
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <View style={styles.iconsContainer}>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="arrow-back" size={24} color="#000" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <Ionicons name="notifications-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <WebView
        originWhitelist={["*"]}
        source={{ html: htmlContent || generateHTML() }}
        style={styles.mapContainer}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onMessage={(event) => {
          if (event.nativeEvent.data === "clearRoute") {
            clearRoute();
          }
        }}
      />

      <View style={styles.bottomContainer}>
        <TextInput
          style={styles.input}
          placeholder="Adresse de départ"
          value={pickup}
          onChangeText={(text) => setPickup(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Adresse de destination"
          value={destination}
          onChangeText={(text) => setDestination(text)}
        />
        <TouchableOpacity style={styles.button} onPress={handleRoute}>
          <Text style={styles.buttonText}>Afficher l'itinéraire</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.button, styles.clearButton]} onPress={clearRoute}>
          <Text style={styles.buttonText}>Effacer l'itinéraire</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  iconsContainer: {
    position: "absolute",
    top: 50,
    left: 20,
    right: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    zIndex: 1,
  },
  iconButton: {
    backgroundColor: "#fff",
    borderRadius: 20,
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mapContainer: {
    flex: 1,
  },
  bottomContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "#fff",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
    height: Dimensions.get("window").height * 0.4,
  },
  input: {
    height: 50,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: "#f9f9f9",
    fontSize: 16,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 10,
  },
  clearButton: {
    backgroundColor: "#ff0000",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});