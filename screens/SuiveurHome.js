import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import ProfileScreen from '../screens/HomeSuiveur/ProfileScreen';
import NotificationsScreen from '../screens/HomeSuiveur/NotificationsScreen';
import MapScreen from '../screens/HomeSuiveur/MapScreen';
import TrackedUsersScreen from '../screens/HomeSuiveur/TrackedUsersScreen';
import AddUserScreen from '../screens/HomeSuiveur/AddUserScreen';

const Tab = createBottomTabNavigator();

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

export default SuiveurHome;
