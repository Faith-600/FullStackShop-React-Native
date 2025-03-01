import React, { useContext, useEffect, useState } from "react";
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
import SenderChat from "./SenderChat";



const ChatWeb = () => {
  const [users, setUsers] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const { username } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [lastMessages, setLastMessages] = useState({});
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    axios
      .get("https://full-stack-shop-backend.vercel.app/users")
      .then((response) => setUsers(response.data))
      .catch((error) => console.error("Error fetching users:", error));
  }, []);

  useEffect(() => {
    if (!receiver) return;

    const fetchMessages = () => {
      axios
        .get(`https://full-stack-shop-backend.vercel.app/messages/${username}/${receiver}`)
        .then((response) => {

          setMessages(response.data);

          if (response.data.length > 0) {
            const lastMessage = response.data[response.data.length - 1];
            setLastMessages((prevMessages) => ({
              ...prevMessages,
              [receiver]: {
                content: lastMessage.content,
                timestamp: new Date(lastMessage.timestamp),
              },
            }));
          }
        })
        .catch((error) => console.error("Error fetching messages:", error));
    };

    fetchMessages();
    const interval = setInterval(fetchMessages, 3000);

    return () => clearInterval(interval);
  }, []);

  const sendMessage = () => {
    if (message.trim() && receiver) {
      const newMsg = { sender: username, receiver, content: message, timestamp: new Date() };

      axios
        .post("https://full-stack-shop-backend.vercel.app/messages", newMsg)
        .then(() => {
          setMessage("");
          setMessages((prevMessages) => {
            const existingMessage = prevMessages.find((msg) => msg.content === newMsg.content && msg.timestamp.getTime() === newMsg.timestamp.getTime());
            if (!existingMessage) {
              return [...prevMessages, newMsg];
            }
            return prevMessages;
          });
         setLastMessages((prevMessages) => ({
            ...prevMessages,
            [receiver]: { content: newMsg.content, timestamp: new Date() },
          }));
        })
        .catch((error) => console.error("Error sending message:", error));
    }
  };

  return (
    <View style={styles.container}>
      {/* Users List */}
      <View style={styles.usersContainer}>
        <Text style={styles.header}>Chat App</Text>
        <FlatList
          data={users}
          keyExtractor={(item) => item.id}
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
                <Text style={styles.lastMessage}>
                  {lastMessages[item.name]?.content || ""}
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
          data={messages || []}
          keyExtractor={(item, index) => item?.id?.toString() || index.toString()} // Unique key
          renderItem={({ item }) =>
            item.sender === username ? (
              <SenderChat messages={messages} username={username}/>
            ) : (
              <View style={styles.receivedMessage}>
                <Image
                  source={{ uri: `https://robohash.org/${receiver}` }}
                  style={styles.avatarSmall}
                />
                <View style={styles.messageBubble}>
                  <Text style={styles.messageText}>{item.content}</Text>
                </View>
              </View>
            )
          }
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
    width: "30%",
    backgroundColor: "#fff",
    borderRightWidth: 1,
    borderRightColor: "#ccc",
    paddingVertical: 10,
  },
  header: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#4f46e5",
    padding: 16,
    textAlign: "center",
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 25,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  lastMessage: {
    fontSize: 14,
    color: "#888",
  },
  chatContainer: {
    flex: 1,
    paddingVertical: 10,
  },
  chatHeader: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  receivedMessage: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingHorizontal: 16,
  },
  avatarSmall: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  messageBubble: {
    backgroundColor: "#90cdf4",
    padding: 10,
    borderRadius: 10,
    maxWidth: "80%",
  },
  messageText: {
    color: "#000",
  },
  inputContainer: {
    flexDirection: "row",
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: "#ccc",
  },
  input: {
    flex: 1,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    backgroundColor: "#fff",
  },
  sendButton: {
    backgroundColor: "#4f46e5",
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 8,
    marginLeft: 8,
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
});

export default ChatWeb;
