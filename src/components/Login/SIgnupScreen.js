import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Image, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const SignupScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async () => {
    setLoading(true);
    try {
      const response = await fetch('https://lbms-ajua.onrender.com/api/users/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      const data = await response.json();
      setLoading(false);
      Alert.alert(data.status ? 'Success': 'Error', data.message, [
        {
          text: 'Login',
          onPress: () => {navigation.navigate("Login");},
        }
     ]);
    } catch (error) {
        Alert.alert('Something Went Wrong', [
            {
              text: 'Retry',
              onPress: () => {},
            }
         ]);
    }
  };

  return (
    <View style={styles.container}>
     {/* <Image style={styles.logo} source={require('../../images/logo.png')} /> */}
      <Text style={styles.title}>Sign Up</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={loading ? 'Loading....' : 'Sign Up'} onPress={handleSignup} disabled={loading} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
    },
    logo: {
      width: '100%',
      height: 100,
      marginBottom: 20,
    },
    title: {
      fontSize: 30,
      color: 'blue',
      fontWeight: '500',
      marginBottom: 20,
    },
    input: {
      width: '100%',
      height: 40,
      borderColor: 'gray',
      borderWidth: 1,
      marginBottom: 16,
      paddingLeft: 8,
    },
    signupLink: {
      marginTop: 20,
      color: 'blue',
    },
  });

export default SignupScreen;
