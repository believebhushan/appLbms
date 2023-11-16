import React, { useState, useEffect } from 'react';
import { View, FlatList, Text, ActivityIndicator } from 'react-native';
import SmsAndroid from 'react-native-get-sms-android';
import SmsCard from './SmsCard';





const sendMessage=()=>{

}
const CallAnalyse = () => {
  const [data, setData] = useState([]); 
  const [page, setPage] = useState(1); 
  const [loading, setLoading] = useState(false);
  const [indexFrom, setIndexFrom] = useState(0)

  const now = new Date();
  const perpage = 40;
  const filter = {
    box: 'inbox', 
    maxDate: now.getTime(),
  }

  const loadPage = async (pageNumber) => {
    setLoading(true);
    const dataToSet = []
    SmsAndroid.list(
      JSON.stringify(filter),
      (fail) => {
        console.log('Failed with this error: ' + fail);
      },
      (count, smsList) => {
        console.log('Count: ', count);
        var arr = JSON.parse(smsList);
        console.log('List: ', arr[0]);

     
        arr.forEach(function(object) {
          dataToSet.push(object)
        });
        setData(dataToSet);
        setIndexFrom(pageNumber*perpage-1);
      },
    );
    await sendMessage();
    setLoading(false);
  };

  useEffect(() => {
    loadPage(page);
  }, []);

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
        renderItem={({ item }) => <SmsCard data={item}></SmsCard>}
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
