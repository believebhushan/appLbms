import React, { useEffect, useState } from 'react';
import { View, Text, FlatList,Button } from 'react-native';
import Contacts from 'react-native-contacts';
// import displayNotification from '../helpers/notifications/sendNotifications';

import { PermissionsAndroid } from 'react-native';
import CallLogs from 'react-native-call-log'

function ContactList() {
    const [contacts, setContacts] = useState([]);
  
    useEffect(() => {
      (async () => {
      
        loadContacts();
      })()
    }, []);
  
    const loadContacts = async () => {
     const all = await Contacts.getAll();
    setContacts(all);
    // const notfifictionId = await displayNotification({title: "Contact Loaded  ", body: "Hi, we have completed calculating the sums"});
    // console.log(notfifictionId,"notfifictionId");
    };
  
    return (
      <View>
        <FlatList
          data={contacts}
          keyExtractor={(item) => item.recordID}
          renderItem={({ item }) => (
            <View style={{backgroundColor: 'white',marginTop: 10,padding: 10, borderRadius: 10}}>
              <Text>{item?.recordID}:{item?.givenName || 'No Name'}</Text>
              <Text>{item.phoneNumbers.length > 0 ? item.phoneNumbers[0]?.number : 'No Phone Number'}</Text>
            </View>
          )}
        />
      </View>
    );
  }

  export default ContactList;
  