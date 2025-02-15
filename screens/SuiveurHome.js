import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
  <View style={styles.container}>
    <Text>Notifications</Text>
  </View>
);

const ProfileScreen = () => (
  <View style={styles.container}>
    <Text>Profile</Text>
  </View>
);

const TrackedUsersScreen = () => (
  <View style={styles.container}>
    <Text>Tracked Users</Text>
  </View>
);

const AddUserScreen = () => (
  <View style={styles.container}>
    <Text>Add User</Text>
  </View>
);

const MapScreen = () => (
  <View style={styles.container}>
    <Text>Map</Text>
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#000',
  },
});

export default SuiveurHome;