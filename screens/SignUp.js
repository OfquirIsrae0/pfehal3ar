import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, ImageBackground, StyleSheet, Alert, Animated } from 'react-native';

const SignUp = ({ navigation }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const scaleValue = useRef(new Animated.Value(1)).current;

    // Function to handle sign-up validation
    const handleSignUp = () => {
        if (!name || !email || !password || !phone || !address) {
            Alert.alert('Error', 'Please fill all fields');
            return;
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            Alert.alert('Error', 'Please enter a valid email address');
            return;
        }

        // Validate phone number length
        if (phone.length < 10) {
            Alert.alert('Error', 'Please enter a valid phone number');
            return;
        }

        // Proceed to the Welcome page if all fields are valid
        navigation.navigate('Welcome');
    };

    // Gravitational animation for button press
    const onPressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.95,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 3,
            useNativeDriver: true,
        }).start();
    };

    return (
        <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Sign Up</Text>

                {/* Full Name Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Full Name"
                    placeholderTextColor="#777"
                    value={name}
                    onChangeText={setName}
                />

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

                {/* Phone Number Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Phone Number"
                    placeholderTextColor="#777"
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />

                {/* Address Input */}
                <TextInput
                    style={styles.input}
                    placeholder="Address"
                    placeholderTextColor="#777"
                    value={address}
                    onChangeText={setAddress}
                />

                {/* Sign Up Button with Gravitational Animation */}
                <TouchableOpacity
                    onPress={handleSignUp}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    activeOpacity={0.8}
                >
                    <Animated.View style={[styles.button, { transform: [{ scale: scaleValue }] }]}>
                        <Text style={styles.buttonText}>Sign Up</Text>
                    </Animated.View>
                </TouchableOpacity>

                {/* Already have an account? */}
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
        color: '#000', // Ensure text is visible on white background
    },
    button: {
        backgroundColor: '#0A4F8A', // Darker blue
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