import React, { useEffect } from 'react';
import Geolocation from 'react-native-geolocation-service';
import { getFirestore, doc, updateDoc } from 'firebase/firestore';
import app from '../firebase';
import { getAuth } from 'firebase/auth';

const db = getFirestore(app);
const auth = getAuth(app);

const TrackedUserLocationUpdater = () => {
    useEffect(() => {
        const userId = auth.currentUser?.uid;
        if (!userId) {
            console.error("Utilisateur non connecté");
            return;
        }

        // Demander la permission de localisation
        const requestLocationPermission = async () => {
            try {
                const granted = await Geolocation.requestAuthorization('whenInUse');
                if (granted === 'granted') {
                    startLocationTracking(userId);
                } else {
                    console.error("Permission de localisation refusée");
                }
            } catch (error) {
                console.error("Erreur lors de la demande de permission :", error);
            }
        };

        // Démarrer le suivi de la localisation
        const startLocationTracking = (userId) => {
            const watchId = Geolocation.watchPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;

                    // Mettre à jour la localisation dans Firestore
                    const userRef = doc(db, 'users', userId);
                    updateDoc(userRef, {
                        location: { latitude, longitude }
                    }).then(() => {
                        console.log("Localisation mise à jour dans Firestore");
                    }).catch((error) => {
                        console.error("Erreur lors de la mise à jour de la localisation :", error);
                    });
                },
                (error) => {
                    console.error("Erreur de géolocalisation :", error);
                },
                {
                    enableHighAccuracy: true, // Utiliser une haute précision
                    distanceFilter: 1, // Mettre à jour la localisation chaque 1 mètre
                    interval: 1000, // Mettre à jour la localisation toutes les secondes
                    fastestInterval: 1000, // Intervalle minimum
                }
            );

            // Nettoyer la surveillance de la localisation lors du démontage du composant
            return () => {
                Geolocation.clearWatch(watchId);
            };
        };

        requestLocationPermission();
    }, []);

    return null; // Ce composant n'a pas d'interface utilisateur
};

export default TrackedUserLocationUpdater;