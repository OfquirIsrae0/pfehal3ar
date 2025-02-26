import React, { useEffect, useState } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, Alert } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { FirebaseApp } from '../../firebase'; // Assurez-vous de configurer Firebase dans ce fichier

const ProfileScreen = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const auth = getAuth(FirebaseApp); // Firebase Auth
    const db = getFirestore(FirebaseApp); // Firestore

    useEffect(() => {
        // Affiche un message de bienvenue au démarrage
        Alert.alert("Bienvenue", "Vous êtes dans le profil !");

        // Récupère les données de l'utilisateur connecté
        const fetchUserData = async () => {
            const user = auth.currentUser;
            if (user) {
                const userRef = doc(db, 'users', user.uid); // Accède au document utilisateur dans Firestore
                const userDoc = await getDoc(userRef);
                if (userDoc.exists()) {
                    setUserData(userDoc.data());
                } else {
                    Alert.alert("Erreur", "Aucun utilisateur trouvé.");
                }
            }
            setLoading(false);
        };

        fetchUserData();
    }, []);

    if (loading) {
        return <Text>Chargement...</Text>;
    }

    return (
        <ImageBackground source={require('../../assets/images/background.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
                <Text style={styles.title}>Profil de {userData?.name || "utilisateur"}</Text>
                <Text style={styles.text}>Nom: {userData?.name}</Text>
                <Text style={styles.text}>Email: {userData?.email}</Text>
                <Text style={styles.text}>Téléphone: {userData?.phone}</Text>
                <Text style={styles.text}>Adresse: {userData?.address}</Text>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 10,
    },
    text: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 5,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
});

export default ProfileScreen;
