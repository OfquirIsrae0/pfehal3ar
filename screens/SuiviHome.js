import React, { useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground, Animated, Alert, Linking } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // Import icons

const Tab = createBottomTabNavigator();

const SuiviHome = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#0A1F3A', // Dark blue background for the tab bar
                    borderTopWidth: 0, // Remove the top border
                },
                tabBarActiveTintColor: '#1e90ff', // Active tab color
                tabBarInactiveTintColor: '#fff', // Inactive tab color
                headerShown: false, // Hide the header
            }}
        >
            {/* Notification Tab */}
            <Tab.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="notifications" size={size} color={color} />
                    ),
                }}
            />

            {/* Emergency Call Tab */}
            <Tab.Screen
                name="Emergency"
                component={EmergencyScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="call" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

// Notification Screen
const NotificationsScreen = () => {
    return (
        <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Notifications</Text>
                <Text style={styles.subtitle}>You have no new notifications.</Text>
            </View>
        </ImageBackground>
    );
};

// Emergency Screen
const EmergencyScreen = () => {
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

    return (
        <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
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
    emergencyButton: {
        backgroundColor: '#ff4444', // Red color for emergency button
        padding: 20,
        borderRadius: 50, // Circular button
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default SuiviHome;