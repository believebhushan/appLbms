import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';


const DialerScreen = () => {
  const [dialedNumber, setDialedNumber] = useState('');

  const handleDial = (number) => {
    setDialedNumber((prev) => prev + number);
  };

  const handleClear = () => {
    const newNumber = dialedNumber.slice(0, -1);
    setDialedNumber(newNumber);
  };

  const startCall=()=>{
   try {
    if(dialedNumber.length == 10){
      RNImmediatePhoneCall.immediatePhoneCall('+91'+dialedNumber)
    }
    else{
      RNImmediatePhoneCall.immediatePhoneCall(dialedNumber)
    }
   } catch (error) {
     Alert(`${error}`)
   }
  }

  return (
    <View style={styles.container}>
      <View style={styles.dialerGrid}>
        <View style={styles.dialerRow}>
          <View style={styles.dialedNumberContainer}>
            <Text style={styles.dialedNumberText}>{dialedNumber}</Text>
          </View>
          <TouchableOpacity style={styles.clearButton} onPress={handleClear}>
            <Text style={styles.clearButtonText}>X</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.dialerRow}>
          <DialerButton number="1" onPress={() => handleDial('1')} />
          <DialerButton number="2" onPress={() => handleDial('2')} />
          <DialerButton number="3" onPress={() => handleDial('3')} />
        </View>
        <View style={styles.dialerRow}>
          <DialerButton number="4" onPress={() => handleDial('4')} />
          <DialerButton number="5" onPress={() => handleDial('5')} />
          <DialerButton number="6" onPress={() => handleDial('6')} />
        </View>
        <View style={styles.dialerRow}>
          <DialerButton number="7" onPress={() => handleDial('7')} />
          <DialerButton number="8" onPress={() => handleDial('8')} />
          <DialerButton number="9" onPress={() => handleDial('9')} />
        </View>
        <View style={styles.dialerRow}>
          <DialerButton number="*" onPress={() => handleDial('*')} />
          <DialerButton number="0" onPress={() => handleDial('0')} />
          <DialerButton number="#" onPress={() => handleDial('#')} />
        </View>
      </View>
      <TouchableOpacity style={styles.callButton} onPress={startCall}>
        <Text style={styles.callButtonText}>Call</Text>
      </TouchableOpacity>
    </View>
  );
};

const DialerButton = ({ number, onPress }) => {
  return (
    <TouchableOpacity style={styles.dialerButton} onPress={onPress}>
      <Text style={styles.dialerButtonText}>{number}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    position: 'absolute',
    width: '90%',
    paddingBottom: 20,
  },
  dialedNumberContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  dialedNumberText: {
    fontSize: 24,
  },
  dialerGrid: {
    width: '100%',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    padding: 10,
  },
  dialerRow: {
    width: '100%',
    height: 'fit-content',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
  },
  dialerButton: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 25,
  },
  dialerButtonText: {
    fontSize: 20,
  },
  clearButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#111',
    borderRadius: 10,
  },
  clearButtonText: {
    fontSize: 18,
    color: 'white',
  },
  callButton: {
    marginTop:10,
    width: 100,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'green',
    borderRadius: 10,
  },
  callButtonText: {
    fontSize: 18,
    color: 'white',
  },
});

export default DialerScreen;
