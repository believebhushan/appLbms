// SplashScreen.js
import React, { useEffect } from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

const SplashScreen = () => {
  useEffect(() => {
  }, []);

  return (
    <View style={styles.container}>
      <Image source={require('../images/logo.png')} style={styles.logo} />
      <Text style={styles.appName}>K-Education</Text>
      <Text style={styles.slogan}>Dare to be free, dare to go as far as your thought leads, and dare to carry that out in your life.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white', // Change to your preferred background color
  },
  logo: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  appName: {
    fontSize: 24,
    color: '#232323', // Change to your preferred text color
    marginTop: 16,
    fontWeight: 'bold',
  },
  slogan: {
    fontSize: 16,
    color: '#343434',
    marginTop: 8,
    padding:10,
    fontStyle: 'italic',
    textAlign:'center'
  },
});

export default SplashScreen;
