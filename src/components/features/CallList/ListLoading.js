import React from 'react';
import { View, StyleSheet } from 'react-native';
import ShimmerPlaceholder from 'react-native-shimmer-placeholder';

const ListLoading = () => {
  return (
    <View style={styles.container}>
      {[...Array(10).keys()].map((index) => (
        <ShimmerPlaceholder
          key={index}
          style={styles.shimmerBlock}
          shimmerColors={['#e2e2e2', '#d9d9d9', '#c0c0c0']}
          duration={1000}
          autoRun
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    margin:0
  },
  shimmerBlock: {
    width: '100%',
    height: 40,
    marginBottom: 30, // Adjust the margin between blocks as needed
  },
});

export default ListLoading;
