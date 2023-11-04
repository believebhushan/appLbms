import {View, TouchableOpacity, StyleSheet} from 'react-native';
import Ionicon from 'react-native-vector-icons/Ionicons';
import AntDesignIcon from 'react-native-vector-icons/AntDesign';

const HomeTab = (isFocused) => {
  return <AntDesignIcon name="home" size={28} color={isFocused? 'blue': '#000'} />;
};

const ContactListTab = (isFocused) => {
  return <AntDesignIcon name="contacts" size={28}  color={isFocused? 'blue': '#000'} />;
};

const CallAnalyseTab = (isFocused) => {
  return <Ionicon name="analytics" size={28}  color={isFocused? 'blue': '#000'} />;
};

const CallListTab = (isFocused) => {
  return <Ionicon name="call-outline" size={28}  color={isFocused? 'blue': '#000'} />;
};

const routeBarMapping = {
  Home: HomeTab,
  ContactDetails: ContactListTab,
  CallAnalyse: CallAnalyseTab,
  CallList: CallListTab,
};

function LbmsTabBar({state, descriptors, navigation}) {
    const updateRoutes = state.routes.filter(ele => ele.name !== 'Login');
  return (
    <View style={styles.navigation}>
      {updateRoutes.map((route, index) => {
        const {options} = descriptors[route.key];
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
            style={{...styles.navItem}}
            key={index}>
            {routeBarMapping[route?.name](isFocused)}
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    padding: 10,
    overflow: 'scroll',
  },
  navItem: {
    borderRightWidth: 1,
    flex:1,
    alignItems:'center'
  },
  navigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
    borderCurve: 'continuous',
    borderRadius: 10,
  },
  navOption: {
    padding: 10,
  },
});

export default LbmsTabBar;
