import React, { useState } from 'react';
import { View, Text, Image, ImageBackground, StyleSheet, TouchableOpacity, FlatList, TextInput, Alert, ScrollView } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import MapView, { Marker } from 'react-native-maps';

const Tab = createBottomTabNavigator();

// Mock data for notifications and tracked users
const notificationsData = [
    { id: '1', title: 'Location Alert', description: 'User A left the designated area.', time: '2 hours ago' },
    { id: '2', title: 'Battery Low', description: 'Tracker B is running low on battery.', time: '1 hour ago' },
];

const trackedUsersData = [
    { id: '1', name: 'OFQUIR Israe', status: 'Active' },
    { id: '2', name: 'REFAI Saad', status: 'Inactive' },
];

// Profile Screen with Edit Profile functionality
const ProfileScreen = () => {
    return (
        <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Image source={require('../assets/images/profile.png')} style={styles.profilePic} />
                <Text style={styles.title}>OFQUIR Israe</Text>
                <Text style={styles.text}>Email: ofquirisrae@gmail.com</Text>
                <TouchableOpacity style={styles.editButton}>
                    <Text style={styles.buttonText}>Edit Profile</Text>
                </TouchableOpacity>
            </View>
        </ImageBackground>
    );
};

// Notifications Screen with a list of notifications
const NotificationsScreen = () => {
    return (
        <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Notifications</Text>
                <FlatList
                    data={notificationsData}
                    renderItem={({ item }) => (
                        <View style={styles.notificationCard}>
                            <Text style={styles.notificationTitle}>{item.title}</Text>
                            <Text style={styles.notificationDescription}>{item.description}</Text>
                            <Text style={styles.notificationTime}>{item.time}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </ImageBackground>
    );
};

// Map Screen with a larger map view
const MapScreen = () => {
    return (
        <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
            <View style={styles.mapContainer}>
                <MapView
                    style={styles.map}
                    initialRegion={{
                        latitude: 34.020882,  // Latitude of Fes
                        longitude: -5.007372, // Longitude of Fes
                        latitudeDelta: 0.0922,
                        longitudeDelta: 0.0421,
                    }}

                >
                    <Marker coordinate={{ latitude: 34.020882, longitude: -5.007372 }} title="OFQUIR Israe" description="User A" />
                </MapView>
            </View>
        </ImageBackground>
    );
};

// Tracked Users Screen with a list of users being tracked
const TrackedUsersScreen = () => {
    return (
        <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Tracked Users</Text>
                <FlatList
                    data={trackedUsersData}
                    renderItem={({ item }) => (
                        <View style={styles.userCard}>
                            <Text style={styles.userName}>{item.name}</Text>
                            <Text style={styles.userStatus}>Status: {item.status}</Text>
                        </View>
                    )}
                    keyExtractor={item => item.id}
                />
            </View>
        </ImageBackground>
    );
};

// Add User Screen with a form to add a new user
const AddUserScreen = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    const handleAddUser = () => {
        if (name && email) {
            Alert.alert('User Added', `Name: ${name}, Email: ${email}`);
            setName('');
            setEmail('');
        } else {
            Alert.alert('Error', 'Please fill in all fields');
        }
    };

    return (
        <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
            <ScrollView contentContainerStyle={styles.container}>
                <Text style={styles.title}>Add New User</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Name"
                    value={name}
                    onChangeText={setName}
                />
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
                <TouchableOpacity style={styles.addButton} onPress={handleAddUser}>
                    <Text style={styles.buttonText}>Add User</Text>
                </TouchableOpacity>
            </ScrollView>
        </ImageBackground>
    );
};

// SuiveurHome with bottom tab navigation
const SuiveurHome = () => {
    return (
        <Tab.Navigator
            initialRouteName="Map"
            screenOptions={{
                tabBarStyle: { backgroundColor: '#0A1F3A', borderTopWidth: 0 },
                tabBarActiveTintColor: '#1e90ff',
                tabBarInactiveTintColor: '#fff',
                headerStyle: { backgroundColor: '#0A1F3A' },
                headerTintColor: '#fff',
                headerTitleStyle: { fontWeight: 'bold' },
            }}
        >
            <Tab.Screen
                name="Profile"
                component={ProfileScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Notifications"
                component={NotificationsScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="notifications" size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Map"
                component={MapScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="map" size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Tracked Users"
                component={TrackedUsersScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="people" size={size} color={color} />,
                }}
            />
            <Tab.Screen
                name="Add User"
                component={AddUserScreen}
                options={{
                    tabBarIcon: ({ color, size }) => <Ionicons name="person-add" size={size} color={color} />,
                }}
            />
        </Tab.Navigator>
    );
};

// Styles
const styles = StyleSheet.create({
    background: {
        flex: 1,
        justifyContent: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
    text: {
        fontSize: 18,
        color: '#fff',
    },
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
        marginBottom: 20,
    },
    editButton: {
        backgroundColor: '#1e90ff',
        padding: 10,
        borderRadius: 30,
        marginTop: 20,
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
    },
    notificationCard: {
        backgroundColor: '#1e1e1e',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        width: '90%',
    },
    notificationTitle: {
        fontSize: 18,
        color: '#1e90ff',
    },
    notificationDescription: {
        color: '#fff',
        fontSize: 14,
    },
    notificationTime: {
        color: '#999',
        fontSize: 12,
    },
    mapContainer: {
        flex: 1,
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        width: '90%',
        height: '80%',
        borderRadius: 10,
    },
    userCard: {
        backgroundColor: '#1e1e1e',
        padding: 15,
        marginVertical: 10,
        borderRadius: 10,
        width: '90%',
    },
    userName: {
        fontSize: 18,
        color: '#1e90ff',
    },
    userStatus: {
        color: '#fff',
        fontSize: 14,
    },
    input: {
        width: '80%',
        padding: 15,
        marginBottom: 15,
        backgroundColor: '#fff',
        borderRadius: 10,
    },
    addButton: {
        backgroundColor: '#1e90ff',
        padding: 15,
        borderRadius: 30,
    },
});

export default SuiveurHome;