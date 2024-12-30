// import React, { useState } from 'react';
// import {View,Text,TextInput, TouchableOpacity,StyleSheet, Alert,Image,KeyboardAvoidingView,ScrollView,Platform,} from 'react-native';
// import api from '../api/api';

// const ConfirmPasswordScreen = ({ route, navigation }) => {
//   const { email, otp } = route.params;
//   const [newPassword, setNewPassword] = useState('');
//   const [confirmPassword, setConfirmPassword] = useState('');

//   const handlePasswordReset = async () => {
//     if (newPassword !== confirmPassword) {
//       alert('Passwords do not match!');
//       return;
//     }

//     try {
//       const response = await api.put('/auth/reset-password', { email, otp, newPassword });

//       if (response.status === 200) {
//         Alert.alert('Success', 'Password has been reset successfully!');
//         navigation.navigate('Login');
//       }
//     } catch (error) {
//       console.error(error);
//       Alert.alert('Error', 'There was an issue resetting your password.');
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={styles.container}
//       behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
//     >
//       <ScrollView contentContainerStyle={styles.scrollContainer}>
//         <Image
//           source={require('../assets/LOCK.png')} // A lock icon image to make it more engaging
//           style={styles.icon}
//         />
//         <Text style={styles.title}>Reset Your Password</Text>

//         <Text style={styles.label}>Email</Text>
//         <TextInput
//           style={[styles.input, styles.readOnly]}
//           value={email}
//           editable={false}
//         />

//         <Text style={styles.label}>OTP</Text>
//         <TextInput
//           style={[styles.input, styles.readOnly]}
//           value={otp}
//           editable={false}
//         />

//         <Text style={styles.label}>New Password</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter new password"
//           value={newPassword}
//           onChangeText={setNewPassword}
//           secureTextEntry
//         />

//         <Text style={styles.label}>Confirm Password</Text>
//         <TextInput
//           style={styles.input}
//           placeholder="Confirm new password"
//           value={confirmPassword}
//           onChangeText={setConfirmPassword}
//           secureTextEntry
//         />

//         <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
//           <Text style={styles.buttonText}>Reset Password</Text>
//         </TouchableOpacity>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#f3f3f3',
//   },
//   scrollContainer: {
//     flexGrow: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     padding: 20,
//   },
//   icon: {
//     width: 80,
//     height: 80,
//     marginBottom: 20,
//   },
//   title: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     color: '#4A148C',
//     marginBottom: 10,
//     textAlign: 'center',
//   },
//   label: {
//     fontSize: 16,
//     color: '#555',
//     marginBottom: 5,
//     fontWeight: '500',
//     textAlign: 'center',
//   },
//   input: {
//     height: 50,
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 12,
//     paddingHorizontal: 15,
//     backgroundColor: '#FFF',
//     marginBottom: 15,
//     width: '80%',
//   },
//   readOnly: {
//     backgroundColor: '#eee',
//     color: '#aaa',
//   },
//   button: {
//     backgroundColor: '#6a1b9a',
//     paddingVertical: 12,
//     borderRadius: 12,
//     width: '80%',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowOffset: { width: 0, height: 2 },
//     shadowRadius: 5,
//     marginTop: 15,
//   },
//   buttonText: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: '600',
//   },
// });

// export default ConfirmPasswordScreen;



import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Image, KeyboardAvoidingView, ScrollView, Platform } from 'react-native';
import api from '../api/api';
import { MaterialCommunityIcons } from 'react-native-vector-icons';

const ConfirmPasswordScreen = ({ route, navigation }) => {
  const { email, otp } = route.params; // You still need these for the API call, but they're not displayed now.
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [secureNewPassword, setSecureNewPassword] = useState(true);
  const [secureConfirmPassword, setSecureConfirmPassword] = useState(true);

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      Alert.alert('Passwords do not match!');
      return;
    }

    try {
      const response = await api.put('/auth/reset-password', { email, otp, newPassword });

      if (response.status === 200) {
        Alert.alert('Success', 'Password has been reset successfully!');
        navigation.navigate('Login');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'There was an issue resetting your password.');
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Image
          source={require('../assets/LOCK.png')} // A lock icon image to make it more engaging
          style={styles.icon}
        />
        <Text style={styles.title}>Reset Your Password</Text>

        {/* New Password field */}
        <Text style={styles.label}>New Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Enter new password"
            value={newPassword}
            onChangeText={setNewPassword}
            secureTextEntry={secureNewPassword}
          />
          <TouchableOpacity
            onPress={() => setSecureNewPassword(!secureNewPassword)}
            style={styles.iconButton}
          >
            <MaterialCommunityIcons
              name={secureNewPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#4A148C"
            />
          </TouchableOpacity>
        </View>

        {/* Confirm Password field */}
        <Text style={styles.label}>Confirm Password</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Confirm new password"
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            secureTextEntry={secureConfirmPassword}
          />
          <TouchableOpacity
            onPress={() => setSecureConfirmPassword(!secureConfirmPassword)}
            style={styles.iconButton}
          >
            <MaterialCommunityIcons
              name={secureConfirmPassword ? 'eye-off' : 'eye'}
              size={24}
              color="#4A148C"
            />
          </TouchableOpacity>
        </View>

        {/* Reset Password button */}
        <TouchableOpacity style={styles.button} onPress={handlePasswordReset}>
          <Text style={styles.buttonText}>Reset Password</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1e7fe',
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#4A148C',
    marginBottom: 10,
    textAlign: 'center',
  },
  label: {
    fontSize: 16,
    color: '#555',
    marginBottom: 5,
    fontWeight: '500',
    textAlign: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
    marginBottom: 20,
    position: 'relative',
  },
  input: {
    height: 55, // Increased height for a more spacious input
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 15, // Rounded corners for a more modern look
    paddingHorizontal: 20,
    backgroundColor: '#FFF',
    flex: 1,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 5,
  },
  iconButton: {
    position: 'absolute',
    right: 10,
    top: '50%',
    transform: [{ translateY: -12 }],
    padding: 10,
  },
  button: {
    backgroundColor: '#6a1b9a',
    paddingVertical: 12,
    borderRadius: 12,
    width: '80%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default ConfirmPasswordScreen;
