import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SuiviHome = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Suivi Home</Text>
      <Text style={styles.subtitle}>You are being tracked.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
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