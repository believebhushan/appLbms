import CallDetectorManager from 'react-native-call-detection';
import { ToastAndroid } from 'react-native';
import checker from '../components/features/Permission/checker';
import backgroundSync from './backgroundSync';

const startService = async ()=>{
   const isGranted = await checker();
   if(!isGranted){
    return;
   }
    let callDetector = new CallDetectorManager(
        async (event, number) => {
          console.log('event -> ', event + (number ? ' - ' + number : ''));
          ToastAndroid.showWithGravityAndOffset(
            'A wild toast appeared! '+event + (number ? ' - ' + number : ''),
            ToastAndroid.LONG,
            ToastAndroid.BOTTOM,
            25,
            50,
          );

          // For iOS event will be either "Connected",
          // "Disconnected","Dialing" and "Incoming"
      
          // For Android event will be either "Offhook",
          // "Disconnected", "Incoming" or "Missed"
          // phoneNumber should store caller/called number
          

          if (event === 'Disconnected') {
            backgroundSync();
          } else if (event === 'Connected') {
              // Do something call got connected
              // This clause will only be executed for iOS
          } else if (event === 'Incoming') {
              // Do something call got incoming
          } else if (event === 'Dialing') {
              // Do something call got dialing
              // This clause will only be executed for iOS
          } else if (event === 'Offhook') {
              //Device call state: Off-hook.
              // At least one call exists that is dialing,
              // active, or on hold,
              // and no calls are ringing or waiting.
              // This clause will only be executed for Android
          } else if (event === 'Missed') {
              // Do something call got missed
              // This clause will only be executed for Android
          }
        },
        true, // To read the phone number of the incoming call [ANDROID]
        () => {
          // If permission got denied [ANDROID]
          // Only If you want to read incoming number
          // Default: console.error
          console.log('Permission Denied by User');
        },
        {
          title: 'Phone State Permission',
          message:'This app needs access to your phone state',
        }
      );
      return callDetector;
}


export default startService;
