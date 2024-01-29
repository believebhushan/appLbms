import React, {useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import Contacts from 'react-native-contacts';
import {FlashList} from '@shopify/flash-list';
import Ionicon from 'react-native-vector-icons/Ionicons';
import {useNavigation} from '@react-navigation/native';
import RNImmediatePhoneCall from 'react-native-immediate-phone-call';
import  Modal  from 'react-native-modal';
import Dialer from './Dialer';

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
  const [modalVisible,setModalVisible] = useState(false);
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


  useEffect(()=>{
    if(route?.params?.openDailer){
      openModal();
    }
  },[])


  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const renderItem = ({item}) => (
    <TouchableOpacity onPress={() => call(item.phoneNumbers[0]?.number)}>
      <View style={styles.contactItem}>
        <View style={styles.contactRow}>
          <View style={styles.contactDetails}>
            <Text style={styles.contactName}>
              {item.givenName} {item.familyName}
            </Text>
            <Text style={styles.contactNumber}>
              {item.phoneNumbers[0]?.number}
            </Text>
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
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
        backdropOpacity={0.1}
        style={styles.bottomModal}>
        <KeyboardAvoidingView behavior="padding" style={styles.modalContent}>
          <Text style={styles.modalHeaderText}>Enter Phone Number</Text>
           <Dialer setSearchQuery = {setSearchQuery} searchQuery={searchQuery}></Dialer>
        </KeyboardAvoidingView>
      </Modal>
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
    borderRadius: 10
  },
  backIcon: {
    marginRight: 10,
    marginTop: 10,
    marginLeft: 10
  },
  container: {
    flex: 1,
    padding: 16,
  },
  contactItem: {
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
});

export default ContactsList;
