
import CallLogs from 'react-native-call-log'

const getLogs = async({n,filter})=>{
   const data =  await CallLogs.load(n || 20, {...filter});
   return data;
}
export {getLogs};