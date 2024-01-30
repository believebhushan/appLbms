import React, {useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert,
  NativeModules,
} from 'react-native';

const Profile = ({navigation}) => {
  const user = {
    name: 'John Doe',
    bio: 'Passionate developer exploring the world of React Native.',
    email: 'john.doe@example.com',
    phone: '+123 456 7890',
    jobTitle: 'Software Developer',
    location: 'City, Country',
  };

  const handleEditProfile = () => {
    Alert.alert('Info', 'Adding Soon');
  };
  const MyModule = NativeModules.MyModule;

  useEffect(() => {
    async function doer() {
      try {
        const twoHoursAgoTimestamp = Date.now() - 1000 * 3600 * 2;
        const twoHoursAgoDate = new Date(twoHoursAgoTimestamp);
        const whatis = await MyModule.loadWithFilter(
          100,
          {
            minTimestamp: undefined,
            maxTimestamp: undefined,
            phoneNumbers: JSON.stringify([])
          }
        );
        console.log(whatis[0], 'whatis');
      } catch (error) {
        console.log(error, 'error');
      }
    }
    doer();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profile</Text>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Name:</Text>
        <Text style={styles.value}>{user.name}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Bio:</Text>
        <Text style={styles.value}>{user.bio}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Email:</Text>
        <Text style={styles.value}>{user.email}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Phone:</Text>
        <Text style={styles.value}>{user.phone}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Job Title:</Text>
        <Text style={styles.value}>{user.jobTitle}</Text>
      </View>
      <View style={styles.profileInfo}>
        <Text style={styles.label}>Location:</Text>
        <Text style={styles.value}>{user.location}</Text>
      </View>
      <TouchableOpacity onPress={handleEditProfile} style={styles.editButton}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  profileInfo: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#666',
  },
  value: {
    fontSize: 18,
    marginTop: 5,
  },
  editButton: {
    backgroundColor: '#0366d6',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
    color: 'white',
    fontSize: 16,
  },
});

export default Profile;
