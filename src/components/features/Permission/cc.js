import React, { useEffect, useState } from "react";
import { View, Button, Alert } from 'react-native';
import { request, PERMISSIONS, RESULTS, check, openSettings } from 'react-native-permissions';

import {useNavigation} from '@react-navigation/native';

const permissionToFetch = [
    PERMISSIONS.ANDROID.CALL_PHONE,
    PERMISSIONS.ANDROID.READ_CALL_LOG,
    PERMISSIONS.ANDROID.READ_CONTACTS,
    PERMISSIONS.ANDROID.READ_PHONE_STATE,
    PERMISSIONS.ANDROID.READ_SMS,
    PERMISSIONS.ANDROID.SEND_SMS,
  ];


const PermissionScreen = () => {
  const [arePermissionsGranted, setArePermissionsGranted] = useState(false);
  const navigation = useNavigation();


  useEffect(() => {
    checkPermissions();
    if(arePermissionsGranted){
        navigateToOtherScreen();
    }
  }, [arePermissionsGranted]); // Empty dependency array to run only once on component mount

  const checkPermissions = async () => {
    let allPermissionsGranted = true;

    for (const permission of permissionToFetch) {
      const isAlreadyGranted = await check(permission);

      if (isAlreadyGranted !== RESULTS.GRANTED) {
        allPermissionsGranted = false;
        await requestPermission(permission);
      }
    }

    // console.log(allPermissionsGranted,"allPermissionsGranted");

    if (allPermissionsGranted) {
      setArePermissionsGranted(true);
    }
  };

  const requestPermission = async (permission) => {
    try {
      const result = await request(permission);

      if (result === RESULTS.GRANTED) {
        // console.log(`${permission} granted`);
      } else {
        // console.log(`${permission} not granted`);
        showPermissionAlert(permission);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const showPermissionAlert = (permission) => {
    Alert.alert(
      'Permission Required',
      `Please grant permission to access ${permission}`,
      [
        {
          text: 'Open Settings',
          onPress: () => openSettings().catch(() => console.warn('cannot open settings')),
        },
      ],
    );
  };

  const navigateToOtherScreen = () => {
    navigation.replace("Login");
  };

  return (
    <View>
      {/* Render your UI components here */}
    </View>
  );
};

export default PermissionScreen;
