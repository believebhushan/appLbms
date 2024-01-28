import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from 'react-native';
import {getData} from '../../store/storageUtil';
import {useNavigation} from '@react-navigation/native';
import store from '../../store/configureStore';
import { setUserAuth } from '../../actions/authActions';
import loginUser from '../../utils/loginDetails';


const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const userAuth = await getData('userDetails');
      if (userAuth && userAuth.user) {
        store.dispatch(setUserAuth( userAuth.user));
        navigation.replace('Dashboard');
      }
    };

    fetchData(); 
  }, []);

  const handleLogin = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        'https://lbms-ajua.onrender.com/api/users/login',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        },
      );
      setLoading(false);

        const userData = await response.json();
        // console.log(userData,"userData")
        if(userData?.status && userData.user){
          await loginUser(userData.user)
          navigation.replace('Dashboard');
        }
        else{
          Alert.alert('Error', userData.message, [
            {
              text: 'Retry',
              onPress: () => {},
            }
         ]);
        }
    
    } catch (error) {
      Alert.alert('Something Went Wrong','', [
        {
          text: 'Retry',
          onPress: () => {},
        },
      ]);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
      />
      <Button
        title={loading ? 'Loading....' : 'Login'}
        onPress={handleLogin}
        disabled={loading}
      />
      <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
        <Text style={styles.signupLink}>
          Don't have an account? Sign up here
        </Text>
      </TouchableOpacity>
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
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
});

export default LoginScreen;
