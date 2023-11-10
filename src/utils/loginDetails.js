import { setUserAuth } from "../actions/authActions";
import store from "../store/configureStore";
import { storeData } from "../store/storageUtil";


const loginUser =async (user)=>{
    console.log("Meeeeee");
    const CALL_LIST_UPDATED_TILL = "call_list_updated_till";

    await storeData('userDetails', {user: user});
    await storeData('lastSynced', user.last_synced);
    await storeData(CALL_LIST_UPDATED_TILL,"");
    store.dispatch(setUserAuth(user));
}

const logoutUser =(user)=>{

}

export default loginUser;