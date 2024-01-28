import React, {useEffect, useState} from 'react';
import {getLogs} from '../lib/callLogs';
import {
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FlashList } from '@shopify/flash-list';

const Logs = () => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const logsData = await getLogs({
          n: -1,
          filter: {minTimestamp: Date.now() - 24 * 3600 * 1000},
        });
        setData(logsData);
        setIsLoading(false);
      } catch (error) {
        // console.error("Error fetching call logs:", error);
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  const navigateToContacts = () => {
    // Navigation logic to the Contacts screen
    navigation.navigate('LogsContactsList');
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
      <TouchableOpacity onPress={navigateToContacts} style={styles.searchButton}>
        <Text style={styles.searchButtonText}>Search People</Text>
      </TouchableOpacity>
      {data.length > 0 ? (
        <FlashList
          data={data}
          renderItem={renderLogItem}
          estimatedItemSize={200}        />
      ) : (
        <Text>No call logs available</Text>
      )}
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
    backgroundColor: "#0366d6",
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
  },
});

export default Logs;
