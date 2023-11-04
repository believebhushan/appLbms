/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import initProcess from './src/services/BackgroundTask';
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
// import displayNotification from './src/helpers/notifications/sendNotifications';
import startService from './src/services/CallListen'
import updateCallLogs from './src/utils/getCallLogs';
// import BackgroundTimer from 'react-native-background-timer';

AppRegistry.registerComponent(appName, () => App);
// ReactNativeForegroundService.register();

// ReactNativeForegroundService.start({
//   id: 1244,
//   title: "Foreground Service",
//   message: "We are live World",
//   icon: "ic_launcher",
//   button: true,
//   button2: true,
//   buttonText: "Button",
//   button2Text: "Anther Button",
//   buttonOnPress: "cray",
//   setOnlyAlertOnce: true,
//   color: "#000000",
//   progress: {
//     max: 100,
//     curr: 50,
//   },
// });

// const update = async ()=>{
//   console.log(new Date());
//   await updateCallLogs();
// }

// ReactNativeForegroundService.add_task(() => update(), {
//   delay: 10000*60,
//   onLoop: true, //make it true
//   taskId: "taskid",
//   onError: (e) => console.log(`Error logging:`, e),
// });

startService();

// initProcess();


// BackgroundTimer.runBackgroundTimer(() => { 
//     // updateCallLogs();    
// }, 1000*20);


 

