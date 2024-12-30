import {
  View,
  Text,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";
import React from "react";

const image = require("../assets/landingpage.png");

const Welcome = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <ImageBackground source={image} resizeMode="fill" style={styles.image}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Login");
            }}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              navigation.navigate("Register");
            }}
          >
            <Text style={styles.buttonText}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",

    
  },
  buttonContainer: {
    position: "absolute",
    bottom: 50, // Adjust this value to move buttons up or down
    alignItems: "center",
    width: "100%",
  },
  button: {
    width: 300,
    height: 60,
    alignItems: "center",
    padding: 16,
    textAlign: "center",
    borderRadius: 10,
    backgroundColor: "#720e9e",
    marginTop:10
  },
  buttonText: {
    fontSize: 24,
    color: "#D8BFD8",
  },
});

export default Welcome;
