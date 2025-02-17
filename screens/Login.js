import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert, Animated, ActivityIndicator } from 'react-native';
import { auth, firestore } from '../firebase'; // Importer la configuration Firebase
import { signInWithEmailAndPassword } from 'firebase/auth'; // Importer la méthode de connexion Firebase
import { doc, getDoc } from 'firebase/firestore'; // Importer les fonctions Firestore

const Login = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const scaleValue = useRef(new Animated.Value(1)).current;

    // Fonction de validation de l'email
    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    // Fonction pour gérer la connexion avec Firebase
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Error', 'Please fill in all fields');
            return;
        }

        if (!validateEmail(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        try {
            setLoading(true); // Activer le loader

            // Connexion avec Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Vérification du rôle de l'utilisateur dans Firestore
            const userRef = doc(firestore, 'users', user.uid);
            const userDoc = await getDoc(userRef);

            if (userDoc.exists() && userDoc.data().role) {
                const role = userDoc.data().role;
                // Rediriger l'utilisateur vers sa page d'accueil basée sur le rôle
                if (role === 'Tracker') {
                    navigation.navigate('SuiveurHome');
                } else if (role === 'Tracked') {
                    navigation.navigate('SuiviHome');
                }
            } else {
                // Si l'utilisateur n'a pas de rôle, le rediriger vers la page Welcome
                navigation.navigate('Welcome');
            }
            Alert.alert('Success', 'Login successful!');
        } catch (error) {
            Alert.alert('Error', error.message); // Afficher l'erreur
        } finally {
            setLoading(false); // Désactiver le loader
        }
    };

    return (
        <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Login</Text>

                {/* Email Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#777"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />

                {/* Password Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#777"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                {/* Login Button */}
                <TouchableOpacity onPress={handleLogin} disabled={loading} activeOpacity={0.8}>
                    <Animated.View style={[styles.button, { transform: [{ scale: scaleValue }] }]} >
                        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Login</Text>}
                    </Animated.View>
                </TouchableOpacity>

                {/* Sign Up Link */}
                <View style={styles.footer}>
                    <Text style={styles.footerText}>Don't have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('SignUp')}>
                        <Text style={styles.footerLink}>Sign Up</Text>
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
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
    input: {
        width: '80%',
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 30,
        color: '#000',
    },
    button: {
        backgroundColor: '#0A4F8A',
        padding: 15,
        borderRadius: 30,
        width: '80%',
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
    footer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    footerText: {
        color: '#fff',
        fontSize: 16,
    },
    footerLink: {
        color: '#1e90ff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Login;
