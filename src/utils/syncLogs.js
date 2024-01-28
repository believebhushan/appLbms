import CallLogs from 'react-native-call-log';
import { getData,storeData } from '../store/storageUtil';
// import ReactNativeForegroundService from '@supersami/rn-foreground-service';
import displayNotification from '../helpers/notifications/sendNotifications';
import notifee from '@notifee/react-native';
import checker from '../components/features/Permission/checker';



const syncLogs = async (fromEvent)=>{
    const hasGranted = await checker();
    if(!hasGranted){
        return;
    }
    const notificationId = 'appLBLMSSYNCING'
    try {
        await displayNotification({title: 'Syncing..',body: `At ${new Date()}`,id:notificationId},);
    } catch (error) {
        
    }
    let hasProcessed = false;
    
    const userDetails = await getData("userDetails");
    const lastSynced = await getData("lastSynced");
    
    if(!userDetails?.user?.id){
        return;
    }
    
    let updatedTill = new Date(lastSynced);
    if(!updatedTill){
        updatedTill = new Date();
        updatedTill.setHours(updatedTill.getHours()-20);
    }


    try{
        let c = []
        if(updatedTill){
             c = await CallLogs.load(-1,{minTimestamp: updatedTill.getTime()+1});
        }else{
            c = await CallLogs.loadAll();
        }

        const payload = {email: userDetails.user.email, id: userDetails.user.id};
        const logs = [];
        (c || []).forEach(element => {
            const timestamp = parseInt(element["timestamp"]);
            const startTime = new Date(timestamp);
            const duration = element["duration"];
            const endTime = new Date(timestamp+duration)
            logs.push({
                name: element['name'],
                duration: duration,
                start_time: startTime,
                end_time: endTime,
                number: element["phoneNumber"],
                call_type: element["type"]
            })
        });
        payload.logs = logs;
        // console.log(c.length,"here");

        // console.log(userDetails.user.email,payload,"nbmbnm");
        if(logs.length == 0){
            return;
        }



        const response = await fetch('https://lbms-ajua.onrender.com/call_logs/sync_logs', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          });
          const data = await response.json();
          if(data?.data?.id){
            // console.log("found",data?.data.id,data)
            await storeData("lastSynced",data.data.last_synced);
            if(fromEvent){
                // ReactNativeForegroundService.stopAll();
            }
          }
          hasProcessed = true;
    }
    catch(err){
        // console.log(err,"error updateCallLogs.. .");
        hasProcessed = true;
    }
    if(hasProcessed){
        try {
            await notifee.cancelNotification(notificationId);
        } catch (error) {
            
        }
    }
}

export default syncLogs;