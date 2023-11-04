import React from 'react';
import { View, Text, Button } from 'react-native';

const CardDetails = ({ route }) => {
  const { data } = route.params;

  return (
    <View style={{marginTop: 30}}>
      <Text>{data.userId}: {data.title}</Text>
      <Text>{data.completed ? 'Completed' : 'Not Completed'}</Text>
      <Button title="Back"  />
    </View>
  );
};

export default CardDetails;
