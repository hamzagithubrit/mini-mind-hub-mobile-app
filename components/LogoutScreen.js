
import { StyleSheet, Text, View, Alert, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const LogoutScreen = ({ navigation }) => {
  const [isLoggingOut, setIsLoggingOut] = useState(false); // State to control logout dialog
  const [isLoggedOut, setIsLoggedOut] = useState(false); // State to track if the user has logged out
  const [loading, setLoading] = useState(false); // State for loading indicator

  const clearUserData = async () => {
    try {
      await AsyncStorage.removeItem('userToken'); // Replace with your token or user data key
      console.log("User data cleared");
    } catch (error) {
      console.log("Error clearing user data: ", error);
    }
  };

  const handleLogout = () => {
    Alert.alert(
      "Confirm Logout",
      "Are you sure you want to log out?",
      [
        {
          text: "No",
          onPress: () => {
            console.log("Cancel Pressed");
            navigation.navigate('HomeTab'); // Navigate to HomeTab screen
            setIsLoggedOut(false); // Reset the logged out state
          },
          style: "cancel"
        },
        {
          text: "Yes",
          onPress: async () => {
            console.log("User logged out");
            setLoading(true); // Start loading
            await clearUserData(); // Clear user data
            setIsLoggedOut(true); // Set logged out state to true
            navigation.navigate('Login'); // Navigate to Login screen
            setLoading(false); // Stop loading
          }
        }
      ]
    );
  };

  useEffect(() => {
    if (isLoggingOut) {
      handleLogout(); // Prompt the logout confirmation if logging out
    }
  }, [isLoggingOut]);

  useEffect(() => {
    if (!isLoggedOut) {
      setIsLoggingOut(true); // Set to true when the component mounts and user has not logged out
    }
  }, [isLoggedOut]);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        {loading ? ( // Show loading indicator while processing logout
          <ActivityIndicator size="large" color="#4A0E77" />
        ) : (
          isLoggedOut && <Text style={styles.message}>You have been logged out.</Text>
        )}
      </View>
    </View>
  );
};

export default LogoutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E6FA', // Light purple background
  },
  content: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)', // White background with some transparency
    elevation: 5, // Add shadow on Android
    shadowColor: '#000', // Shadow color for iOS
    shadowOffset: { width: 0, height: 3 }, // Shadow offset
    shadowOpacity: 0.1, // Shadow opacity
    shadowRadius: 5, // Shadow radius
    width: '80%', // Set the width to prevent overflow
  },
  message: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A0E77',
    textAlign: 'center',
    marginBottom: 20,
  },
});


