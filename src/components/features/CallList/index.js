import React, {useState, useEffect} from 'react';
import {
  View,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import getCalls from '../../../utils/getCalls';
import CallCard from './CallCard';
import {useFocusEffect} from '@react-navigation/native';
import ListLoading from './ListLoading';
import getLogsFromRealm from '../../../utils/getLogsFromRealm';
import SplashScreen from '../../SplashScreen';

const PAGE_SIZE = 30;

const CallList = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [pageIndex, setPageIndex] = useState(0);
  const [loadingMore, setLoadingMore] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const loadMoreData = async () => {
    setLoadingMore(true);

    setTimeout(async () => {
      setPageIndex(pageIndex + 1); // Increment the page index
      setLoadingMore(false);
    }, 1000); // Simulated delay for loading more data
  };

  const refreshData = async () => {
    setRefreshing(true);

    setTimeout(async () => {
      const newData = await getLogsFromRealm({filters: {}});
      setData(newData);
      setPageIndex(0); // Reset the page index
      setRefreshing(false);
    }, 1000); // Simulated delay for refreshing data
  };

  useEffect(() => {
    const fetchData = async () => {
      const newData = await getLogsFromRealm({filters: {}});
      setLoading(false);
      setData(newData);
    };

    fetchData();
  }, []);

  useFocusEffect(
    React.useCallback(() => {
      const fetchData = async () => {
        const newData = await getLogsFromRealm({filters: {}});
        setData(newData);
        setLoading(false);
      };

      fetchData();
    }, []),
  );

  const paginatedData = data.slice(0, (pageIndex + 1) * PAGE_SIZE);

  return (
    <>
      {loading && <SplashScreen></SplashScreen>}

      {!loading && (
        <View>
          <FlatList
            data={paginatedData}
            keyExtractor={(item, index) =>
              `${item.timestamp}:${item.phoneNumber}:${index}`
            }
            initialNumToRender={10}
            onEndReached={loadMoreData}
            onEndReachedThreshold={0.1}
            ListFooterComponent={() =>
              loadingMore ? <ActivityIndicator /> : null
            }
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={refreshData} />
            }
            renderItem={({item}) => (
              <TouchableOpacity>
                <CallCard data={item} />
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </>
  );
};

export default CallList;
