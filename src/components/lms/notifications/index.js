import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { FlashList } from "@shopify/flash-list";

const Notices = () => {
  const notifications = [
    { id: 1, title: "Important Notice", message: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
    { id: 2, title: "Reminder", message: "Don't forget to submit your assignment by Friday." },
    { id: 3, title: "Meeting Tomorrow", message: "There will be a department meeting at 2 PM tomorrow." },
    { id: 4, title: "Holiday Closure", message: "The office will be closed on Monday for a public holiday." },
    { id: 5, title: "System Maintenance", message: "Scheduled system maintenance on Saturday, expect brief downtime." },
    { id: 6, title: "New Policy", message: "A new company policy has been introduced. Please review it on the intranet." },
    { id: 7, title: "Training Session", message: "Mandatory training session for all employees next week." },
    { id: 8, title: "Congratulations!", message: "Congratulations to the team for achieving the quarterly targets." },
    { id: 9, title: "Upcoming Event", message: "Join us for the company picnic on the 15th of next month." },
    { id: 10, title: "Feedback Survey", message: "Please take a moment to provide feedback on the recent team-building event." },
    { id: 11, title: "Employee of the Month", message: "Nominations are open for the Employee of the Month award." },
    { id: 12, title: "New Project Kick-off", message: "The kick-off meeting for the new project is scheduled for Wednesday." },
    { id: 13, title: "IT Support", message: "If you're facing any IT issues, please contact the IT support team for assistance." },
    { id: 14, title: "Welcome New Employees", message: "Let's welcome our new team members who joined this week." },
    { id: 15, title: "Dress Code Reminder", message: "Please adhere to the company's dress code policy." },
    { id: 16, title: "Health and Safety", message: "Review the updated health and safety guidelines on the company website." },
    { id: 17, title: "Birthday Celebration", message: "Help us celebrate birthdays in the office this Friday in the breakroom." },
    { id: 18, title: "Town Hall Meeting", message: "The quarterly town hall meeting is scheduled for next month. Prepare your questions." },
    { id: 19, title: "Customer Feedback", message: "Thank you for the positive customer feedback received. Keep up the good work!" },
    { id: 20, title: "Employee Wellness Program", message: "Participate in the upcoming employee wellness program activities." },
    // Add more notifications as needed
  ];
  

  const renderNotificationItem = ({ item }) => (
    <View style={styles.notificationItem}>
      <Text style={styles.notificationTitle}>{item.title}</Text>
      <Text style={styles.notificationMessage}>{item.message}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Notices</Text>
      <FlashList
        data={notifications}
        renderItem={renderNotificationItem}
        estimatedItemSize={100}
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
    marginBottom: 20,
  },
  notificationItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingVertical: 10,
  },
  notificationTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  notificationMessage: {
    fontSize: 14,
    color: "#666",
  },
});

export default Notices;
