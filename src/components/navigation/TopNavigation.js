import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';



const TopNavigation = ({navigation,route,back,options}) => {

    const handleNav=({name})=>{
      console.log(route,"route");
      // navigation.replace(name);
    }
  return (
    <View style={styles.container}>
      <View style={styles.navigation}>
        <TouchableOpacity style={styles.navOption} onPress={()=>{handleNav({name: "ContactDetails"})}}>
        <AntDesignIcon name="contacts" size={28} color={route?.name =="ContactDetails" ? "blue": "#000"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navOption} onPress={()=>{handleNav({name: "CallList"})}}>
        <Ionicon name="call-outline" size={28} color={route?.name =="CallList" ? "blue": "#000"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navOption} onPress={()=>{handleNav({name: "CallAnalyse"})}}>
        <Ionicon name="analytics" size={28} color={route?.name =="CallAnalyse" ? "blue": "#000"} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.navOption} onPress={()=>{handleNav({name: "MainApp"})}}>
        <AntDesignIcon name="message1" size={28} color={route?.name =="MainApp" ? "blue": "#000"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    overflow: 'scroll'
  },
  title: {
    color: 'blue',
    fontSize: 20,
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  navOption: {
    padding: 10,
  },
});

export default TopNavigation;
