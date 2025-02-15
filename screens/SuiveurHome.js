import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

const Tab = createBottomTabNavigator();

const SuiveurHome = () => {
    return (
        <Tab.Navigator>
            <Tab.Screen name="Notifications" component={NotificationsScreen} />
            <Tab.Screen name="Profile" component={ProfileScreen} />
            <Tab.Screen name="Tracked Users" component={TrackedUsersScreen} />
            <Tab.Screen name="Add User" component={AddUserScreen} />
            <Tab.Screen name="Map" component={MapScreen} />
        </Tab.Navigator>
    );
};

const NotificationsScreen = () => (
    <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
        <View style={styles.container}>
            <Text style={styles.title}>Notifications</Text>
        </View>
    </ImageBackground>
);

const ProfileScreen = () => (
    <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
        <View style={styles.container}>
            <Text style={styles.title}>Profile</Text>
        </View>
    </ImageBackground>
);

const TrackedUsersScreen = () => (
    <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
        <View style={styles.container}>
            <Text style={styles.title}>Tracked Users</Text>
        </View>
    </ImageBackground>
);

const AddUserScreen = () => (
    <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
        <View style={styles.container}>
            <Text style={styles.title}>Add User</Text>
        </View>
    </ImageBackground>
);

const MapScreen = () => (
    <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
        <View style={styles.container}>
            <Text style={styles.title}>Map</Text>
        </View>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
});

export default SuiveurHome;
