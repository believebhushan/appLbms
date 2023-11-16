import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import RNImmediatePhoneCall from 'react-native-immediate-phone-call';

const Incoming = () => {
  return (
    <Text>
      <MaterialCommunityIcons
        name="arrow-bottom-left-thin"
        size={28}
        color="#bbb"
      />
    </Text>
  );
};

const Outgoing = () => {
  return (
    <Text>
      <MaterialCommunityIcons
        name="arrow-top-right-thin"
        size={28}
        color="#bbb"
      />
    </Text>
  );
};

const Missed = () => {
  return (
    <Text>
      <MaterialCommunityIcons name="arrow-top-right-thin" size={28} color="red" />
    </Text>
  );
};

const TYPES = {
  INCOMING: 'INCOMING',
  MISSED: 'MISSED',
  OUTGOING: 'OUTGOING',
};

const parseTime = timestamp => {
  const currentTime = new Date();
  const inputTime = new Date(timestamp);

  const timeDifference = currentTime - inputTime;
  const secondsAgo = timeDifference / 1000;
  const minutesAgo = secondsAgo / 60;
  const hoursAgo = minutesAgo / 60;
  const daysAgo = hoursAgo / 24;

  if (secondsAgo < 60) {
    return `Just now`;
  } else if (minutesAgo < 60) {
    return `${Math.floor(minutesAgo)} minutes`;
  } else if (hoursAgo < 24) {
    // Display HH:MM for today's calls
    const hours = inputTime.getHours();
    const minutes = inputTime.getMinutes();
    const hhmm = `${hours.toString().padStart(2, '0')}:${minutes
      .toString()
      .padStart(2, '0')}`;
    return hhmm;
  } else if (daysAgo < 2) {
    return 'Yesterday';
  } else if (daysAgo < 7) {
    // Display the day of the week (e.g., "Sun" for Sunday)
    const dayOfWeek = inputTime.toLocaleDateString('en-US', {weekday: 'short'});
    return dayOfWeek;
  } else if (daysAgo < 365) {
    // Display the date in "DD Month" format for recent calls
    const day = inputTime.getDate();
    const month = inputTime.toLocaleString('default', {month: 'short'});
    return `${day} ${month}`;
  } else if (currentTime.getFullYear() - inputTime.getFullYear() === 1) {
    // Display "last year" for timestamps from the previous year
    return 'Last year';
  } else {
    // Display the year (YYYY) for all other cases
    const year = inputTime.getFullYear();
    return year.toString();
  }
};

const CallCard = ({data}) => (
  <View style={styles.card}>
    <View style={{flex: 10}}>
      <Text>{data.name || data.phoneNumber}</Text>
      <Text>
        {data.lastCall.type == TYPES.INCOMING && <Incoming></Incoming>}
        {data.lastCall.type == TYPES.OUTGOING && <Outgoing></Outgoing>}
        {data.lastCall.type == TYPES.MISSED && <Missed></Missed>}
        <Text>{parseTime(parseInt(data.lastCall.timestamp))}{data.phoneNumber}</Text>
      </Text>
    </View>
    <TouchableOpacity
      style={{flex: 2}}
      onPress={() => RNImmediatePhoneCall.immediatePhoneCall('+91'+data.phoneNumber.slice(data?.phoneNumber?.length-10,data.phoneNumber?.length))}>
      <View>
        <Ionicon
          name="call"
          size={28}
        />
      </View>
    </TouchableOpacity>
  </View>
);

const styles = StyleSheet.create({
  card: {
    borderWidth: 1,
    borderColor: 'white',
    padding: 16,
    margin: 8,
    backgroundColor: 'white',
    borderRadius: 10,
    borderWidth: 5,
    display: 'flex',
    justifyContent: 'flex-start',
    flexDirection: 'row',
  },
});

export default CallCard;
