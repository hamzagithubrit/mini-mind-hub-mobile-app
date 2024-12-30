
import React, { useState, useContext } from 'react';
import { View, StyleSheet, Alert, ActivityIndicator, Image } from 'react-native';
import { TextInput, Button, Card, HelperText } from 'react-native-paper';  // Added HelperText for error message
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';
import { UserContext } from '../context/UserContext';
import * as Animatable from 'react-native-animatable';

const LoginScreen = ({ navigation }) => {
  const { setUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [loading, setLoading] = useState(false);
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleLogin = async () => {
    setEmailError('');
    setPasswordError('');

    if (!email || !password) {
      Alert.alert('Error', 'Email and password are required.');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setEmailError('Please enter a valid email address.');
      return;
    }

    if (password.length < 6) {
      setPasswordError('Password must be at least 6 characters long.');
      return;
    }

    setLoading(true);

    try {
      const response = await api.post(`/auth/login`, { email, password });

      if (response.data && response.data.token) {
        // Alert.alert('Success', 'Logged in successfully!');
        await AsyncStorage.setItem('token', response.data.token);

        setUser({
          id: response.data.user.id,
          email: response.data.user.email,
          name: response.data.user.name,
          token: response.data.token,
        });

        navigation.navigate('HomeTabs');
      } else {
        Alert.alert('Error', 'Invalid credentials. Please check your email and password.');
      }

    } catch (error) {
      console.error(error);
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      Alert.alert('Error', errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content style={styles.cardContent}>
          {/* Animated Logo */}
          <Animatable.View animation="bounceIn" duration={1500} style={styles.logoContainer}>
            <Image source={require('../assets/logo5.jpg')} style={styles.logo} />
          </Animatable.View>

          {/* Login Title */}
          <TextInput
            label="Email"
            value={email}
            onChangeText={(e) => setEmail(e)}
            mode="outlined"
            style={[styles.input, emailError ? styles.errorInput : null]} // Apply error style
            keyboardType="email-address"
            autoCapitalize="none"
          />
          {/* Display error message for email */}
          {emailError ? <HelperText type="error">{emailError}</HelperText> : null}

          <TextInput
            label="Password"
            value={password}
            onChangeText={(p) => setPassword(p)}
            secureTextEntry={secureTextEntry}
            mode="outlined"
            style={[styles.input, passwordError ? styles.errorInput : null]} // Apply error style
            right={
              <TextInput.Icon
                icon={secureTextEntry ? 'eye-off' : 'eye'}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              />
            }
          />
          {/* Display error message for password */}
          {passwordError ? <HelperText type="error">{passwordError}</HelperText> : null}

          <Button
            mode="contained"
            onPress={handleLogin}
            style={styles.button}
            labelStyle={styles.buttonText}  // Apply the button text style here
            disabled={loading}
          >
            {loading ? <ActivityIndicator color="#fff" /> : 'Login'}
          </Button>

          {/* Forgot Password Link */}
          <Button
            mode="text"
            onPress={() => navigation.navigate('ForgotPasswordScreen')}
            style={styles.link}
          >
            Forgot Password?
          </Button>

          {/* Register Link */}
          <Button
            mode="text"
            onPress={() => navigation.navigate('Register')}
            style={styles.link}
          >
            Don’t have an account? Register ?
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
    backgroundColor: '#f1e7fe',
  },
  card: {
    padding: 30,
    borderRadius: 15,
    elevation: 5,
    backgroundColor: '#f1e7fe',
  },
  cardContent: {
    paddingHorizontal: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  logo: {
    width: 200,
    height: 150,
    resizeMode: 'contain',
    borderRadius: 50,
  },
  input: {
    marginBottom: 15,
  },
  errorInput: {
    borderColor: 'red',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#6a0dad', // Light purple color
    paddingVertical: 10,
  },
  buttonText: {
    fontSize: 18, // Increased font size for button text
    fontWeight: 'bold',
  },
  link: {
    marginTop: 10,
    textAlign: 'center',
    color: '#6a0dad',
  },
});

export default LoginScreen;