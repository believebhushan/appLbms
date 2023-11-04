import CallLogs from 'react-native-call-log';
import { getData } from '../store/storageUtil';
const getAndUpdateRecentCall = async ()=>{
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
    console.log("started syincing recenr calls",updatedTill.getTime());


    try{
        CallLogs.load(10).then(async c => {
            const payload = {email: userDetails.user.email, id: userDetails.user.id};
            const logs = c;
            payload.logs = logs;
            // console.log(userDetails.user.email,payload,"nbmbnm");
            if(logs.length == 0){
                return;
            }

            // const response = await fetch('https://lbms-ajua.onrender.com/call_logs/update_details', {
            //     method: 'POST',
            //     headers: {
            //       'Content-Type': 'application/json',
            //     },
            //     body: JSON.stringify(payload),
            //   });
            console.log(payload,"payLoad");
        });
    }
    catch(err){
        console.log(err,"error.. .")
    }
}

export default getAndUpdateRecentCall;