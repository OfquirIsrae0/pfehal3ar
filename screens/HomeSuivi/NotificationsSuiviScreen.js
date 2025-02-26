import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { getFirestore, collection, query, where, onSnapshot, doc, updateDoc, setDoc } from 'firebase/firestore';
import app from '../../firebase';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import * as Location from 'expo-location';

const db = getFirestore(app);
const auth = getAuth(app);

const NotificationsSuiviScreen = () => {
    const [requests, setRequests] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        // Écouter les demandes de suivi en temps réel
        const q = query(collection(db, 'followRequests'), where('trackedUserId', '==', userId), where('status', '==', 'pending'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const requestsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setRequests(requestsList);
        });

        return () => unsubscribe();
    }, []);

    const handleResponse = async (requestId, accepted, trackerId) => {
        try {
            const requestRef = doc(db, 'followRequests', requestId);
            await updateDoc(requestRef, { status: accepted ? 'accepted' : 'rejected' });

            if (accepted) {
                Alert.alert("Succès", "Demande acceptée. La localisation est maintenant partagée.");

                // 🔹 Demander la permission de localisation
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    Alert.alert("Erreur", "Permission refusée pour la localisation.");
                    return;
                }

                // 🔹 Récupérer la position actuelle
                const location = await Location.getCurrentPositionAsync({});
                const { latitude, longitude } = location.coords;

                // 🔹 Enregistrer la localisation dans Firestore sous "locations/{trackedUserId}"
                const trackedUserId = auth.currentUser?.uid;
                const locationRef = doc(db, 'locations', trackedUserId);
                await setDoc(locationRef, {
                    latitude,
                    longitude,
                    trackedUserId,
                    trackerId,  // Pour que le suiveur sache à qui appartient cette localisation
                    timestamp: new Date(),
                });

                console.log("Localisation mise à jour :", latitude, longitude);
            } else {
                Alert.alert("Succès", "Demande refusée.");
            }

            setRequests(prevRequests => prevRequests.filter(req => req.id !== requestId));
        } catch (error) {
            console.error("Erreur lors de la mise à jour de la demande :", error);
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notifications de suivi</Text>
            <FlatList
                data={requests}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.requestItem}>
                        <Text style={styles.requestText}>{item.trackerName} souhaite vous suivre.</Text>
                        <View style={styles.buttonContainer}>
                            <TouchableOpacity
                                style={[styles.button, styles.acceptButton]}
                                onPress={() => handleResponse(item.id, true, item.trackerId)}
                            >
                                <Text style={styles.buttonText}>Accepter</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.rejectButton]}
                                onPress={() => handleResponse(item.id, false)}
                            >
                                <Text style={styles.buttonText}>Refuser</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    requestItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    requestText: { fontSize: 18, color: '#333' },
    buttonContainer: { flexDirection: 'row', marginTop: 10 },
    button: {
        flex: 1,
        padding: 10,
        marginHorizontal: 5,
        borderRadius: 5,
        alignItems: 'center',
    },
    acceptButton: { backgroundColor: '#28a745' },
    rejectButton: { backgroundColor: '#dc3545' },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default NotificationsSuiviScreen;