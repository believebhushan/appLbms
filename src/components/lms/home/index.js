import React, { useEffect, useState } from "react";
import { View, ActivityIndicator, StyleSheet,TouchableOpacity,Image,Text } from "react-native";
import { FlashList } from "@shopify/flash-list";
import { useNavigation } from "@react-navigation/native";

const Home = () => {
  const navigation = useNavigation();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Simulate delay to resemble API call
        // Fetch GitHub profiles data (replace 'your-username' with your GitHub username)
        const response = await fetch("https://api.github.com/users?per_page=200");
        const profiles = await response.json();
        setData(profiles);
      } catch (error) {
      } finally {
        setIsLoading(false);
      }
    };

    // Fetch data after setting placeholder data
    fetchData();
  }, []);

  const navigateToDetails = ({ user }) => {
    navigation.navigate("ProfileWebView", { profile_url: user.html_url });
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity onPress={() => navigateToDetails({ user: item })} style={styles.card}>
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

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0366d6" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Profiles</Text>
      <FlashList data={data} renderItem={renderItem} estimatedItemSize={200} />
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
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  heading: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    marginLeft:20,
    paddingLeft:10,
    marginTop:10
  },
});

export default Home;
