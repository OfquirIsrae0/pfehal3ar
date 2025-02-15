import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground } from 'react-native';

const Welcome = ({ navigation }) => {
    return (
        <ImageBackground source={require('../assets/images/background.jpg')} style={styles.background}>
            <View style={styles.container}>
                <Text style={styles.title}>Welcome to Catracker</Text>
                <Text style={styles.subtitle}>Choose your role:</Text>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SuiveurHome')}>
                    <Text style={styles.buttonText}>Suiveur</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SuiviHome')}>
                    <Text style={styles.buttonText}>Suivi</Text>
                </TouchableOpacity>
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
    subtitle: {
        fontSize: 18,
        color: '#fff',
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#104e8b',  
        padding: 15,
        borderRadius: 30,  
        width: '80%',
        alignItems: 'center',
        marginBottom: 10,
    },
    buttonText: {
        color: '#fff',
        fontSize: 18,
    },
});

export default Welcome;
