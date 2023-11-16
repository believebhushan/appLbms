import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  Alert,
  StyleSheet,
} from 'react-native';
import {
  request,
  PERMISSIONS,
  RESULTS,
  check,
  openSettings,
} from 'react-native-permissions';

import {useNavigation} from '@react-navigation/native';
import IntroPage from './IntroPage';

const permissionToFetch = [
  PERMISSIONS.ANDROID.CALL_PHONE,
  PERMISSIONS.ANDROID.READ_CALL_LOG,
  PERMISSIONS.ANDROID.READ_CONTACTS,
];

// PERMISSIONS.ANDROID.READ_SMS,
// PERMISSIONS.ANDROID.SEND_SMS,
// PERMISSIONS.ANDROID.READ_PHONE_STATE comes auto eith call_phone


const PermissionScreen = () => {
  const [arePermissionsGranted, setArePermissionsGranted] = useState(false);
  const [permissionStatus, setPermissionStatus] = useState({});
  const [showIntro, setShowIntro] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    checkPermissions();
    checkAllGranted();
    if (arePermissionsGranted) {
      navigateToOtherScreen();
    }
  }, [JSON.stringify(permissionStatus), arePermissionsGranted]); // Empty dependency array to run only once on component mount

  const checkPermissions = async () => {
    let allPermissionsGranted = true;
    const status = {};

    for (const permission of permissionToFetch) {
      const isAlreadyGranted = await check(permission);
      status[permission] = isAlreadyGranted === RESULTS.GRANTED;

      if (isAlreadyGranted !== RESULTS.GRANTED) {
        allPermissionsGranted = false;
      }
    }

    setPermissionStatus(status);

    if (allPermissionsGranted) {
      setArePermissionsGranted(true);
    }
  };

  const checkAllGranted = () => {
    let isCompleted = true;
    permissionToFetch.forEach(permisson => {
      if (!permissionStatus?.[permisson]) {
        isCompleted = false;
      }
    });
    if (isCompleted) {
      setArePermissionsGranted(true);
    }
  };

  const requestPermission = async permission => {
    try {
      const result = await request(permission);

      if (result === RESULTS.GRANTED) {
        console.log(`${permission} granted`);
        // Update the status when permission is granted
        setPermissionStatus(prevStatus => ({
          ...prevStatus,
          [permission]: true,
        }));
      } else {
        console.log(`${permission} not granted`);
        showPermissionAlert(permission);
      }
    } catch (err) {
      console.warn(err);
    }
  };

  const showPermissionAlert = permission => {
    Alert.alert(
      'Permission Required',
      `Please grant permission to access ${permission}`,
      [
        {
          text: 'Open Settings',
          onPress: () =>
            openSettings().catch(() => console.warn('cannot open settings')),
        },
      ],
    );
  };

  const navigateToOtherScreen = () => {
    navigation.replace('Login');
  };

  return (
    <>
      {showIntro && <IntroPage setShowIntro = {setShowIntro}></IntroPage>}
      {!showIntro && (
        <View style={styles.container}>
          <Text style={{padding: 10, fontSize: 18}}>
            We need some permissions for working properly. Click on these to
            start
          </Text>
          <View style={styles.content}>
            {permissionToFetch.map((permission, index) => (
              <TouchableOpacity
                key={index}
                onPress={() => requestPermission(permission)}
                style={styles.permissionItem}>
                <View
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: 10,
                    backgroundColor: permissionStatus[permission]
                      ? 'green'
                      : 'red',
                    marginRight: 10,
                  }}
                />
                <Text style={styles.permissionText}>
                  {permission.split('.')[2].split('_').join(' ')}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.bottomButton}>
            <Button
              title="Next"
              onPress={navigateToOtherScreen}
              disabled={!arePermissionsGranted}
            />
          </View>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 20,
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  content: {
    flex: 1,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  permissionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    marginBottom: 20,
  },
  permissionText: {
    fontSize: 16,
    color: '#333',
  },
  bottomButton: {
    position: 'absolute',
    bottom: 16,
    left: 16,
    right: 16,
  },
});

export default PermissionScreen;
