import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {FlashList} from '@shopify/flash-list';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import Modal from 'react-native-modal';
import Dialer from './Dialer';
import UserAvatar from 'react-native-user-avatar';

const call = number => {
  const cleanedNum = number.replace(/\s/g, '');
  const dialableNum = cleanedNum.slice(
    cleanedNum?.length - 10,
    cleanedNum?.length,
  );
  RNImmediatePhoneCall.immediatePhoneCall('+91' + dialableNum);
};
const ContactsList = ({route}) => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState(null);
  const [modalVisible, setModalVisible] = useState(
    route?.params?.openDailer == true,
  );
  const navigation = useNavigation();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const matchedData = await Contacts.getContactsMatchingString(
          (searchQuery || '').replace(/\s/g, '') || 'bhai',
        );

        const newData = matchedData.filter(e => e.phoneNumbers[0]?.number);
        setData(newData || []);
      } catch (error) {
        console.log(error, 'While fetching contacts');
      }
    };

    fetchData();
  }, [searchQuery]);

  // useEffect(()=>{
  //   if(route?.params?.openDailer){
  //     openModal();
  //   }
  // },[])

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderItem = ({item}) => (
    <View style={styles.contactItem}>
      <View style={styles.contactRow}>
        <View style={styles.contactDetails}>
          <View style={styles.contactInfo}>
            {item.thumbnailPath.length > 0 ? (
              <Image
                source={{uri: item.thumbnailPath}}
                style={styles.contactImage}
              />
            ) : (
              <UserAvatar name={item.givenName[0]} style={styles.avatar} />
            )}
            <View>
              <Text style={styles.contactName}>
                {item.givenName} {item.familyName}
              </Text>
              <Text style={styles.contactNumber}>
                {item.phoneNumbers[0]?.number}
              </Text>
            </View>
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity onPress={() => call(item.phoneNumbers[0]?.number)}>
          <Ionicon
            name="call-outline"
            size={24}
            color="#ff9933"
            style={styles.backIcon}
          />
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {!modalVisible ? (
        <View style={styles.searchContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('LogsHome')}>
            <Ionicon
              name="arrow-back"
              size={24}
              color="#232323"
              style={styles.backIcon}
            />
          </TouchableOpacity>
          <TextInput
            style={styles.searchInput}
            placeholder="Search contacts by name or number"
            value={searchQuery}
            onChangeText={text => setSearchQuery(text)}
            autoFocus={!(route?.params?.openDailer == true)}
          />
        </View>
      ) : (
        <></>
      )}

      <Text style={{margin: 10}}>
        {searchQuery ? 'All contacts' : 'Suggested'}
      </Text>
      {data.length > 0 ? (
        <FlashList
          data={data}
          renderItem={renderItem}
          estimatedItemSize={200}
        />
      ) : (
        <Text>No matching contacts found</Text>
      )}

      <Modal
        isVisible={modalVisible}
        onBackdropPress={closeModal}
        onBackButtonPress={closeModal}
        backdropOpacity={0}
        hideModalContentWhileAnimating
        style={styles.bottomModal}>
        <Dialer
          setSearchQuery={setSearchQuery}
          searchQuery={searchQuery}></Dialer>
      </Modal>

      <TouchableOpacity
        style={styles.floatingButton}
        onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>
          <Ionicon
            name="keypad"
            size={30}
            color="#fff"
            style={styles.backIcon}
          />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'start',
    display: 'flex',
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 10,
  },
  backIcon: {
    marginRight: 10,
    marginTop: 10,
    marginLeft: 10,
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  contactItem: {
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 8,
    marginBottom: 8,
    elevation: 2,
  },
  contactName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  contactNumber: {
    fontSize: 16,
    color: '#666',
  },
  searchInput: {
    height: 40,
    marginBottom: 16,
    padding: 8,
    borderRadius: 8,
    flex: 1,
  },

  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
  },
  modalHeaderText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  contactInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contactImage: {
    width: 48,
    height: 48,
    borderRadius: 24, // Half of the width and height for a circular shape
    marginRight: 12,
  },
  avatar: {
    width: 48,
    height: 48,
    borderRadius: 24, // Half of the width and height for a circular shape
    marginRight: 12,
  },
  placeholderImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'gray', // Placeholder color
    marginRight: 12,
  },
  floatingButton: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FF9933',
    padding: 15,
    borderRadius: 30,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
  },
});

export default ContactsList;
