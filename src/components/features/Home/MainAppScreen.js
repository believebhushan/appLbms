import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import {useSelector} from 'react-redux';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';

import Card from '../../Card';
import syncLogs from '../../../utils/syncLogs';
import DialerScreen from './DailerScreen';

const requestPermission = async permission => {
  const isAlreadyGranted = await check(permission);
  console.log(isAlreadyGranted, 'isAlreadyGranted');
  if (isAlreadyGranted == RESULTS.GRANTED) {
    return true;
  }
  let isGranted = false;
  try {
    request(permission).then(result => {
      console.log(result, 'result');
    });
  } catch (err) {
    console.warn(err);
  }
  return isGranted;
};

const MainAppScreen = ({navigation}) => {
  const [loading, setLoading] = useState(false);
  const currentUser = useSelector(state => state.auth.user);
  console.log(currentUser,"currentUser");
  let syncedTime = currentUser?.last_synced;
  let istTimeString = null;
  if(syncedTime){
    const utcTime = new Date(syncedTime);
    utcTime.setMinutes(utcTime.getMinutes() + utcTime.getTimezoneOffset());
  
    // Convert to IST (Indian Standard Time)
    const istTime = new Date(utcTime.getTime() + (330 * 60000));
  
    // Format the IST time as a string
    const [istDate, istTimeOfDay] = istTime.toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit"
    }).split(', ');
    istTimeString = `Date: ${istDate}\n Time: ${istTimeOfDay}`
    }

  useEffect(() => {
    
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <View>
          <Text>Please Wait</Text>
        </View>
      ) : (
        <>
          <Text style={styles.welcomeText}>Welcome {currentUser?.first_name || currentUser?.email}</Text>
          <Text style={styles.welcomeText}>Updated Till {currentUser?.last_synced}</Text>
          <View style={styles.content}>
            <DialerScreen />
          </View>
        </>
      )}
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
