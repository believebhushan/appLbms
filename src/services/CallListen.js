import CallDetectorManager from 'react-native-call-detection';
import syncLogs from '../utils/syncLogs';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import { ToastAndroid } from 'react-native';



const syncInit =()=>{

  ReactNativeForegroundService.start({
    id: 1244,
    title: "Syncing Logs...",
    message: "If you find this notification means its working fine.",
    icon: "ic_launcher",
    setOnlyAlertOnce: true,
    color: "#000000",
  });

  ReactNativeForegroundService.add_task(() => syncLogs(true), {
    delay: 1000,
    onLoop: false,
    taskId: `${new Date().getTime()}`,
    onError: (e) => console.log(`Error logging: `, e),
  });
}

const startService = ()=>{
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
             syncInit();
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
