import React, {useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';

import {Provider} from 'react-redux';

import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import store from './src/store/configureStore';
import LoginScreen from './src/components/Login/LoginScreen';
import MainAppScreen from './src/components/features/Home/MainAppScreen';
import CardDetails from './src/components/CardDetails';
import {getData} from './src/store/storageUtil';
import ContactList from './src/components/features/Contacts';
import CallAnalyse from './src/components/features/CallAnalyse';
import CallList from './src/components/features/CallList';

import TopNavigation from './src/components/navigation/TopNavigation';

const Stack = createNativeStackNavigator();

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  useEffect(() => {
    const fetchData = async () => {
      const userAuth = await getData('userDetails');
      console.log(userAuth, 'userAuth ');
      if (userAuth && userAuth.user) {
        setIsLoggedIn(true);
      }
    };

    fetchData();
  }, []);

  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName={isLoggedIn ? 'MainApp' : 'Login'}>
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{title: 'Login'}}
          />
          <Stack.Screen
            name="MainApp"
            component={MainAppScreen}
            options={{
              title: 'LBMS',
              header: ({navigation, route, options, back}) => {
                return (
                  <TopNavigation
                    navigation={navigation}
                    back={back}
                    options={options}
                    route={route}
                  />
                );
              },
            }}
          />
          <Stack.Screen name="CardDetails" component={CardDetails} />
          <Stack.Screen
            name="ContactDetails"
            component={ContactList}
            options={{
              title: 'Contacts',
              header: ({navigation, route, back, options}) => {
                return (
                  <TopNavigation
                    navigation={navigation}
                    back={back}
                    options={options}
                    route={route}
                  />
                );
              },
            }}
          />

          <Stack.Screen
            name="CallAnalyse"
            component={CallAnalyse}
            options={{
              title: 'Call Analysis',
              header: ({navigation, route, back, options}) => {
                return (
                  <TopNavigation
                    navigation={navigation}
                    back={back}
                    options={options}
                    route={route}
                  />
                );
              },
            }}
          />

          <Stack.Screen
            name="CallList"
            component={CallList}
            options={{
              title: 'Call List',
              header: ({navigation, route, back, options}) => {
                return (
                  <TopNavigation
                    navigation={navigation}
                    back={back}
                    options={options}
                    route={route}
                  />
                );
              },
            }}
          />
        </Stack.Navigator>
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
