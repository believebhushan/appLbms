import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';

const CallAnalyse = () => {
  const [data, setData] = useState([]); // Data for the FlatList
  const [page, setPage] = useState(1); // Current page
  const [loading, setLoading] = useState(false); // Loading state

  // Define a function to load data for the given page
  const loadPage = (pageNumber) => {
    setLoading(true); // Set loading to true before fetching data
    // Fetch your data based on the page number and update the 'data' state
    // You can use an API call or some other data source here
    // For demonstration, we'll simulate data loading
    setTimeout(() => {
      const newData = Array.from({ length: 20 }, (_, index) => {
        return `Item ${index + 1 + (pageNumber - 1) * 20}`;
      });

      setData((prevData) => [...prevData, ...newData]);
      setLoading(false); // Set loading to false after data is loaded
    }, 3000); // Simulating a delay (replace with your actual data loading code)
  };

  useEffect(() => {
    loadPage(page);
  }, [page]);

  const renderFooter = () => {
    if (loading) {
      return (
        <View style={{ padding: 10 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      );
    }
    return null;
  };

  return (
    <View>
      <FlatList
        data={data}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text>{item}</Text>}
        onEndReached={() => {
          if (!loading) {
            // Load more data when reaching the end of the list
            setPage(page + 1);
          }
        }}
        onEndReachedThreshold={0.1}
        ListFooterComponent={renderFooter} // Custom footer component
      />
    </View>
  );
};

export default CallAnalyse;
