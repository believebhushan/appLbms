import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';


const Dialer = ({setSearchQuery = () => {}, searchQuery}) => {
  const handleKeyPress = key => {
    setSearchQuery(`${searchQuery || ''}${key}`);
  };

  const call = number => {
    const cleanedNum = number.replace(/\s/g, '');
    let dialableNum = '';
    if (cleanedNum.length >= 10) {
      dialableNum = cleanedNum.slice(
        cleanedNum?.length - 10,
        cleanedNum?.length,
      );
      dialableNum = `+91${dialableNum}`;
    } else {
      dialableNum = cleanedNum;
    }
    RNImmediatePhoneCall.immediatePhoneCall(dialableNum);
  };

  return (
    <View style={styles.container}>
      <View style={styles.display}>
        <TouchableOpacity
          onPress={() => {
            setSearchQuery((searchQuery || '').slice(0, -1));
          }}
          onLongPress={() => {
            setSearchQuery('');
          }}
          style={styles.crossButton}>
          <Feather
            name="delete"
            size={24}
            color="#232323"
            style={styles.backIcon}
          />
        </TouchableOpacity>
        <Text style={styles.phoneNumber}>{searchQuery}</Text>
      </View>

      <View style={styles.keypad}>
        <View style={styles.row}>
          {[1, 2, 3].map(key => (
            <TouchableOpacity
              key={key}
              style={styles.key}
              onPress={() => handleKeyPress(key.toString())}>
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.row}>
          {[4, 5, 6].map(key => (
            <TouchableOpacity
              key={key}
              style={styles.key}
              onPress={() => handleKeyPress(key.toString())}>
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.row}>
          {[7, 8, 9].map(key => (
            <TouchableOpacity
              key={key}
              style={styles.key}
              onPress={() => handleKeyPress(key.toString())}>
              <Text style={styles.keyText}>{key}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.key}
            onPress={() => handleKeyPress('*')}>
            <Text style={styles.keyText}>*</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.key}
            onPress={() => handleKeyPress('0')}>
            <Text style={styles.keyText}>0</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.key}
            onPress={() => handleKeyPress('#')}>
            <Text style={styles.keyText}>#</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.row}>
          <TouchableOpacity
            style={styles.callButton}
            onPress={() => {
              call(searchQuery);
            }}>
            <Text style={styles.callButtonText}>
              <Ionicon name="call-outline" size={24} color="#fff" />
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f2efeb',
  },
  display: {
    marginBottom: 10,
    width: '90%',
    borderRadius: 8,
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row-reverse',
    marginTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  phoneNumber: {
    fontSize: 18,
    padding: 10,
  },
  crossButton: {
    padding: 10,
  },
  keypad: {},
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  key: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    width: '30%',
    fontWeight: '1000',
  },
  keyText: {
    fontSize: 20,
  },
  deleteButton: {
    backgroundColor: '#ff5555',
    padding: 20,
    borderRadius: 8,
    alignItems: 'center',
    width: '30%',
  },
  deleteButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  callButton: {
    backgroundColor: '#FF9933',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
    width: '30%',
  },
  callButtonText: {
    fontSize: 14,
    color: '#fff',
  },
});
export default Dialer;
