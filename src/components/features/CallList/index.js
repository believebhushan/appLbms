import React, { useEffect, useState } from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity, Linking } from "react-native";
import { FlashList } from "@shopify/flash-list";

const CallList = () => {
  const [data, setData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch GitHub profiles data (replace 'your-username' with your GitHub username)
        const response = await fetch("https://api.github.com/users?per_page=200");
        const profiles = await response.json();
        setData(profiles);
      } catch (error) {
        console.error("Error fetching GitHub profiles:", error);
      }
    };

    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => setSelectedUser(item)} style={styles.card}>
      <Image source={{ uri: item.avatar_url }} style={styles.avatar} />
      <View>
        <Text style={styles.title}>Username: {item.login}</Text>
        <Text style={styles.text}>ID: {item.id}</Text>
        <Text style={styles.text}>Node ID: {item.node_id}</Text>
        <Text style={styles.text}>Type: {item.type}</Text>
        <Text style={styles.text}>Site Admin: {item.site_admin ? 'Yes' : 'No'}</Text>
        <Text style={styles.url}>Profile URL: {item.html_url}</Text>
        {/* Add more details as needed */}
      </View>
    </TouchableOpacity>
  );

  const openProfileUrl = (url) => {
    Linking.openURL(url);
  };

  const renderDetail = () => {
    if (selectedUser) {
      return (
        <View style={styles.detailContainer}>
          <Image source={{ uri: selectedUser.avatar_url }} style={styles.avatar} />
          <Text style={styles.title}>Username: {selectedUser.login}</Text>
          <Text style={styles.text}>ID: {selectedUser.id}</Text>
          <Text style={styles.text}>Node ID: {selectedUser.node_id}</Text>
          <Text style={styles.text}>Type: {selectedUser.type}</Text>
          <Text style={styles.text}>Site Admin: {selectedUser.site_admin ? 'Yes' : 'No'}</Text>
          <Text style={styles.url}>Profile URL: {selectedUser.html_url}</Text>
          <TouchableOpacity onPress={() => setSelectedUser(null)} style={styles.closeButton}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  return (
    <View style={styles.container}>
      <FlashList
        data={data}
        renderItem={renderItem}
        estimatedItemSize={200}
      />
      {renderDetail()}
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

export default CallList;
