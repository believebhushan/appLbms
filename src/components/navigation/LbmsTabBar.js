import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const HomeTab = (isFocused) => {
  return (
    <View style={styles.tabContainer}>
      <AntDesignIcon name="home" size={28} color={isFocused ? 'blue' : '#000'} />
      <Text style={{ color: isFocused ? 'blue' : '#000', marginTop: 5 }}>Home</Text>
    </View>
  );
};

const ProfileTab = (isFocused) => {
  return (
    <View style={styles.tabContainer}>
      <AntDesignIcon name="user" size={28} color={isFocused ? 'blue' : '#000'} />
      <Text style={{ color: isFocused ? 'blue' : '#000', marginTop: 5 }}>Profile</Text>
    </View>
  );
};

const NoticeTab = (isFocused) => {
  return (
    <View style={styles.tabContainer}>
      <AntDesignIcon name="notification" size={28} color={isFocused ? 'blue' : '#000'} />
      <Text style={{ color: isFocused ? 'blue' : '#000', marginTop: 5 }}>Notifications</Text>
    </View>
  );
};

const CourseTab = (isFocused) => {
  return (
    <View style={styles.tabContainer}>
      <AntDesignIcon name="book" size={28} color={isFocused ? 'blue' : '#000'} />
      <Text style={{ color: isFocused ? 'blue' : '#000', marginTop: 5 }}>Courses</Text>
    </View>
  );
};

const LogsTab = (isFocused) => {
  return (
    <View style={styles.tabContainer}>
      <Ionicon name="call-outline" size={28} color={isFocused ? 'blue' : '#000'} />
      <Text style={{ color: isFocused ? 'blue' : '#000', marginTop: 5 }}>Calls</Text>
    </View>
  );
};

const routeBarMapping = {
  Home: HomeTab,
  Profile: ProfileTab,
  Notifications: NoticeTab,
  Courses: CourseTab,
  Logs: LogsTab
};

function LbmsTabBar({ state, descriptors, navigation }) {
  const updateRoutes = state.routes.filter(ele => ele.name !== 'Login');
  return (
    <View style={styles.navigation}>
      {updateRoutes.map((route, index) => {
        const { options } = descriptors[route.key];
        const isFocused = state.routes[state.index].name === route.name;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={styles.tabItem}
            key={index}
          >
            {routeBarMapping[route?.name](isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: '#fff', // Background color for the bottom bar
    borderRadius: 10,
    elevation: 5, // Add elevation for a subtle shadow
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
  },
  tabContainer: {
    alignItems: 'center',
  },
});

export default LbmsTabBar;
