import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

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
      <MaterialCommunityIcons
        name="call-missed"
        size={28}
        color="red"
      />
    </Text>
  );
};

const TYPES = {
    INCOMING: "INCOMING",
    MISSED: "MISSED",
    OUTGOING: "OUTGOING"
}




const CallDetails = ({data}) => (
  <View style={styles.card}>
    <Text>
      {data.name || data.phoneNumber}
    </Text>
    <Text>
        {data.lastCall.type == TYPES.INCOMING && <Incoming></Incoming>}
        {data.lastCall.type == TYPES.OUTGOING && <Outgoing></Outgoing>}
        {data.lastCall.type == TYPES.MISSED && <Missed></Missed>}
      <Text>{parseTime(parseInt(data.lastCall.timestamp))}</Text>
    </Text>
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
  },
});

export default CallDetails;
