
import { StyleSheet, Text, View, Image, Alert, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import api from '../api/api'; // Adjust the path as needed
import { UserContext } from '../context/UserContext'; // Import UserContext
import axios from 'axios';
import * as DocumentPicker from 'expo-document-picker';
import Icon from "react-native-vector-icons/Ionicons";
import updateProfilePic from './updateProfilePic';
import { useNavigation } from '@react-navigation/native';

const AccountScreen = () => {
  const { user, setUser } = useContext(UserContext); // Access logged-in user info
  const [userImage, setUserImage] = useState(''); // State to hold user image URL
  const [userName, setUserName] = useState(''); // State to hold user name
  const [originalName, setOriginalName] = useState(''); // Store original name
  const [userEmail, setUserEmail] = useState(''); // State to hold user email
  const [originalEmail, setOriginalEmail] = useState(''); // Store original email
  const [currentPassword, setCurrentPassword] = useState(''); // State for current password
  const [newPassword, setNewPassword] = useState(''); // State for new password
  const [isEditing, setIsEditing] = useState(false); // Unified editing state
  const [imageUri, setImageUri] = useState(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [loading, setLoading] = useState(false); // State to control loader
  const navigation = useNavigation(); // Initialize the navigation object


  const handlePickImage = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "image/*",
      });

      if (result.assets && result.assets.length > 0) {
        const pickedFile = result.assets[0];
        setImageUri(pickedFile.uri);

        const file = {
          uri: pickedFile.uri,
          name: pickedFile.name,
          type: pickedFile.mimeType,
        };

        setLoading(true); // Show loader when uploading starts
        try {
          const response = await updateProfilePic(user.id, file);
          setStatusMessage(response.message);
          setUserImage(response.avatar.url);
          setUser({ ...user, avatar: response.avatar.url }); // Update user context
        } catch (error) {
          console.error("Error updating profile picture:", error);
          setStatusMessage("Failed to update profile picture.");
        } finally {
          setLoading(false); // Hide loader when upload is done
        }
      } else {
        console.log("No file selected");
      }
    } catch (error) {
      console.error("Error in handlePickImage:", error);
      setStatusMessage("An error occurred while picking the image.");
      setLoading(false); // Hide loader in case of error
    }
  };

  useEffect(() => {
    const fetchUserDetails = async () => {
      if (user && user.id) {
        try {
          const response = await api.get(`/auth/users/${user.id}`);
          const userData = response.data;
  
          // Safely handle avatar
          const avatarUrl = userData.avatar?.url || 'https://via.placeholder.com/100';
  
          setUserImage(avatarUrl); // Set user image
          setUserName(userData.name);
          setOriginalName(userData.name); // Store the original name
          setUserEmail(userData.email);
          setOriginalEmail(userData.email); // Store the original email
        } catch (error) {
          console.error('Error fetching user details:', error.response?.data || error.message);
          Alert.alert('Error', 'Failed to fetch user details.');
        }
      } else {
        setUserImage('');
        setUserName('');
        setUserEmail('');
      }
    };
  
    fetchUserDetails();
  }, [user]);
    const handleUpdateUserInfo = async () => {
    if (!user || !user.id) {
      Alert.alert('Error', 'User is not logged in or has no ID.');
      return;
    }

    try {
      await api.put(`/auth/users/${user.id}`, {
        name: userName,
        email: userEmail,
      });
      setUser({
        ...user,
        name: userName,
        email: userEmail,
      });
      Alert.alert('Success', 'User information updated successfully!');
      setIsEditing(false); // Exit editing mode
      setOriginalName(userName); // Update original name
      setOriginalEmail(userEmail); // Update original email
    } catch (error) {
      console.error('Error updating user information:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to update user information.');
    }
  };

  const handleCancelEdit = () => {
    setUserName(originalName); // Revert to the original name
    setUserEmail(originalEmail); // Revert to the original email
    setIsEditing(false); // Exit editing mode
  };

  const handleDeleteAccount = async () => {
    if (!user || !user.id) {
      Alert.alert('Error', 'User is not logged in or has no ID.');
      return;
    }

    try {
      await api.delete(`/auth/users/${user.id}`);
      setUser(null); // Clear user context on deletion
      Alert.alert('Success', 'Account deleted successfully!');
      //example navigation
      // useNavigation('/user/login');
    } catch (error) {
      console.error('Error deleting account:', error.response?.data || error.message);
      Alert.alert('Error', 'Failed to delete account.');
    }
  };

  return (
    <View style={styles.container}>
    <Text style={styles.heading}>Account Information</Text>

    {user ? (
      <>
        <View style={styles.profileContainer}>
          {loading ? (
            <ActivityIndicator size="large" color="#4A0E77" />
          ) : (
            <>
              <Image
                source={{ uri: userImage || 'https://via.placeholder.com/100' }}
                style={styles.profileImage}
              />
              <TouchableOpacity style={styles.cameraButton} onPress={handlePickImage}>
                <Icon name="camera" size={20} color="white" />
              </TouchableOpacity>
            </>
          )}
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Name</Text>
          <TextInput
            style={styles.input}
            value={userName}
            onChangeText={setUserName}
            placeholder="Enter your name"
            editable={isEditing}
          />
        </View>

        <View style={styles.inputContainer}>
          <Text style={styles.label}>Email</Text>
          <TextInput
            style={styles.input}
            value={userEmail}
            onChangeText={setUserEmail}
            placeholder="Enter your email"
            keyboardType="email-address"
            editable={isEditing}
          />
        </View>

        {isEditing && (
          <>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>Current Password</Text>
              <TextInput
                style={styles.input}
                value={currentPassword}
                onChangeText={setCurrentPassword}
                placeholder="Enter your current password"
                secureTextEntry
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.label}>New Password</Text>
              <TextInput
                style={styles.input}
                value={newPassword}
                onChangeText={setNewPassword}
                placeholder="Enter your new password"
                secureTextEntry
              />
            </View>
          </>
        )}

        <View style={styles.buttonRow}>
          {isEditing ? (
            <>
              <TouchableOpacity style={styles.updateButton} onPress={handleUpdateUserInfo}>
                <Text style={styles.buttonText}>Update</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
            </>
          ) : (
            <TouchableOpacity style={styles.editButton} onPress={() => setIsEditing(true)}>
              <Text style={styles.buttonText}>Edit</Text>
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity style={styles.deleteButton} onPress={handleDeleteAccount}>
          <Text style={styles.buttonText}>Delete Account</Text>
        </TouchableOpacity>


        <TouchableOpacity
  style={[styles.deleteButton, { marginTop: 10 }]} // Add marginTop to create space
  onPress={() => {
    setUser(null); // Clear user context on logout
    navigation.navigate('Login'); // Navigate to the Login screen
  }}
>
  <Text style={styles.buttonText}>Logout</Text>
</TouchableOpacity>
      </>
    ) : (
      <Text style={styles.heading}>No user information available. Please log in.</Text>
    )}
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E6E6FA',
    padding: 20,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A0E77',
    marginBottom: 20,
    textAlign: 'center',
  },
  profileContainer: {
    position: 'relative',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#e0bbff',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#4A0E77',
    width: 30,
    height: 30,
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inputContainer: {
    marginBottom: 20,
    width: '100%',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#4A0E77',
    marginBottom: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#4A0E77',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    color: '#4A0E77',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
  },
  updateButton: {
    backgroundColor: '#6a0dad',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginRight: 5,
  },
  cancelButton: {
    backgroundColor: 'gray',
    padding: 10,
    borderRadius: 8,
    flex: 1,
    marginLeft: 5,
  },
  editButton: {
    backgroundColor: '#4A0E77',
    padding: 10,
    borderRadius: 8,
    flex: 1,
  },
  deleteButton: {
    backgroundColor: '#ff6666',
    padding: 10,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});


export default AccountScreen;



