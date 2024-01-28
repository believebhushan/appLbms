// HomeStack.js

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProfileDetails from '../home/ProfileDetails';
import Home from '../home';
import ProfileWebView from '../home/profileWebView';
import Logs from '../logs';
import ContactsList from '../logs/ContactsList';

const Stack = createNativeStackNavigator();

const options = {
  headerShown: false
};

const LogsStack = () => {
  return (
    <Stack.Navigator initialRouteName="LogsHome">
      <Stack.Screen name="LogsHome" component={Logs} options={options} />
      <Stack.Screen name="LogsContactsList" component={ContactsList} options={options} />
    </Stack.Navigator>
  );
}

export default LogsStack;
