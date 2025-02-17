import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image, Alert } from 'react-native';
import { auth, firestore } from '../firebase'; // Importation de Firebase et Firestore
import { doc, setDoc } from 'firebase/firestore'; // Importation des fonctions Firestore

const Welcome = ({ navigation }) => {
    // Vérifier si l'utilisateur est connecté dès le chargement du composant
    useEffect(() => {
        const user = auth.currentUser;
        if (!user) {
            console.log("Aucun utilisateur connecté, redirection vers Login");
            navigation.navigate('Login'); // Redirection si l'utilisateur n'est pas authentifié
        } else {
            console.log("Utilisateur connecté :", user.uid);
        }
    }, [navigation]);

    // Fonction pour mettre à jour le rôle de l'utilisateur dans Firestore
    const updateUserRole = async (role) => {
        console.log("Bouton cliqué pour le rôle :", role);
        const user = auth.currentUser;
        if (user) {
            try {
                console.log("Mise à jour du rôle pour l'utilisateur :", user.uid);
                // Créer la référence du document de l'utilisateur dans la collection "users"
                const userRef = doc(firestore, 'users', user.uid);

                // Mettre à jour ou créer le document en ajoutant le rôle
                await setDoc(userRef, { role: role }, { merge: true });
                console.log("Rôle mis à jour avec succès dans Firestore");

                // Afficher une alerte de succès et rediriger vers la page appropriée après confirmation
                Alert.alert(
                    "Success",
                    `You are now a ${role}!`,
                    [{
                        text: "OK",
                        onPress: () => {
                            console.log("Redirection vers :", role === 'Tracker' ? "SuiveurHome" : "SuiviHome");
                            if (role === 'Tracker') {
                                navigation.navigate('SuiveurHome');
                            } else if (role === 'Tracked') {
                                navigation.navigate('SuiviHome');
                            }
                        }
                    }]
                );
            } catch (error) {
                console.error("Erreur lors de la mise à jour du rôle :", error);
                Alert.alert("Error", "Something went wrong. Please try again.");
            }
        } else {
            console.log("Aucun utilisateur connecté dans updateUserRole");
            Alert.alert("Error", "User not logged in. Please log in again.");
        }
    };

    return (
        <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to Catracker</Text>
                <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                <Text style={styles.subtitle}>Choose your role:</Text>
                <View style={styles.buttonContainer}>
                    {/* Bouton Tracker */}
                    <TouchableOpacity style={styles.button} onPress={() => updateUserRole('Tracker')}>
                        <Text style={styles.buttonText}>Tracker</Text>
                    </TouchableOpacity>
                    {/* Bouton Tracked */}
                    <TouchableOpacity style={styles.button} onPress={() => updateUserRole('Tracked')}>
                        <Text style={styles.buttonText}>Tracked</Text>
                    </TouchableOpacity>
                </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
    logo: {
        width: 300,
        height: 300,
        marginBottom: 20,
    },
    subtitle: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '80%',
    },
    button: {
        backgroundColor: '#104e8b',
        padding: 15,
        borderRadius: 30,
        width: '48%',
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default Welcome;
