import React, {useEffect, useState} from 'react';

import {Provider} from 'react-redux';

import store from './src/store/configureStore';
import LoginScreen from './src/components/Login/LoginScreen';
import {getData} from './src/store/storageUtil';

import syncLogs from './src/utils/syncLogs';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Dashboard from './src/components/Dashboard';

import { NavigationContainer } from '@react-navigation/native';
import SignupScreen from './src/components/Login/SIgnupScreen';


const StackNavigator = createNativeStackNavigator();


function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const userAuth = await getData('userDetails');
      console.log(userAuth, 'userAuth ');
      if (userAuth && userAuth.user) {
        setIsLoggedIn(true);
        await syncLogs();
      }
    };

    fetchData();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
      <StackNavigator.Navigator initialRouteName={isLoggedIn? "Dashboard":"Login"}>
          <StackNavigator.Screen name="Dashboard" component={Dashboard} options={{headerShown:false}} />
          <StackNavigator.Screen name="Login" component={LoginScreen} />
          <StackNavigator.Screen name="Signup" component={SignupScreen} />
       </StackNavigator.Navigator>
      </NavigationContainer>
      
    </Provider>
  );
}

export default App;
