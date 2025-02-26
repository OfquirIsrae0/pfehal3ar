import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import app from '../../firebase';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const db = getFirestore(app);
const auth = getAuth(app);

const NotificationsScreen = () => {
    const [notifications, setNotifications] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        // Écouter les demandes de suivi liées à l'utilisateur tracker
        const q = query(collection(db, 'followRequests'), where('trackerId', '==', userId));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const notificationsList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setNotifications(notificationsList);
        });

        return () => unsubscribe();
    }, []);

    const handleViewLocation = (trackedUserId) => {
        if (!trackedUserId) {
            Alert.alert("Erreur", "trackedUserId est manquant");
            return;
        }
        navigation.navigate('Map', { trackedUserId });
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Notifications</Text>
            <FlatList
                data={notifications}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.notificationItem}>
                        <Text style={styles.notificationText}>
                            {item.trackedUserName} a {item.status === 'accepted' ? 'accepté' : 'refusé'} votre demande de suivi.
                        </Text>
                        {item.status === 'accepted' && (
                            <TouchableOpacity
                                style={styles.viewLocationButton}
                                onPress={() => handleViewLocation(item.trackedUserId)}
                            >
                                <Text style={styles.buttonText}>Voir la localisation</Text>
                            </TouchableOpacity>
                        )}
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    notificationItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    notificationText: { fontSize: 16, color: '#333' },
    viewLocationButton: {
        backgroundColor: '#1e90ff',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default NotificationsScreen;