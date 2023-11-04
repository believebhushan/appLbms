import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, Button, TouchableOpacity} from 'react-native';
import getCalls from '../../../utils/getCalls';
import CallCard from './CallCard';
import groupedcalls from './utils/groupedCalls';
const CallList = () => {
  const [data,setData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCalls({filters: {}});
      const groupedDetails = groupedcalls({data: data})
      console.log(groupedDetails[0], 'dhjhj');
      setData(groupedDetails);
    };
    fetchData();
  }, []);
  return (
    <>
      <View>
      <FlatList
            data={data}
            keyExtractor={item => `${item.timestamp}:${item.phoneNumber}`}
            initialNumToRender={10}
            refreshing={true}
            renderItem={({item}) => (
              <TouchableOpacity>
                <CallCard data={item} />
              </TouchableOpacity>
            )}
          />
      </View>
    </>
  );
};
export default CallList;
