import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import NotificationsSuiviScreen from '../screens/HomeSuivi/NotificationsSuiviScreen';
import EmergencyScreen from '../screens/HomeSuivi/EmergencyScreen';

const Tab = createBottomTabNavigator();

const SuiviHome = () => {
    return (
        <Tab.Navigator
            screenOptions={{
                tabBarStyle: { backgroundColor: '#0A1F3A', borderTopWidth: 0 },
                tabBarActiveTintColor: '#1e90ff',
                tabBarInactiveTintColor: '#fff',
                headerShown: false,
            }}
        >
            <Tab.Screen
                name="Suivi Notifications"
                component={NotificationsSuiviScreen}
                options={{
                    tabBarIcon: ({ color, size }) => (
                        <Ionicons name="notifications-outline" size={size} color={color} />
                    ),
                }}
            />
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

export default SuiviHome;
