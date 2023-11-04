
import CallLogs from 'react-native-call-log';

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
    const today = new Date();
    today.setHours(today.getHours()-10)
    const data = await CallLogs.loadAll()
    return data;
}

export default getCalls;
