// Import necessary libraries
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import your screens
import GetStarted from '../screens/GetStarted';
import Login from '../screens/Login';
import SignUp from '../screens/SignUp';
import Welcome from '../screens/Welcome';
import SuiveurHome from '../screens/SuiveurHome';
import SuiviHome from '../screens/SuiviHome';

// Create a stack navigator
const Stack = createStackNavigator();

// Define the AppNavigator component
const AppNavigator = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="GetStarted">
                {/* Get Started Screen */}
                <Stack.Screen
                    name="GetStarted"
                    component={GetStarted}
                    options={{ headerShown: false }} // Hide the header for this screen
                />

                {/* Login Screen */}
                <Stack.Screen
                    name="Login"
                    component={Login}
                    options={{ headerShown: false }} // Hide the header for this screen
                />

                {/* Sign Up Screen */}
                <Stack.Screen
                    name="SignUp"
                    component={SignUp}
                    options={{ headerShown: false }} // Hide the header for this screen
                />

                {/* Welcome Screen */}
                <Stack.Screen
                    name="Welcome"
                    component={Welcome}
                    options={{ headerShown: false }} // Hide the header for this screen
                />

                {/* Suiveur Home Screen */}
                <Stack.Screen
                    name="SuiveurHome"
                    component={SuiveurHome}
                    options={{ headerShown: false }} // Hide the header for this screen
                />

                {/* Suivi Home Screen */}
                <Stack.Screen
                    name="SuiviHome"
                    component={SuiviHome}
                    options={{ headerShown: false }} // Hide the header for this screen
                />
            </Stack.Navigator>
        </NavigationContainer>
    );
};

export default AppNavigator;