import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";

const IntroPage = ({ setShowIntro = () => {} }) => {
  const handleButtonClick = () => {
    console.log("startttt");
    setShowIntro(false);
  };

  return (
    <View style={styles.container}>
      {/* Icon */}
      <Image
        source={require("../../../images/logo.png")}
        style={styles.icon}
        resizeMode="contain"
      />

      {/* Text */}
      <Text style={styles.text}>
        Welcome to KallApp! This is an amazing app that does fantastic things.
        Enjoy the experience!
      </Text>


      {/* Button */}
      <TouchableOpacity style={styles.button} onPress={handleButtonClick}>
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  icon: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  text: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#3498db",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    textAlign: "center",
  },
});

export default IntroPage;
