import React, {useEffect, useState} from 'react';
import {getLogs, groupAndReturn} from '../lib/callLogs';
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

const Logs = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const logsData = await getLogs({
          n: -1,
          filter: {minTimestamp: Date.now() - 24 * 3600 * 1000*30},
        });
        const groupedData = groupAndReturn(logsData);
        setData(groupedData);
        setIsLoading(false);
      } catch (error) {
        // console.error("Error fetching call logs:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigateToContacts = () => {
    navigation.navigate('LogsContactsList');
  };

  const goToDailer = () => {
    navigation.navigate('LogsContactsList', {openDailer: true});
  };

  const renderLogItem = ({item}) => (
    <View style={styles.logItem}>
      <Text style={styles.logName}>{item.name}</Text>
      <Text style={styles.logNumber}>{item.phoneNumber}</Text>
      <Text style={styles.logDateTime}>{item.dateTime}</Text>
      <Text style={styles.logType}>{item.type}</Text>
      <Text style={styles.logDuration}>Duration: {item.duration} seconds</Text>
    </View>
  );

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
          <Text><Ionicon name="search" size={24} color="#232323"></Ionicon></Text>
          <Text style={{flex:1,marginLeft: 20,marginTop: 2}}> Search contacts by name and phone</Text>
        </View>
      </TouchableOpacity>
      {data.length > 0 ? (
        <FlashList
          data={data}
          renderItem={renderLogItem}
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
  },
  logItem: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
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
    justifyContent:'center',
    flexDirection: 'row'
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: 'blue',
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
});

export default Logs;
