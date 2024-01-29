import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import Ionicon from 'react-native-vector-icons/Ionicons';


const Dialer = ({ setSearchQuery =()=>{}, searchQuery }) => {

  const handleType = (value) => {
    setSearchQuery(`${value}`);
  };

  const call = number => {
    const cleanedNum = number.replace(/\s/g, '');
    let  dialableNum = ''
    if (cleanedNum.length >= 10){
        dialableNum = cleanedNum.slice(
            cleanedNum?.length - 10,
            cleanedNum?.length,
          );
          dialableNum = `+91${dialableNum}`

    }
    else{
        dialableNum = cleanedNum;
    }
    RNImmediatePhoneCall.immediatePhoneCall(dialableNum);
  };


  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.phoneNumberInput}
          value={searchQuery}
          onChangeText={handleType}
          placeholder="Enter phone number"
          keyboardType="phone-pad"
          autoFocus={true}
        />
      </View>

      <TouchableOpacity onPress={()=>{call(searchQuery)}} style={styles.callButton}>
        <Text style={styles.buttonText}>
        <Ionicon
            name="call"
            size={30}
            color="green"
            style={styles.backIcon}
          />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  phoneNumberInput: {
    flex: 1,
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
  },
  backspaceButton: {
    padding: 10,
    marginLeft: 10,
  },
  keypadContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  dialButton: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 40,
    height: 40,
    margin: 10,
    borderRadius: 40,
    backgroundColor: '#0366d6',
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
  },
  callButton: {
    padding: 5,
    borderRadius: 8,
  },
});

export default Dialer;
