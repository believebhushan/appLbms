import React from 'react';
import { Provider } from 'react-redux';
// import { NavigationContainer } from '@react-navigation/native';
// import { createDrawerNavigator } from '@react-navigation/drawer';
import store from './src/store/configureStore';
import LoginScreen from './src/components/Login/LoginScreen';
import MainAppScreen from './src/components/features/Home/MainAppScreen';


const  StartApp = ()=>{
  // Check if the user is authenticated, and conditionally render the main app or login screen
  const isAuthenticated = store.getState().auth.user !== null;

  return (
    <Provider store={store}>
        {isAuthenticated ? <MainAppScreen/>: <LoginScreen/>}
    </Provider>
  );
}

export default StartApp;
