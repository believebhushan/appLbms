/**
 * @format
 */

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import startService from './src/services/CallListen'
import ReactNativeForegroundService from "@supersami/rn-foreground-service";


AppRegistry.registerComponent(appName, () => App);
ReactNativeForegroundService.register();
startService();


// ReactNativeForegroundService.start({
//   id: 1244,
//   title: "SYncing Calls",
//   message: "If you see it we are working fpr you..",
//   icon: "ic_launcher",
//   buttonOnPress: "cray",
//   setOnlyAlertOnce: true,
//   color: "#000000",
// });

// const update = async ()=>{
//   await syncLogs();
// }

// ReactNativeForegroundService.add_task(() => update(), {
//   delay: 10000*30,
//   onLoop: true, //make it true
//   taskId: `${new Date().getTime()}`,
//   onError: (e) => console.log(`Error logging:`, e),
// });


// initProcess();


// BackgroundTimer.runBackgroundTimer(() => { 
//     // updateCallLogs();    
// }, 1000*20);

 

