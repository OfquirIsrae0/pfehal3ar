import React, { useEffect, useState } from 'react';
import { View, Text, ActivityIndicator, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import app from '../../firebase';

const db = getFirestore(app);

const MapScreen = ({ route }) => {
  const { trackedUserId } = route.params || {};
  const [location, setLocation] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!trackedUserId) {
      Alert.alert("Erreur", "trackedUserId est manquant.");
      setLoading(false);
      return;
    }

    const fetchLocation = async () => {
      try {
        const locationRef = doc(db, 'locations', trackedUserId);
        const docSnap = await getDoc(locationRef);

        if (docSnap.exists()) {
          const data = docSnap.data();
          console.log("Données récupérées depuis Firebase:", data);

          if (data.latitude !== undefined && data.longitude !== undefined) {
            setLocation({ latitude: data.latitude, longitude: data.longitude });
          } else {
            console.log('Les champs "latitude" et "longitude" sont absents.');
            Alert.alert("Erreur", "Données de localisation invalides.");
          }
        } else {
          console.log('Pas de données pour cet utilisateur.');
          Alert.alert("Erreur", "Aucune localisation trouvée.");
        }
      } catch (error) {
        console.error('Erreur lors de la récupération de la localisation:', error);
        Alert.alert("Erreur", "Impossible de récupérer la localisation.");
      } finally {
        setLoading(false);
      }
    };

    fetchLocation();
  }, [trackedUserId]);

  if (loading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <View style={{ flex: 1 }}>
      {location ? (
        <MapView
          style={{ flex: 1 }}
          initialRegion={{
            latitude: location.latitude,
            longitude: location.longitude,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          <Marker coordinate={location} title="Position actuelle" />
        </MapView>
      ) : (
        <Text style={{ textAlign: "center", marginTop: 20 }}>Aucune localisation disponible.</Text>
      )}
    </View>
  );
};

export default MapScreen;
