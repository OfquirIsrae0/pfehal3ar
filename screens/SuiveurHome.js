import React, { useRef, useState, useEffect } from 'react'; // Assurez-vous que useRef est bien importé

import { View, Text, Image, ImageBackground, StyleSheet, Animated, TouchableOpacity, Alert, ActivityIndicator } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; 
import { getAuth } from 'firebase/auth';
import { getFirestore, doc, getDoc } from 'firebase/firestore';

import app from '../firebase'; // Assurez-vous d'avoir ce fichier pour initialiser Firebase

const Tab = createBottomTabNavigator();
const auth = getAuth(app);
const db = getFirestore(app);

// SuiveurHome avec la navigation
const SuiveurHome = () => {
    return (
        <Tab.Navigator
            initialRouteName="Map"
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#0A1F3A',
                    borderTopWidth: 0,
                },
                tabBarActiveTintColor: '#1e90ff',
                tabBarInactiveTintColor: '#fff',
                headerStyle: {
                    backgroundColor: '#0A1F3A',
                },
                headerTintColor: '#fff',
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Tab.Screen
                name="Profile"
                component={ProfileScreen} // Affiche le Profil
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="notifications" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="map" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Tracked Users"
                component={TrackedUsersScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="people" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="Add User"
                component={AddUserScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="person-add" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
};

// ProfileScreen affichant "Bonjour"
const ProfileScreen = () => {
    return (
        <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
            <AnimatedView>
                <View style={styles.container}>
                    <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                    <Text style={styles.title}>Profile</Text>
                    {/* Affiche le texte "Bonjour" lorsqu'on clique sur le profil */}
                    <Text style={styles.text}>Bonjour</Text>
                </View>
            </AnimatedView>
        </ImageBackground>
    );
};

// Animation pour le bouton
const AnimatedView = ({ children }) => {
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

    return (
        <TouchableOpacity activeOpacity={1} onPressIn={onPressIn} onPressOut={onPressOut}>
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                {children}
            </Animated.View>
        </TouchableOpacity>
    );
};

const NotificationsScreen = () => (
    <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
        <AnimatedView>
            <View style={styles.container}>
                <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                <Text style={styles.title}>Notifications</Text>
            </View>
        </AnimatedView>
    </ImageBackground>
);

const TrackedUsersScreen = () => (
    <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
        <AnimatedView>
            <View style={styles.container}>
                <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                <Text style={styles.title}>Tracked Users</Text>
            </View>
        </AnimatedView>
    </ImageBackground>
);

const AddUserScreen = () => (
    <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
        <AnimatedView>
            <View style={styles.container}>
                <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                <Text style={styles.title}>Add User</Text>
            </View>
        </AnimatedView>
    </ImageBackground>
);

const MapScreen = () => (
    <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
        <AnimatedView>
            <View style={styles.container}>
                <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                <Text style={styles.title}>Map</Text>
            </View>
        </AnimatedView>
    </ImageBackground>
);

const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 20,
    },
    profileInfo: {
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 5,
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
});

export default SuiveurHome;
