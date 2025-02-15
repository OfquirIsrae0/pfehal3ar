import React from 'react';
import { View, Text, ImageBackground, StyleSheet } from 'react-native';

const SuiviHome = () => {
    return (
        <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Suivi Home</Text>
                <Text style={styles.subtitle}>You are being tracked.</Text>
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
    },
});

export default SuiviHome;
