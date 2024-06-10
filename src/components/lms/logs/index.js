import React, {useEffect, useState} from 'react';
import {getLogs, groupAndReturn, formatTimeDifference} from '../lib/callLogs';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {FlashList} from '@shopify/flash-list';
import Ionicon from 'react-native-vector-icons/Ionicons';
import Feather from 'react-native-vector-icons/Feather';


import UserAvatar from 'react-native-user-avatar';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import SyncLogs from '../lib/SyncLogs';

const Logs = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const logsData = await getLogs({
          n: -1,
          filter: {minTimestamp: Date.now() - 24 * 3600 * 1000 * 5},
        });
        const groupedData = groupAndReturn(logsData);
        const updatedItems = groupedData.map(item => {
          const formattedTimeDifference = formatTimeDifference(item.timestamp);
          return {...item, timeDifference: formattedTimeDifference};
        });
        setData(updatedItems);
        setIsLoading(false);
        console.log("loaded");
      } catch (error) {
        // console.error("Error fetching call logs:", error);
        setIsLoading(false);
      }
      await SyncLogs();
    };

    fetchData();
  }, []);

  const navigateToContacts = () => {
    navigation.navigate('LogsContactsList');
  };

  const goToDailer = () => {
    navigation.navigate('LogsContactsList', {openDailer: true});
  };

  const call = number => {
    const cleanedNum = number.replace(/\s/g, '');
    const dialableNum = cleanedNum.slice(
      cleanedNum?.length - 10,
      cleanedNum?.length,
    );
    RNImmediatePhoneCall.immediatePhoneCall('+91' + dialableNum);
  };

  const renderItem = ({item}) => (
    <View style={styles.contactItem}>
      <View>
        <View>
          <View style={styles.contactInfo}>
            <UserAvatar
              name={item.name || item.phoneNumber}
              style={styles.avatar}
            />
            <View>
              <Text style={styles.contactName}>
                {item.name || item.phoneNumber}
              </Text>
              <Text style={styles.contactNumber}>
                <Feather
                  name={item.type == "INCOMING" ? "arrow-down-left": "arrow-up-right"}
                  size={20}
                  color="#aaa"
                  style={{padding:15}}
                />
                {item.timeDifference}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          onPress={() => {
            call(item.phoneNumber);
          }}>
          <Ionicon
            name="call-outline"
            size={24}
            color="#ff9933"
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  // const renderLogItem = ({item}) => (
  //   <View style={styles.logItem}>
  //     <Text style={styles.logName}>{item.name}</Text>
  //     <Text style={styles.logNumber}>{item.phoneNumber}</Text>
  //     <Text style={styles.logDateTime}>{item.dateTime}</Text>
  //     <Text style={styles.logType}>{item.type}</Text>
  //     <Text style={styles.logDuration}>Duration: {item.duration} seconds</Text>
  //   </View>
  // );

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0366d6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={navigateToContacts}
        style={styles.searchButton}>
        <View style={styles.searchButtonText}>
          <Text>
            <Ionicon name="search" size={24} color="#232323"></Ionicon>
          </Text>
          <Text style={{flex: 1, marginLeft: 20, marginTop: 2}}>
            {' '}
            Search contacts by name and phone
          </Text>
        </View>
      </TouchableOpacity>

      {data.length > 0 ? (
        <FlashList
          data={data}
          renderItem={renderItem}
          estimatedItemSize={200}
        />
      ) : (
        <Text>No call logs available</Text>
      )}

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => goToDailer()}>
        <Text style={styles.buttonText}>
          <Ionicon
            name="keypad"
            size={30}
            color="#fff"
            style={styles.backIcon}
          />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  logItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 4,
  },
  logName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  logNumber: {
    fontSize: 16,
    color: '#666',
  },
  logDateTime: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  logType: {
    fontSize: 16,
    color: '#0366d6', // Use color based on call type
    marginTop: 8,
  },
  logDuration: {
    fontSize: 14,
    color: '#888',
    marginTop: 4,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  searchButton: {
    backgroundColor: '#fff',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  searchButtonText: {
    color: '#232323',
    fontSize: 16,
    display: 'flex',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF9933',
    padding: 15,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24, // Half of the width and height for a circular shape
    marginRight: 12,
  },
  contactItem: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactNumber: {
    fontSize: 16,
    color: '#666',
  },
});

export default Logs;
