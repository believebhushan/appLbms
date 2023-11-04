import CallLogs from 'react-native-call-log';
import { getData } from '../store/storageUtil';
const updateCallLogs = async ()=>{
    const userDetails = await getData("userDetails");
    console.log(userDetails,"userDetails");
    if(!userDetails?.user?.id){
        return;
    }

    let updatedTill = userDetails?.user?.synced_logs_till;
    if(!updatedTill){
        updatedTill = new Date();
        updatedTill.setHours(updatedTill.getHours()-20);
    }
    console.log("strated updateCallLogs bjvjv",updatedTill.getTime())


    try{
        CallLogs.load(-1,{minTimestamp: updatedTill.getTime()}).then(async c => {
            const payload = {email: userDetails.user.email, id: userDetails.user.id};
            const logs = [];
            (c || []).forEach(element => {
                logs.push({
                    name: element['name'],
                    duration: element['duration'],
                    at: element['dateTime']
                })
            });
            payload.logs = logs;
            // console.log(userDetails.user.email,payload,"nbmbnm");
            if(logs.length == 0){
                return;
            }

            const response = await fetch('https://lbms-ajua.onrender.com/call_logs/update_details', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
              });
        });
    }
    catch(err){
        console.log(err,"error updateCallLogs.. .")
    }
}

export default updateCallLogs;