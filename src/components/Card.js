import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Card = ({ data }) => (
  <View style={styles.card}>
    <Text>{data.id}: {data.title}</Text>
    <Text>{data.completed ? 'Completed' : 'Not Completed'}</Text>
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
    borderWidth: 5
  },
});

export default Card;
