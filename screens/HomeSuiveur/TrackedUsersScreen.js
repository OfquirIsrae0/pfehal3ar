import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, FlatList, TouchableOpacity } from 'react-native'; // Ajoutez TouchableOpacity ici
import { getFirestore, collection, query, where, onSnapshot } from 'firebase/firestore';
import app from '../../firebase';
import { getAuth } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';

const db = getFirestore(app);
const auth = getAuth(app);

const TrackedUsersScreen = () => {
    const [trackedUsers, setTrackedUsers] = useState([]);
    const navigation = useNavigation();

    useEffect(() => {
        const userId = auth.currentUser?.uid;
        if (!userId) return;

        // Écouter les demandes de suivi acceptées
        const q = query(collection(db, 'followRequests'), where('trackerId', '==', userId), where('status', '==', 'accepted'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
            setTrackedUsers(usersList);
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
        <ImageBackground source={require('../../images/background.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Image source={require('../../images/logo.png')} style={styles.logo} />
                <Text style={styles.title}>Utilisateurs suivis</Text>
                <FlatList
                    data={trackedUsers}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.userItem}>
                            <Text style={styles.userName}>{item.trackedUserName}</Text>
                            <TouchableOpacity
                                style={styles.viewLocationButton}
                                onPress={() => handleViewLocation(item.trackedUserId)}
                            >
                                <Text style={styles.buttonText}>Voir la localisation</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1, justifyContent: 'center' },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, color: '#fff', marginBottom: 20 },
    logo: { width: 100, height: 100, marginBottom: 20 },
    userItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    userName: { fontSize: 18, color: '#333' },
    viewLocationButton: {
        backgroundColor: '#1e90ff',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
        alignItems: 'center',
    },
    buttonText: { color: '#fff', fontWeight: 'bold' },
});

export default TrackedUsersScreen;