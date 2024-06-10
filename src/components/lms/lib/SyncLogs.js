import { getData,storeData } from '../../../store/storageUtil';
import { load } from './callLogs';



const SyncLogs = async ()=>{
    const userDetails = await getData("userDetails");
    const lastSynced = await getData("lastSynced");
    console.log(lastSynced,"lastSynced");
    
    if(!userDetails?.user?.id){
        return;
    }
    
    let updatedTill = new Date(lastSynced);
    if(!updatedTill){
        updatedTill = new Date();
        updatedTill.setHours(updatedTill.getHours()-10);
    }

    try{
        let c = []
        if(updatedTill){
             c = await load(-1,{minTimestamp: updatedTill.getTime()+1});
        }else{
            c = await load();
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
        console.log(c.length,"here");
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
          console.log(payload.logs.length,"payload");
          const data = await response.json();
          if(data?.data?.id){
            console.log("found",data?.data.id,data)
            await storeData("lastSynced",data.data.last_synced);
          }
    }
    catch(err){
        console.log(err,"error updateCallLogs.. .");
    }
}

export default SyncLogs;