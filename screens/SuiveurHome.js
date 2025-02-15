import React, { useRef } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, Animated, TouchableOpacity, Alert } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons'; // For icons in the tabs

const Tab = createBottomTabNavigator();

const SuiveurHome = () => {
    return (
        <Tab.Navigator
            initialRouteName="Map" // Set the "Map" tab as the default screen
            screenOptions={{
                tabBarStyle: {
                    backgroundColor: '#0A1F3A', // Very dark blue for the footer
                    borderTopWidth: 0, // Remove the top border
                },
                tabBarActiveTintColor: '#1e90ff', // Active tab color
                tabBarInactiveTintColor: '#fff', // Inactive tab color
                headerStyle: {
                    backgroundColor: '#0A1F3A', // Very dark blue for the header
                },
                headerTintColor: '#fff', // Header text color
                headerTitleStyle: {
                    fontWeight: 'bold',
                },
            }}
        >
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
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

// Modified Animated Button for Gravitational Effect
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
        <TouchableOpacity
            activeOpacity={1}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
        >
            <Animated.View style={{ transform: [{ scale: scaleValue }] }}>
                {children}
            </Animated.View>
        </TouchableOpacity>
    );
};

// Alert for Mandatory Fields
const showAlert = () => {
    Alert.alert(
        "Incomplete Input",
        "Please fill in all the required fields!",
        [{ text: "OK", onPress: () => console.log("OK Pressed") }]
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

const ProfileScreen = () => (
    <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
        <AnimatedView>
            <View style={styles.container}>
                <Image source={require('../assets/images/logo.png')} style={styles.logo} />
                <Text style={styles.title}>Profile</Text>
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
        marginBottom: 20, // Adjust spacing as necessary
    },
});

export default SuiveurHome;