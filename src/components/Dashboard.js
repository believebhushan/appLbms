
import React from "react";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import LbmsTabBar from "./navigation/LbmsTabBar";
import Courses from "./lms/courses";
import Notices from "./lms/notifications";
import Profile from "./lms/profile";
import HomeStack from "./lms/stacks/HomeStack";
import LogsStack from "./lms/stacks/LogsStack";

const Tab = createBottomTabNavigator();


const options =
{
    headerShown: false
}
const Dashboard=()=>{
    return(
            <Tab.Navigator initialRouteName='Logs' tabBar={props => <LbmsTabBar {...props} />}>
               <Tab.Screen name="Logs" component={LogsStack}options={options} />
                <Tab.Screen name="Home" component={HomeStack} options={options} />
                <Tab.Screen name="Courses" component={Courses} options={options}/>
                <Tab.Screen name="Notifications" component={Notices} options={options}/>
                <Tab.Screen name="Profile" component={Profile}options={options} />
            </Tab.Navigator>
    )
}
export default Dashboard;