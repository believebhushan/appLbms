import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const ListLoading = () => {
  useEffect(() => {
    // Add any initialization logic or data fetching here
  }, []);

  return (
    <View style={styles.container}>
      {/* You can adjust the size prop for a larger loading indicator */}
      <ActivityIndicator
        size="large"
        color="#0000ff"
        animating={true}
        style={styles.horizontalActivityIndicator}
      />

      <Text style={styles.appName}>
        Processing.....................................
        It may take some time. Please be patient.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff', // Change to your preferred background color
  },
  horizontalActivityIndicator: {
    transform: [{ rotate: '90deg' }], // Rotate the indicator 90 degrees for horizontal spinning
  },
  appName: {
    fontSize: 24,
    color: '#000', // Change to your preferred text color
    marginTop: 16,
    padding:10
  },
});

export default ListLoading;
