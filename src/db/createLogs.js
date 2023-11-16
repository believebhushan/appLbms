import realm from '../db/Database';


const createLogsInRealms = (logs)=>{
    (logs || []).forEach((c)=>{
        realm.write(() => {
            const log = realm.create('CallLog', {
              name: c.name,
              phoneNumber: c.phoneNumber,
              duration: c.duration,
              timestamp: parseInt(c.timestamp),
              type: c.type
            });
          });
    })
}

export default createLogsInRealms;