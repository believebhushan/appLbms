
import CallLogs from 'react-native-call-log';
import { getData,storeData } from '../store/storageUtil';
import groupedcalls from '../components/features/CallList/utils/groupedCalls';
import createLogsInRealms from '../db/createLogs';
import { getAllLogs } from '../db/Database';

const defaultFilters = {
    limit: -1,
    other: {
        minTimestamp: null,
        maxTimestamp: null,
        phoneNumbers: "",
        types: []
    }
}

const getLogsFromRealm = async ({filters: defaultFilters})=>{
    const now = new Date();
    const CALL_LIST_UPDATED_TILL = "call_list_realms_synced_at";
    let lastUpdatedTill = await getData(CALL_LIST_UPDATED_TILL);
    if(lastUpdatedTill==""){
      let data = await CallLogs.load(20);
      createLogsInRealms([...data]);
      const groupedDetails = groupedcalls({data: getAllLogs()});

      await storeData(CALL_LIST_UPDATED_TILL,`${now.getTime()}`);

      return groupedDetails;
    }
    else{
        const lastUpdatedTillTimeStamp = parseInt(lastUpdatedTill);
        let data = await CallLogs.load(-1,{minTimestamp:lastUpdatedTillTimeStamp+1});
        createLogsInRealms([...data]);
        const updatedOne = getAllLogs();
        const groupedcallsNew = groupedcalls({data: updatedOne})
        await storeData(CALL_LIST_UPDATED_TILL,`${now.getTime()}`);

        return groupedcallsNew;
    }
}

export default getLogsFromRealm;
