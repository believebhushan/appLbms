import React from "react";
import { View, Text, StyleSheet, ScrollView, Image, FlatList } from "react-native";

const CarsCarousel = () => {
  const cars = [
    { id: 1, name: "Car 1", image: "https://avatars.githubusercontent.com/u/1?v=4" },
    { id: 2, name: "Car 2", image: "https://avatars.githubusercontent.com/u/2?v=4" },
    { id: 3, name: "Car 3", image: "https://avatars.githubusercontent.com/u/3?v=4" },
    // Add more cars as needed
  ];

  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.carouselContainer}>
      {cars.map((car) => (
        <View key={car.id} style={styles.carouselItem}>
          <Text>{car.name}</Text>
          <Image source={{ uri: car.image }} style={styles.carouselImage} />
        </View>
      ))}
    </ScrollView>
  );
};

const Courses = () => {
  const courses = [
    { id: 1, title: "Course 1", description: "Description for Course 1" },
    { id: 2, title: "Course 2", description: "Description for Course 2" },
    { id: 3, title: "Course 3", description: "Description for Course 3" },
    // Add more courses as needed
  ];

  const renderCourseItem = ({ item }) => (
    <View style={styles.courseItem}>
      <Text style={styles.courseTitle}>{item.title}</Text>
      <Text style={styles.courseDescription}>{item.description}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>
         Explore the courses
      </Text>
      <CarsCarousel />
      <Text style={styles.heading}>Courses</Text>
      <FlatList
        data={courses}
        renderItem={renderCourseItem}
        keyExtractor={(item) => item.id.toString()}
      />
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
    fontWeight: "bold",
    marginTop: 20,
  },
  carouselContainer: {
    marginTop: 10,
  },
  carouselItem: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#ddd",
    borderRadius: 8,
    height: 200,
    marginRight: 10,
    padding: 10,
  },
  carouselImage: {
    width: 150,
    height: 100,
    borderRadius: 8,
    marginVertical: 10,
  },
  courseItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  courseTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  courseDescription: {
    fontSize: 14,
    color: "#666",
  },
});

export default Courses;
