
import syncLogs from '../utils/syncLogs';
import ReactNativeForegroundService from '@supersami/rn-foreground-service';

const backgroundSync =()=>{
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

export default backgroundSync;