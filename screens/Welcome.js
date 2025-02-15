import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Image } from 'react-native';

const Welcome = ({ navigation }) => {
    return (
        <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
            <View style={styles.container}>
                {/* Title */}
                <Text style={styles.title}>Welcome to Catracker</Text>

                {/* Logo */}
                <Image source={require('../assets/images/logo.png')} style={styles.logo} />

                {/* Subtitle */}
                <Text style={styles.subtitle}>Choose your role:</Text>

                {/* Buttons in a Row */}
                <View style={styles.buttonContainer}>
                    {/* Tracker Button */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('SuiveurHome')}
                    >
                        <Text style={styles.buttonText}>Tracker</Text>
                    </TouchableOpacity>

                    {/* Tracked Button */}
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => navigation.navigate('SuiviHome')}
                    >
                        <Text style={styles.buttonText}>Tracked</Text>
                    </TouchableOpacity>
                </View>
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
        padding: 20,
    },
    title: {
        fontSize: 24,
        color: '#fff',
        marginBottom: 20,
    },
    logo: {
        width: 300, // Adjust the width and height as needed
        height: 300,
        marginBottom: 20, // Space between logo and subtitle
    },
    subtitle: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 20,
    },
    buttonContainer: {
        flexDirection: 'row', // Arrange buttons horizontally
        justifyContent: 'space-between', // Add space between buttons
        width: '80%', // Match the width of the buttons
    },
    button: {
        backgroundColor: '#104e8b',
        padding: 15,
        borderRadius: 30,
        width: '48%', // Adjust width to fit two buttons in a row
        alignItems: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default Welcome;