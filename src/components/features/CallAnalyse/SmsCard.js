import React from "react";
import { Text, View } from "react-native";

const SmsCard = ({data})=>{

    return(
        <View style={{backgroundColor: 'white', marginBottom: 20,padding: 10}}> 
         <Text>
            {data?.address}
        </Text>
        <Text>
        {data?.body}
        </Text>
        </View>
      
    )
}
export default SmsCard;