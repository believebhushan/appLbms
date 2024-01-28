// HomeStack.js

import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import ProfileDetails from '../home/ProfileDetails';
import Home from '../home';
import ProfileWebView from '../home/profileWebView';

const Stack = createNativeStackNavigator();

const options = {
  headerShown: false
};

const HomeStack = () => {
  return (
    <Stack.Navigator initialRouteName="LmsHome">
      <Stack.Screen name="LmsHome" component={Home} options={options} />
      <Stack.Screen name="ProfileDetails" component={ProfileDetails} options={options} />
      <Stack.Screen name="ProfileWebView" component={ProfileWebView} options={options} />
    </Stack.Navigator>
  );
}

export default HomeStack;
