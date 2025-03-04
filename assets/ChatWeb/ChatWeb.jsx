import React, { useContext, useEffect, useState,useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { UserContext } from "../Components/user/Post-Context";
import axios from "axios";




const ChatWeb = () => {
  const [users, setUsers] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const { username } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("https://full-stack-shop-backend.vercel.app/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);


  useEffect(() => {
    if (!receiver) {
      setMessages([]);
      return;
    }
  
    const fetchMessages = async () => {
      try {
        const response = await axios.get(
          `https://full-stack-shop-backend.vercel.app/messages/${username}/${receiver}`
        );
        const newMessages = response.data;
  
        // Update state only if new messages are different
        setMessages((prevMessages) => {
          const prevLastMessage = prevMessages[prevMessages.length - 1];
          const newLastMessage = newMessages[newMessages.length - 1];
  
          return prevLastMessage?.content !== newLastMessage?.content
            ? newMessages
            : prevMessages;
        });
      } catch (error) {
        console.error("Error fetching messages:", error);
      }
    };
  
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);
  
    return () => clearInterval(interval);
  }, [receiver, username]);
  
   

  const sendMessage = async () => {
    if (message.trim() && receiver) {
      const newMsg = {
        sender: username,
        receiver,
        content: message,
        timestamp: new Date(),
      };
  
      setMessages((prevMessages) => [...prevMessages, newMsg]); 
  
      try {
        await axios.post(
          "https://full-stack-shop-backend.vercel.app/messages",
          newMsg
        );
        setMessage(""); // Clear input after successful send
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

    // Render individual message
    const renderMessage = useCallback(({ item }) => {
      const isSender = item.sender === username;
      return (
        <View
          style={[
            styles.messageContainer,
            isSender ? styles.sentMessage : styles.receivedMessage,
          ]}
        >
          <View style={styles.messageBubble}>
            <Text style={styles.sender}>
              {isSender ? "You" : item.sender}
            </Text>
            <Text style={styles.messageText}>{item.content}</Text>
          </View>
        </View>
      );
    }, [username]);




  return (
    <View style={styles.container}>
      {/* Users List */}
      <View style={styles.usersContainer}>
        <Text style={styles.header}>Chat App</Text>
        <FlatList
          data={users}
          keyExtractor={(item) => item._id}        
           renderItem={({ item }) => (
            <TouchableOpacity
              style={styles.userItem}
              onPress={() => setReceiver(item.name)}
            >
              <Image
                source={{ uri: `https://robohash.org/${item.name}` }}
                style={styles.avatar}
               />
              <View>
                <Text style={styles.username}>
                  {item.name.charAt(0).toUpperCase() + item.name.slice(1).toLowerCase()}
                </Text>
               </View>
            </TouchableOpacity>
            )}
          nestedScrollEnabled={true} 
        />
      </View>

      {/* Chat Section */}
      <View style={styles.chatContainer}>
        <Text style={styles.chatHeader}>
          {receiver || "Select a user to chat"}
        </Text>

        {/* Chat Messages */}
        <FlatList
          data={messages}
          keyExtractor={(item) => item._id}        
            renderItem={renderMessage}
            nestedScrollEnabled={true} 
            />
          

        {/* Chat Input */}
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Type a message..."
            value={message}
            onChangeText={setMessage}
          />
          <TouchableOpacity
            style={[styles.sendButton, username === "Guest" && styles.disabledButton]}
            onPress={sendMessage}           
             disabled={username === "Guest"}
          >
            <Text style={styles.sendButtonText}>Send</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
  },
  usersContainer: {
    flex: 1,
    borderRightWidth: 1,
    borderColor: "#ccc",
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#ccc",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
  },
  chatContainer: {
    flex: 2,
  },
  chatHeader: {
    fontSize: 18,
    fontWeight: "bold",
    padding: 10,
    backgroundColor: "#f0f0f0",
  },
  messageContainer: {
    padding: 10,
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#dcf8c6",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "#ececec",
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    maxWidth: "80%",
  },
  messageBubble: {
    flexDirection: "column",
  },
  sender: {
    fontWeight: "bold",
    marginBottom: 5,
  },
  messageText: {
    fontSize: 16,
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    borderTopWidth: 1,
    borderColor: "#ccc",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
});

export default ChatWeb;
