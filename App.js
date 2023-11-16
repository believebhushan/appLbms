import React, {useEffect, useState} from 'react';

import {Provider} from 'react-redux';

import LoginScreen from './src/components/Login/LoginScreen';
import {getData} from './src/store/storageUtil';


import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Dashboard from './src/components/Dashboard';

import {NavigationContainer} from '@react-navigation/native';
import SignupScreen from './src/components/Login/SIgnupScreen';
import PermissionScreen from './src/components/features/Permission';
import checker from './src/components/features/Permission/checker';
import SplashScreen from './src/components/SplashScreen';


import store from "./src/store/configureStore";
import { setUserAuth } from './src/actions/authActions';


const StackNavigator = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [allPermissionsGranted, setArePermissionsGranted] = useState(false);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchData = async () => {
      const userAuth = await getData('userDetails');
      const allPermissionsGranted = await checker();
      setArePermissionsGranted(allPermissionsGranted);
      if (userAuth && userAuth.user) {
        setIsLoggedIn(true);
        setLoading(false);
        store.dispatch(setUserAuth( userAuth.user));
      } else {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        {loading ? (
          <SplashScreen />
        ) : (
          <StackNavigator.Navigator
            initialRouteName={
              allPermissionsGranted && isLoggedIn
                ? 'Dashboard'
                : ( allPermissionsGranted && !isLoggedIn ? 'Login' : 'PermissonScreen')
            }>
            <StackNavigator.Screen
              name="Dashboard"
              component={Dashboard}
              options={{headerShown: false}}
            />
            <StackNavigator.Screen name="Login" component={LoginScreen} />
            <StackNavigator.Screen name="Signup" component={SignupScreen} />
            <StackNavigator.Screen
              name="PermissonScreen"
              component={PermissionScreen}
              options={{headerShown: false}}
            />
          </StackNavigator.Navigator>
        )}
      </NavigationContainer>
    </Provider>
  );
}

export default App;
