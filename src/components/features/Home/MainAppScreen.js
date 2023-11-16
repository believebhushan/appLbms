import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';

import DialerScreen from './DailerScreen';


const MainAppScreen = () => {
  const currentUser = useSelector(state => state.auth.user);
  console.log(currentUser,"currentUser");
  useEffect(() => {
    
  }, []);

  return (
    <View style={styles.container}>
          <Text style={styles.welcomeText}>Welcome {currentUser?.first_name || currentUser?.email}</Text>
          <Text style={styles.welcomeText}>Updated Till {currentUser?.last_synced}</Text>
          <View style={styles.content}>
            <DialerScreen />
          </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
  },
  welcomeText: {
    padding: 10,
    margin: 10,
    backgroundColor: 'white',
  },
});

export default MainAppScreen;
