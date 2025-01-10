import React, { useState, useEffect } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Alert } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";

export default function HomePage() {
  const [pickup, setPickup] = useState(""); // Texte du point de départ
  const [destination, setDestination] = useState("");
  const [pickupSuggestions, setPickupSuggestions] = useState([]);
  const [destinationSuggestions, setDestinationSuggestions] = useState([]);
  const [pickupCoords, setPickupCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [region, setRegion] = useState(null);
  const [distance, setDistance] = useState(null);
  const [duration, setDuration] = useState(null);

  const GOOGLE_API_KEY = "YOUR_GOOGLE_MAPS_API_KEY";

  // Demande de permission et récupération de la position actuelle
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        Alert.alert("Permission refusée", "L'accès à la localisation est nécessaire.");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
      setPickup("Current Location");
      setPickupCoords({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
      });
    })();
  }, []);

  // Obtenir les suggestions d'adresse avec Google Places API
  const fetchSuggestions = async (input, setSuggestions) => {
    if (input.length < 3) return; // Ne pas envoyer de requête pour des entrées courtes

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${encodeURIComponent(
          input
        )}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        setSuggestions(data.predictions);
      } else {
        console.error("Erreur lors de la récupération des suggestions :", data.status);
      }
    } catch (error) {
      console.error("Erreur API Google Places :", error);
    }
  };

  // Obtenir les coordonnées pour une adresse sélectionnée
  const fetchCoordinates = async (placeId) => {
    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();

      if (data.status === "OK") {
        const { lat, lng } = data.result.geometry.location;
        return { latitude: lat, longitude: lng };
      } else {
        Alert.alert("Erreur", "Impossible de récupérer les coordonnées.");
        return null;
      }
    } catch (error) {
      console.error("Erreur API Google Place Details :", error);
    }
  };

  // Calculer le trajet avec Google Directions API
  const calculateRoute = async () => {
    if (!pickupCoords || !destinationCoords) {
      Alert.alert("Erreur", "Veuillez définir les points de départ et de destination.");
      return;
    }

    try {
      const response = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${pickupCoords.latitude},${pickupCoords.longitude}&destination=${destinationCoords.latitude},${destinationCoords.longitude}&key=${GOOGLE_API_KEY}`
      );
      const data = await response.json();

      if (data.routes.length > 0) {
        const route = data.routes[0];
        setDistance(route.legs[0].distance.text);
        setDuration(route.legs[0].duration.text);
        Alert.alert("Trajet calculé", `Distance : ${route.legs[0].distance.text}, Durée : ${route.legs[0].duration.text}`);
      } else {
        Alert.alert("Erreur", "Impossible de calculer le trajet.");
      }
    } catch (error) {
      console.error("Erreur lors du calcul du trajet :", error);
    }
  };

  return (
    <View style={styles.container}>
      <MapView style={styles.map} region={region} showsUserLocation={true}>
        {pickupCoords && <Marker coordinate={pickupCoords} title="Point de départ" />}
        {destinationCoords && <Marker coordinate={destinationCoords} title="Destination" />}
      </MapView>

      <View style={styles.bottomPanel}>
        <Text style={styles.bottomTitle}>Plan your ride</Text>

        {/* Champ pour le point de départ */}
        <View style={styles.locationContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Pick-up"
            placeholderTextColor="#aaa"
            value={pickup}
            onChangeText={(text) => {
              setPickup(text);
              fetchSuggestions(text, setPickupSuggestions);
            }}
          />
          <FlatList
            data={pickupSuggestions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={async () => {
                  setPickup(item.description);
                  const coords = await fetchCoordinates(item.place_id);
                  if (coords) setPickupCoords(coords);
                  setPickupSuggestions([]);
                }}
              >
                <Text style={styles.suggestionText}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Champ pour la destination */}
        <View style={styles.locationContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Destination"
            placeholderTextColor="#aaa"
            value={destination}
            onChangeText={(text) => {
              setDestination(text);
              fetchSuggestions(text, setDestinationSuggestions);
            }}
          />
          <FlatList
            data={destinationSuggestions}
            keyExtractor={(item) => item.place_id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.suggestionItem}
                onPress={async () => {
                  setDestination(item.description);
                  const coords = await fetchCoordinates(item.place_id);
                  if (coords) setDestinationCoords(coords);
                  setDestinationSuggestions([]);
                }}
              >
                <Text style={styles.suggestionText}>{item.description}</Text>
              </TouchableOpacity>
            )}
          />
        </View>

        {/* Bouton pour calculer le trajet */}
        <TouchableOpacity style={styles.calculateButton} onPress={calculateRoute}>
          <Text style={styles.calculateButtonText}>Calculate Route</Text>
        </TouchableOpacity>

        {/* Affichage des informations sur le trajet */}
        {distance && duration && (
          <View style={styles.routeInfo}>
            <Text style={styles.infoText}>Distance: {distance}</Text>
            <Text style={styles.infoText}>Duration: {duration}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f9f9f9" },
  map: { flex: 1 },
  bottomPanel: { position: "absolute", bottom: 0, left: 0, right: 0, backgroundColor: "#fff", borderTopLeftRadius: 20, borderTopRightRadius: 20, padding: 20, height: "40%" },
  bottomTitle: { fontSize: 18, fontWeight: "bold", color: "#333", textAlign: "center", marginBottom: 15 },
  locationContainer: { marginBottom: 15 },
  textInput: { backgroundColor: "#f5f5f5", borderRadius: 10, padding: 10, fontSize: 14, borderWidth: 1, borderColor: "#ddd" },
  suggestionItem: { padding: 10, borderBottomWidth: 1, borderBottomColor: "#ddd" },
  suggestionText: { fontSize: 14, color: "#333" },
  calculateButton: { backgroundColor: "#000", borderRadius: 10, padding: 15, alignItems: "center" },
  calculateButtonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
  routeInfo: { marginTop: 15 },
  infoText: { fontSize: 14, color: "#333" },
});
