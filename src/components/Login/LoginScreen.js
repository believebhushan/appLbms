import React, { useState,useEffect } from 'react';
import { View, Text, TextInput, Button } from 'react-native';
import {storeData} from '../../store/storageUtil';
import { getData } from '../../store/storageUtil';
import { setUserAuth } from '../../actions/authActions';
import store from '../../store/configureStore';
import { useNavigation } from '@react-navigation/native';
import LoginLoading from './LoginLoading';


const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [hasLoggedIn,setHasLoggedIn] = useState(false);
  const [loading,setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userAuth = await getData('userDetails');
      if (userAuth && userAuth.user) {
        store.dispatch(setUserAuth( userAuth.user));
        setHasLoggedIn(true);
        navigation.navigate('Home');
      }
    };
  
    fetchData(); // Call the async function immediately
  
  }, []);


  const handleLogin = async () => {  
    setLoading(true);
    try {
      const response = await fetch('https://lbms-ajua.onrender.com/api/users/sign_in', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: username,
          password: password,
        }),
      });
      setLoading(false);

      if (response.ok) {
        const userData = await response.json();
        await storeData('userDetails',{user: userData.user});
        await storeData('lastSynced',userData.user.last_synced);
        store.dispatch(setUserAuth( userData.user));
        navigation.navigate('Home');
      } else {
      }
    } catch (error) {
    }
  };

  return (
    <View>
      <Text style={{fontSize: 30, color: 'blue', fontWeight: 500,}}>Login</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Button title={loading? "loading....": "Login"} onPress={handleLogin}  disabled={loading}/>
      <Text>
      </Text>
    </View>
  );
};

export default LoginScreen;
