import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert, Animated, ActivityIndicator } from 'react-native';
import { auth, firestore, createUserWithEmailAndPassword, doc, setDoc } from '../firebase'; // Importer les bons modules

const SignUp = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [loading, setLoading] = useState(false);
    const scaleValue = useRef(new Animated.Value(1)).current;

    const validateAndCorrectEmail = (email) => {
        const corrections = {
            "gmal.com": "gmail.com",
            "gnail.com": "gmail.com",
            "yaho.com": "yahoo.com",
        };

        let correctedEmail = email.trim().toLowerCase();

        Object.keys(corrections).forEach((incorrectDomain) => {
            if (correctedEmail.includes(incorrectDomain)) {
                correctedEmail = correctedEmail.replace(incorrectDomain, corrections[incorrectDomain]);
            }
        });

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(correctedEmail) ? correctedEmail : null;
    };

    const handleSignUp = async () => {
        if (!name || !email || !password || !phone || !address) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        const correctedEmail = validateAndCorrectEmail(email);
        if (!correctedEmail) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }
        setEmail(correctedEmail); // Mise à jour de l'email avec la correction

        if (phone.length < 10) {
            Alert.alert('Error', 'Please enter a valid phone number');
            return;
        }

        if (password.length < 6) {
            Alert.alert('Error', 'Password must be at least 6 characters long');
            return;
        }

        try {
            setLoading(true); // Activation du loader

            // Création de l'utilisateur dans Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, correctedEmail, password);
            const user = userCredential.user;

            // Ajouter l'utilisateur dans Firestore
            const userRef = doc(firestore, "users", user.uid); // Utiliser le bon `firestore` au lieu de `db`
            await setDoc(userRef, {
                name: name,
                email: correctedEmail,
                phone: phone,
                address: address,
                createdAt: new Date(),
            });

            Alert.alert('Success', 'Account created successfully!');
            navigation.navigate('Login'); // Rediriger vers la page de connexion
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Error', 'Email is already in use. Please try another one.');
            } else {
                Alert.alert('Error', error.message);
            }
        } finally {
            setLoading(false); // Désactivation du loader
        }
    };

    return (
        <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Sign Up</Text>

                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#777"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#777"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Password"
                    placeholderTextColor="#777"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor="#777"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    placeholderTextColor="#777"
                    value={address}
                    onChangeText={setAddress}
                />

                <TouchableOpacity
                    onPress={handleSignUp}
                    disabled={loading}
                    activeOpacity={0.8}
                >
                    <Animated.View style={[styles.button, { transform: [{ scale: scaleValue }] }]} >
                        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Sign Up</Text>}
                    </Animated.View>
                </TouchableOpacity>

                <View style={styles.footer}>
                    <Text style={styles.footerText}>Already have an account? </Text>
                    <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                        <Text style={styles.footerLink}>Login</Text>
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

export default SignUp;
