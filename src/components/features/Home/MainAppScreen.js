import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, TouchableOpacity,PermissionsAndroid, Button} from 'react-native';
import {useSelector} from 'react-redux';
import {request, PERMISSIONS,RESULTS, check} from 'react-native-permissions';

import Card from '../../Card';
import syncLogs from '../../../utils/syncLogs';

const requestPermission = async (permission) => {
  const isAlreadyGranted = await check(permission);
  console.log(isAlreadyGranted,"isAlreadyGranted");
   if (isAlreadyGranted == RESULTS.GRANTED){
    return true;
   }
  let isGranted = false;
  try {
    request(permission).then((result) => {
      console.log(result, "result");
    });
  } catch (err) {
    console.warn(err);
  }
  return isGranted;
};

const MainAppScreen = ({navigation}) => {
  const [loading, setLoading] = useState(true);
  const currentUser = useSelector(state => state.auth.user);

  useEffect(() => {
    const doFunc = async () => {
      await syncLogs();
      setLoading(false);
    };
  
    const startD = async () => {
      const isGranted = await requestPermission(PERMISSIONS.ANDROID.READ_CALL_LOG);
        if(isGranted){
          doFunc();
        };
    };
  
    startD();
  }, []);
  

  const handleCardPress = item => {
    // console.log(item, 'clicked gh');
    // navigation.navigate('CardDetails', {data: item});
  };


  return (
    <View>
      {loading ? (
        <View>
          <Text>Syncing Data.... Please Wait.....and Do not close</Text>
        </View>
      ) : (
        <Text>
        Welcome , {currentUser.email}
        </Text>
      )}
    </View>
  );
};

export default MainAppScreen;
