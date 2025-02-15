import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

const MapScreen = () => {
    return (
        <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Map</Text>
                <Text style={styles.description}>Track the locations of your loved ones on the map.</Text>
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
    description: {
        fontSize: 18,
        color: '#fff',
    },
});

export default MapScreen;
