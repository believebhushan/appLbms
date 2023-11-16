
import CallLogs from 'react-native-call-log';
import { getData,storeData } from '../store/storageUtil';
import groupedcalls from '../components/features/CallList/utils/groupedCalls';

const defaultFilters = {
    limit: -1,
    other: {
        minTimestamp: null,
        maxTimestamp: null,
        phoneNumbers: "",
        types: []
    }
}

const getCalls = async ({filters: defaultFilters})=>{
    const now = new Date();
    const CALL_LIST="call_list";
    const CALL_LIST_UPDATED_TILL = "call_list_updated_till";
    let lastUpdatedTill = await getData(CALL_LIST_UPDATED_TILL);
    console.log(lastUpdatedTill,"lastUpdatedTill");
    if(lastUpdatedTill==""){
      let data = await CallLogs.loadAll();
      const groupedDetails = groupedcalls({data: data});

      await storeData(CALL_LIST,groupedDetails);
      await storeData(CALL_LIST_UPDATED_TILL,`${now.getTime()}`);

      return groupedDetails;
    }
    else{
        const lastUpdatedTillTimeStamp = parseInt(lastUpdatedTill);
        let data = await CallLogs.load(-1,{minTimestamp:lastUpdatedTillTimeStamp+1});
        const currentDetails = await getData(CALL_LIST) || [];
        console.log(currentDetails.length,"vgh")
        let groupedDetailsNew = [];
        (currentDetails || []).forEach((ele)=>{
            groupedDetailsNew.push(ele);
        });
        (data || []).forEach(element => {
            let  lastCall = groupedDetailsNew.indexOf((grc)=>{
                return grc.phoneNumber === element.phoneNumber; 
            });
            if(lastCall == -1){
                groupedDetailsNew = [{name: element.name, totalDuration: 0, lastCall: element},...currentDetails]
            }
            else{
                groupedDetailsNew[lastCall].lastCall = element;
            }

        });
        await storeData(CALL_LIST,groupedDetailsNew);
        await storeData(CALL_LIST_UPDATED_TILL,`${now.getTime()}`);

        return groupedDetailsNew;
    }
}

export default getCalls;
