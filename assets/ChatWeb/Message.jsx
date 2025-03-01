import React from "react";
import { View, StyleSheet } from "react-native";
import ChatWeb from "./ChatWeb";

const Message = () => {
  return (
    <View style={styles.container}>
      <ChatWeb />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "#fff", 
  },
});

export default Message;
