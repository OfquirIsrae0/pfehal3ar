import React, { useRef } from 'react';
import { View, Text, ImageBackground, StyleSheet, TouchableOpacity, Animated, Linking, Alert } from 'react-native';

const SuiviHome = () => {
    const scaleValue = useRef(new Animated.Value(1)).current;

    const onPressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.9,
            friction: 5,
            useNativeDriver: true,
        }).start();
    };

    const onPressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 5,
            useNativeDriver: true,
        }).start();
    };

    const handleEmergencyCall = () => {
        Alert.alert(
            'Emergency Call',
            'Are you sure you want to make an emergency call?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Call', onPress: () => Linking.openURL('tel:1234567890') }, // Replace with emergency number
            ]
        );
    };

    const handleNotification = () => {
        Alert.alert('Notification', 'You have a new notification!');
    };

    return (
        <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Suivi Home</Text>
                <Text style={styles.subtitle}>You are being tracked.</Text>

                {/* Notification Button */}
                <TouchableOpacity
                    onPress={handleNotification}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    activeOpacity={0.8}
                >
                    <Animated.View style={[styles.button, { transform: [{ scale: scaleValue }] }]}>
                        <Text style={styles.buttonText}>Notification</Text>
                    </Animated.View>
                </TouchableOpacity>

                {/* Emergency Call Button */}
                <TouchableOpacity
                    onPress={handleEmergencyCall}
                    onPressIn={onPressIn}
                    onPressOut={onPressOut}
                    activeOpacity={0.8}
                >
                    <Animated.View style={[styles.button, { transform: [{ scale: scaleValue }] }]}>
                        <Text style={styles.buttonText}>Emergency Call</Text>
                    </Animated.View>
                </TouchableOpacity>
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
    subtitle: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 40,
    },
    button: {
        backgroundColor: '#0A4F8A', // Darker blue
        padding: 15,
        borderRadius: 30, // Rounded corners
        width: 200,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default SuiviHome;