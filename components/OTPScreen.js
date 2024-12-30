import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import api from '../api/api';

const OTPScreen = ({ route, navigation }) => {
  const { email } = route.params;
  const [otp, setOtp] = useState(['', '', '', '', '', '']);

  const handleVerifyOTP = async () => {
    const otpCode = otp.join('');
    if (otpCode.length === 6) {
      try {
        const response = await api.post('/auth/verify-otp', { email, otp: otpCode });
        if (response.status === 200) {
          Alert.alert('Success', 'OTP verified successfully!');
          navigation.navigate('ConfirmPasswordScreen', { email, otp: otpCode });
        }
      } catch (error) {
        console.error(error);
        Alert.alert('Error', 'Invalid OTP or OTP has expired.');
      }
    } else {
      Alert.alert('Error', 'Please enter a valid 6-digit OTP.');
    }
  };

  const handleChange = (text, index) => {
    const newOtp = [...otp];
    newOtp[index] = text;
    setOtp(newOtp);
    
    // Move focus to the next input box if available
    if (text && index < 5) {
      const nextInput = `input${index + 1}`;
      this[nextInput]?.focus();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Verify Your OTP</Text>
        <Text style={styles.subtitle}>Check your email for the 6-digit code</Text>
      </View>

      <View style={styles.otpContainer}>
        {otp.map((digit, index) => (
          <TextInput
            key={index}
            ref={(input) => { this[`input${index}`] = input; }}
            style={styles.otpInput}
            keyboardType="numeric"
            maxLength={1}
            value={digit}
            onChangeText={(text) => handleChange(text, index)}
          />
        ))}
      </View>

      <TouchableOpacity style={styles.button} onPress={handleVerifyOTP}>
        <Text style={styles.buttonText}>Verify OTP</Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f1e7fe',
    padding: 20,
    justifyContent: 'center',
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4A148C', // dark purple color
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 8,
  },
  otpContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
  otpInput: {
    width: 50,
    height: 50,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 10,
    backgroundColor: '#FFF',
    fontSize: 20,
    textAlign: 'center',
    color: '#4A148C', // Text color to match design
    fontWeight: '600',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  button: {
    backgroundColor: '#6a1b9a',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

export default OTPScreen;
