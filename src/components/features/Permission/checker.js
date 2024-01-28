
import {PERMISSIONS, RESULTS, check } from 'react-native-permissions';


const permissionToFetch = [
  // PERMISSIONS.ANDROID.CALL_PHONE,
  // PERMISSIONS.ANDROID.READ_CALL_LOG,
  // PERMISSIONS.ANDROID.READ_CONTACTS,
];

const checker = async ()=>{
    let allPermissionsGranted = true;
    for (const permission of permissionToFetch) {
      const isAlreadyGranted = await check(permission);
      if (isAlreadyGranted !== RESULTS.GRANTED) {
        allPermissionsGranted = false;
      }
    }
    return allPermissionsGranted;
}


export default checker;