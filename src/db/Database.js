import Realm from "realm";

// Declare Schema
class CallLogSchema extends Realm.Object {}
CallLogSchema.schema = {
    name: 'CallLog',
    properties: {
        name: 'string',
        phoneNumber:  'string',
        duration: 'int?',
        timestamp: 'int?',
        type: 'string',
    }
};

// Create realm
let realm = new Realm({schema: [CallLogSchema], schemaVersion: 1});

// for(let i = 0; i < 3; i++){
//     realm.write(() => {
//       const log = realm.create('CallLog', {
//         name: 'Bhai' + i,
//         phoneNumber:  `${i}`,
//         duration: i,
//         timestamp: new Date().getTime(),
//         type:'INCOMING'
//       });
//     });
// }

let getAllLogs = () => {
    return realm.objects('CallLog');
}

let deleteAllLogs = () => {
    realm.write(() => {
        realm.delete(getAllLogs());
    })
}



export {
    getAllLogs,
    deleteAllLogs
}

// Export the realm
export default realm;