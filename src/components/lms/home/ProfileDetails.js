import { useNavigation } from "@react-navigation/native";
import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

const ProfileDetails = ({route}) => {

  const {user} = route.params;
  const navigation = useNavigation();

  return (
    <View style={styles.detailContainer}>
          <Image source={{ uri: user.avatar_url }} style={styles.avatar} />
          <Text style={styles.title}>Username: {user.login}</Text>
          <Text style={styles.text}>ID: {user.id}</Text>
          <Text style={styles.text}>Node ID: {user.node_id}</Text>
          <Text style={styles.text}>Type: {user.type}</Text>
          <Text style={styles.text}>Site Admin: {user.site_admin ? 'Yes' : 'No'}</Text>
          <Text style={styles.url}>Profile URL: {user.html_url}</Text>
          <TouchableOpacity onPress={()=>{navigation.navigate("LmsHome")}} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  card: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 16,
  },
  title: {
    fontSize: 16,
  },
  text: {
    fontSize: 14,
    color: "#666",
  },
  url: {
    fontSize: 14,
    color: "#0366d6", // GitHub link color
  },
  detailContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
  },
  closeButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: "#0366d6",
    borderRadius: 5,
  },
  closeButtonText: {
    color: "white",
    fontSize: 16,
  },
});



export default ProfileDetails;
