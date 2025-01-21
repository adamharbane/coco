import React, { useState } from "react";
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Alert, ActivityIndicator, KeyboardAvoidingView, ScrollView, Platform } from "react-native";
import MapView, { Marker, Polyline } from "react-native-maps";

export default function HomePage() {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const [pickupCoords, setPickupCoords] = useState(null);
  const [destinationCoords, setDestinationCoords] = useState(null);
  const [routeCoordinates, setRouteCoordinates] = useState([]);
  const [loading, setLoading] = useState(false);

  const geocodeAddress = async (address) => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(
          address
        )}&format=json&limit=1`
      );
      const data = await response.json();
      if (data.length > 0) {
        return {
          latitude: parseFloat(data[0].lat),
          longitude: parseFloat(data[0].lon),
        };
      } else {
        Alert.alert("Erreur", `Adresse introuvable : ${address}`);
        return null;
      }
    } catch (error) {
      console.error("Erreur lors du géocodage :", error);
      Alert.alert("Erreur", "Une erreur est survenue lors du géocodage.");
      return null;
    }
  };

  const calculateRoute = async () => {
    if (!pickup || !destination) {
      Alert.alert("Erreur", "Veuillez entrer des adresses valides.");
      return;
    }

    setLoading(true);
    try {
      const pickupCoordinates = await geocodeAddress(pickup);
      const destinationCoordinates = await geocodeAddress(destination);

      if (!pickupCoordinates || !destinationCoordinates) {
        setLoading(false);
        return;
      }

      setPickupCoords(pickupCoordinates);
      setDestinationCoords(destinationCoordinates);

      const response = await fetch(
        `https://router.project-osrm.org/route/v1/driving/${pickupCoordinates.longitude},${pickupCoordinates.latitude};${destinationCoordinates.longitude},${destinationCoordinates.latitude}?overview=full`
      );
      const data = await response.json();

      if (data.routes && data.routes.length > 0) {
        const coordinates = data.routes[0].geometry.coordinates.map(([lon, lat]) => ({
          latitude: lat,
          longitude: lon,
        }));
        setRouteCoordinates(coordinates);

        const { distance, duration } = data.routes[0];
        Alert.alert(
          "Trajet calculé",
          `Distance : ${(distance / 1000).toFixed(2)} km\nDurée : ${(duration / 60).toFixed(2)} minutes`
        );
      } else {
        Alert.alert("Erreur", "Impossible de calculer le trajet.");
      }
    } catch (error) {
      console.error("Erreur lors du calcul du trajet :", error);
      Alert.alert("Erreur", "Une erreur est survenue lors du calcul du trajet.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 48.864716,
            longitude: 2.349014,
            latitudeDelta: 0.1,
            longitudeDelta: 0.1,
          }}
        >
          {pickupCoords && <Marker coordinate={pickupCoords} title="Point de départ" />}
          {destinationCoords && <Marker coordinate={destinationCoords} title="Destination" />}
          {routeCoordinates.length > 0 && (
            <Polyline coordinates={routeCoordinates} strokeWidth={4} strokeColor="blue" />
          )}
        </MapView>

        <View style={styles.controls}>
          <TextInput
            style={[styles.input, { backgroundColor: "#fff" }]} // Fond blanc pour contraste
            placeholder="Adresse de départ"
            value={pickup}
            onChangeText={(text) => setPickup(text)}
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            keyboardType="default"
          />
          <TextInput
            style={[styles.input, { backgroundColor: "#fff" }]} // Fond blanc pour contraste
            placeholder="Adresse de destination"
            value={destination}
            onChangeText={(text) => setDestination(text)}
            placeholderTextColor="#aaa"
            autoCapitalize="none"
            keyboardType="default"
          />
          <TouchableOpacity style={styles.button} onPress={calculateRoute} disabled={loading}>
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text style={styles.buttonText}>Calculer l'itinéraire</Text>
            )}
          </TouchableOpacity>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { flex: 1, minHeight: 300 },
  controls: {
    position: "relative",
    backgroundColor: "#fff",
    padding: 20,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: "#ddd",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "#000",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: { color: "#fff", fontSize: 16, fontWeight: "bold" },
});
