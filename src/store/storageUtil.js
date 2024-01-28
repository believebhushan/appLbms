import AsyncStorage from '@react-native-async-storage/async-storage';

// Store data in AsyncStorage
export const storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    // console.error('Error storing data:', error);
  }
};

// Retrieve data from AsyncStorage
export const getData = async (key) => {
  try {
    const value = await AsyncStorage.getItem(key);
    return value !== null ? JSON.parse(value) : null;
  } catch (error) {
    // console.error('Error retrieving data:', error);
    return null;
  }
};

// Remove data from AsyncStorage
export const removeData = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    // console.error('Error removing data:', error);
  }
};
