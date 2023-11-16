
import React, { useEffect } from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import MainAppScreen from "./features/Home/MainAppScreen";
import CallList from "./features/CallList";
import CallAnalyse from "./features/CallAnalyse";
import ContactList from "./features/Contacts";
import LbmsTabBar from "./navigation/LbmsTabBar";
import backgroundSync from "../services/backgroundSync";

const Tab = createBottomTabNavigator();

const Dashboard=()=>{

    useEffect(()=>{
        backgroundSync();
    },[])
    return(
            <Tab.Navigator initialRouteName='CallList' tabBar={props => <LbmsTabBar {...props} />}>
                <Tab.Screen name="Home" component={MainAppScreen} options={{headerShown:true, headerTitle:'Dashboard'}} />
                <Tab.Screen name="CallList" component={CallList} />
                {/* <Tab.Screen name="Messages" component={CallAnalyse} /> */}
                <Tab.Screen name="ContactDetails" component={ContactList} />
            </Tab.Navigator>
    )
}
export default Dashboard;