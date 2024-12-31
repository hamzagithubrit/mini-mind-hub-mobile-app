import React, { useState } from "react";
import { View, StyleSheet, Alert, Image } from "react-native";
import { TextInput, Button, Card, Text, HelperText } from "react-native-paper";
import * as Animatable from "react-native-animatable";
import api from "../api/api";

const RegisterScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [secureTextEntry, setSecureTextEntry] = useState(true);
  const [emailError, setEmailError] = useState("");
  const [nameError, setNameError] = useState("");
  const [passwordError, setPasswordError] = useState("");

  const handleRegister = async () => {
    setEmailError("");
    setNameError("");
    setPasswordError("");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Basic email format validation
    const validDomains = ["example.com", "myapp.com", "gmail.com"]; // Added gmail.com to valid domains
    const emailDomain = email.split("@")[1];

    // Name validation
    if (!firstName && !lastName) {
      setNameError("Name is required.");

      return;
    } else if (firstName.length < 3 && lastName.length < 3) {
      setNameError("Name must be at least 3 characters long.");
      return;
    }

    // Email validation
    if (!email || !password || !firstName || !lastName) {
      Alert.alert("Error", "All fields are required.");
      return;
    }

    if (!emailRegex.test(email)) {
      setEmailError("Please enter a valid email address.");
      return;
    }

    if (!validDomains.includes(emailDomain)) {
      setEmailError(`Email domain must be one of: ${validDomains.join(", ")}`);
      return;
    }

    // Password validation
    if (password.length < 6) {
      setPasswordError("Password must be at least 6 characters long.");
      return;
    }

    console.log(firstName, "firstName");
    console.log(lastName, "lastName");

    try {
      const response = await api.post("/signup", {
        firstName,
        lastName,
        email,
        password,
      });

      Alert.alert("Success", response.data.message);
      navigation.navigate("Login");
    } catch (error) {
      console.error(error);
      Alert.alert(
        "Error",
        error.response?.data?.message || "Registration failed."
      );
    }
  };

  return (
    <View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          {/* Animated Logo */}
          <Animatable.View
            animation="bounceIn"
            duration={1500}
            style={styles.logoContainer}
          >
            <Image
              source={require("../assets/logo6.jpg")}
              style={styles.logo}
            />
          </Animatable.View>

          {/* Title */}
          <Text style={styles.title}>Create an Account</Text>

          {/* Registration Form */}
          <TextInput
            label="FirstName"
            value={firstName}
            onChangeText={setFirstName}
            mode="outlined"
            style={styles.input}
            theme={{ colors: { primary: "#6a0dad" } }}
          />
          {nameError ? <HelperText type="error">{nameError}</HelperText> : null}

          <TextInput
            label="LastName"
            value={lastName}
            onChangeText={setLastName}
            mode="outlined"
            style={styles.input}
            theme={{ colors: { primary: "#6a0dad" } }}
          />
          {nameError ? <HelperText type="error">{nameError}</HelperText> : null}

          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            mode="outlined"
            style={styles.input}
            keyboardType="email-address"
            theme={{ colors: { primary: "#6a0dad" } }}
          />
          {emailError ? (
            <HelperText type="error">{emailError}</HelperText>
          ) : null}

          <TextInput
            label="Password"
            value={password}
            onChangeText={setPassword}
            secureTextEntry={secureTextEntry}
            mode="outlined"
            style={styles.input}
            right={
              <TextInput.Icon
                icon={secureTextEntry ? "eye-off" : "eye"}
                onPress={() => setSecureTextEntry(!secureTextEntry)}
              />
            }
            theme={{ colors: { primary: "#6a0dad" } }}
          />
          {passwordError ? (
            <HelperText type="error">{passwordError}</HelperText>
          ) : null}

          <Button
            mode="contained"
            onPress={handleRegister}
            style={styles.button}
            labelStyle={styles.buttonText}
          >
            Register
          </Button>
          <Button
            mode="text"
            onPress={() => navigation.navigate("Login")}
            style={styles.link}
            labelStyle={styles.linkText}
          >
            Already have an account? Login ?
          </Button>
        </Card.Content>
      </Card>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: "#f1e7fe",
  },
  card: {
    padding: 30,
    borderRadius: 15,
    elevation: 10,
    backgroundColor: "#f1e7fe",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 150,
    height: 100,
    resizeMode: "contain",
    borderRadius: 10,
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
    marginBottom: 15,
  },
  input: {
    marginBottom: 15,
    backgroundColor: "#f9f9f9",
    borderRadius: 10,
  },
  button: {
    marginTop: 20,
    backgroundColor: "#6a0dad",
    borderRadius: 10,
    paddingVertical: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  link: {
    marginTop: 10,
  },
  linkText: {
    color: "#6a0dad",
    fontSize: 15,
    fontWeight: "bold",
  },
});

export default RegisterScreen;
