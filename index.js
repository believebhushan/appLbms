/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import initProcess from './src/services/BackgroundTask';
import displayNotification from './src/helpers/notifications/sendNotifications';
import startService from './src/services/CallListen'
import updateCallLogs from './src/utils/getCallLogs';
// import BackgroundTimer from 'react-native-background-timer';
import ReactNativeForegroundService from "@supersami/rn-foreground-service";
import syncLogs from './src/utils/syncLogs';


AppRegistry.registerComponent(appName, () => App);
ReactNativeForegroundService.register();

ReactNativeForegroundService.start({
  id: 1244,
  title: "SYncing Calls",
  message: "If you see it we are working fpr you..",
  icon: "ic_launcher",
  buttonOnPress: "cray",
  setOnlyAlertOnce: true,
  color: "#000000",
});

const update = async ()=>{
  await syncLogs();
}

ReactNativeForegroundService.add_task(() => update(), {
  delay: 10000*30,
  onLoop: true, //make it true
  taskId: `${new Date().getTime()}`,
  onError: (e) => console.log(`Error logging:`, e),
});

startService();

// initProcess();


// BackgroundTimer.runBackgroundTimer(() => { 
//     // updateCallLogs();    
// }, 1000*20);

 

