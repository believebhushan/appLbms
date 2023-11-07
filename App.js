import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';

import store from './src/store/configureStore';
import LoginScreen from './src/components/Login/LoginScreen';
import MainAppScreen from './src/components/features/Home/MainAppScreen';
import {getData} from './src/store/storageUtil';
import ContactList from './src/components/features/Contacts';
import CallAnalyse from './src/components/features/CallAnalyse';
import CallList from './src/components/features/CallList';

import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import LbmsTabBar from './src/components/navigation/LbmsTabBar';
import syncLogs from './src/utils/syncLogs';

const Tab = createBottomTabNavigator();

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
          <Tab.Navigator initialRouteName={isLoggedIn ? 'CallList' : 'Login'} tabBar={props => <LbmsTabBar {...props} />}>
            <Tab.Screen name="Home" component={MainAppScreen} options={{headerShown:true, headerTitle:'Dashboard'}} />
            <Tab.Screen name="Login" component={LoginScreen} />
            <Tab.Screen name="CallList" component={CallList} />
            <Tab.Screen name="Messages" component={CallAnalyse} />
            <Tab.Screen name="ContactDetails" component={ContactList} />
            
          </Tab.Navigator>
        </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
