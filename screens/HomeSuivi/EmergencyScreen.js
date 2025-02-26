import React from 'react';
import { View, Text, TouchableOpacity, ImageBackground, StyleSheet, Alert, Linking } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const EmergencyScreen = () => {
    const handleEmergencyCall = () => {
        Alert.alert(
            'Emergency Call',
            'Are you sure you want to make an emergency call?',
            [
                { text: 'Cancel', style: 'cancel' },
                { text: 'Call', onPress: () => Linking.openURL('tel:1234567890') }, // Remplace par ton numéro
            ]
        );
    };

    return (
        <ImageBackground source={require('../../images/background.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Emergency Call</Text>
                <Text style={styles.subtitle}>Press the button below to call for help.</Text>

                {/* Emergency Call Button */}
                <TouchableOpacity style={styles.emergencyButton} onPress={handleEmergencyCall}>
                    <Ionicons name="call" size={32} color="#fff" />
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    background: { flex: 1, justifyContent: 'center' },
    container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
    title: { fontSize: 24, color: '#fff', marginBottom: 20 },
    subtitle: { fontSize: 18, color: '#fff', marginBottom: 40 },
    emergencyButton: {
        backgroundColor: '#ff4444', // Rouge pour le bouton d'urgence
        padding: 20,
        borderRadius: 50,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default EmergencyScreen;
