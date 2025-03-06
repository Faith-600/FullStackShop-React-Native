import React,{useMemo} from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";

const SenderChat = ({ messages, username }) => {

const memoizedMessage = useMemo(()=> messages,[messages])
  return (
    <View style={styles.container}>
      <FlatList
        data={memoizedMessage}
        keyExtractor={(item, index) => item._id ? item._id.toString() : `${index}`}
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender === username ? styles.sentMessage : styles.receivedMessage,
            ]}
          >
            <View style={styles.messageBubble}>
              <Text style={styles.sender}>
                {item.sender === username ? "You" : item.sender}
              </Text>
              <Text style={styles.messageText}>{item.content}</Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
     padding: 10
     },

  noMessages: { 
    textAlign: "center", 
    color: "gray", 
    fontSize: 16, 
    marginTop: 10 
},
  messageContainer: { 
    flexDirection: "row", 
    alignItems: "center",
     marginBottom: 10 
    },
  sentMessage: {
     justifyContent: "flex-end" 
    },
  receivedMessage: { 
    justifyContent: "flex-start"
 },
  avatar: { 
    width: 40, height: 40, borderRadius: 20, marginRight: 10 
},
  messageBubble: {
     padding: 10,
      borderRadius: 10,
       maxWidth: "70%" 
    },
  sender: { 
    fontWeight: "bold",
     marginBottom: 3 
    },
  messageText: { 
    fontSize: 16 
},
  sentMessageBubble: { 
    backgroundColor: "#4F46E5",
     alignSelf: "flex-end" 
    },
  receivedMessageBubble: {
     backgroundColor: "#E5E7EB",
      alignSelf: "flex-start"
     },
});

export default SenderChat;
