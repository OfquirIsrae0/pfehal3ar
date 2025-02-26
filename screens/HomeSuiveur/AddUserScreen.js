import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, TextInput, StyleSheet } from 'react-native';
import { getFirestore, collection, getDocs, addDoc, query, where } from 'firebase/firestore';
import app from '../../firebase';
import { getAuth } from 'firebase/auth';

const db = getFirestore(app);
const auth = getAuth(app);

const AddUserScreen = () => {
    const [trackedUsers, setTrackedUsers] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');

    useEffect(() => {
        const fetchTrackedUsers = async () => {
            try {
                const q = query(collection(db, 'users'), where('role', '==', 'Tracked'));
                const querySnapshot = await getDocs(q);
                const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
                setTrackedUsers(usersList);
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs :", error);
            }
        };
        fetchTrackedUsers();
    }, []);

    const handleFollowUser = async (trackedUserId, trackedUserName) => {
        try {
            const trackerId = auth.currentUser?.uid;
            const trackerName = auth.currentUser?.displayName;
            if (!trackerId) {
                Alert.alert("Erreur", "Utilisateur non identifié");
                return;
            }

            await addDoc(collection(db, 'followRequests'), {
                trackerId,
                trackerName,
                trackedUserId,
                trackedUserName,
                status: 'pending',
                createdAt: new Date()
            });

            Alert.alert("Demande envoyée", "Votre demande de suivi a été envoyée.");
        } catch (error) {
            console.error("Erreur lors de l'envoi de la demande :", error);
            Alert.alert("Erreur", "Une erreur s'est produite lors de l'envoi de la demande.");
        }
    };

    const filteredUsers = trackedUsers.filter(user =>
        user.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Ajouter un utilisateur</Text>
            <TextInput
                style={styles.searchInput}
                placeholder="Rechercher un utilisateur..."
                value={searchQuery}
                onChangeText={setSearchQuery}
            />
            <FlatList
                data={filteredUsers}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => (
                    <View style={styles.userItem}>
                        <Text style={styles.userName}>{item.name}</Text>
                        <TouchableOpacity
                            style={styles.followButton}
                            onPress={() => handleFollowUser(item.id, item.name)}
                        >
                            <Text style={styles.followButtonText}>Ajouter</Text>
                        </TouchableOpacity>
                    </View>
                )}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, padding: 20 },
    title: { fontSize: 24, fontWeight: 'bold', marginBottom: 20 },
    searchInput: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        borderRadius: 5,
        paddingHorizontal: 10,
        marginBottom: 20,
        backgroundColor: '#fff',
    },
    userItem: {
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        padding: 10,
        marginVertical: 5,
        borderRadius: 5,
    },
    userName: { fontSize: 18, color: '#333' },
    followButton: {
        backgroundColor: '#1e90ff',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
    },
    followButtonText: { color: '#fff' },
});

export default AddUserScreen;