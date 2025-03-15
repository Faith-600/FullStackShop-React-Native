import React, { useContext, useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  FlatList,
  Image,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";
import { UserContext } from "../Components/user/Post-Context";
import axios from "axios";

const ChatWeb = () => {
  const [users, setUsers] = useState([]);
  const [receiver, setReceiver] = useState(null);
  const { username } = useContext(UserContext);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false); 

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
        setMessage("");
      } catch (error) {
        console.error("Error sending message:", error);
      }
    }
  };

  const renderMessage = useCallback(
    ({ item }) => {
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
    },
    [username]
  );

  const renderUserItem = ({ item }) => (
    
    <TouchableOpacity
      style={[
        styles.userItem,
        receiver === item.name && styles.selectedUser
      ]}
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
   
  );

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <View style={styles.container}>
      {/* Toggle Button */}
      <TouchableOpacity style={styles.toggleButton} onPress={toggleSidebar}>
        <Text style={styles.toggleButtonText}>
          {isSidebarVisible ? "◄" : "►"}
        </Text>
      </TouchableOpacity>

      {/* Sidebar with Users */}
      {isSidebarVisible && (
        <View style={styles.sidebar}>
          <Text style={styles.header}>Chat Users</Text>
          <FlatList
            data={users.filter(user => user.name !== username)}
            keyExtractor={(item) => item._id}
            renderItem={renderUserItem}
            style={styles.userList}
            nestedScrollEnabled
          />
        </View>
      )}

      {/* Main Chat Area */}
      <View style={[styles.chatContainer, !isSidebarVisible && styles.fullWidth]}>
        {receiver ? (
          <>
            <View style={styles.chatHeader}>
              <Text style={styles.chatHeaderText}>
              <Image
        source={{ uri: `https://robohash.org/${receiver}` }}
        style={styles.avatar}
      /> {receiver}
              </Text>
            </View>
            <FlatList
              data={messages}
              keyExtractor={(item, index) => item._id || index.toString()}
              renderItem={renderMessage}
              style={styles.messagesList}
              nestedScrollEnabled
            />
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.input}
                placeholder="Type a message..."
                value={message}
                onChangeText={setMessage}
              />
              <TouchableOpacity
                style={[
                  styles.sendButton,
                  username === "Guest" && styles.disabledButton,
                ]}
                onPress={sendMessage}
                disabled={username === "Guest"}
              >
                <Text style={styles.sendButtonText}>Send</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          <View style={styles.noChat}>
            <Text>Select a user to start chatting</Text>
          </View>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#fff",
    position: "relative",
  },
  toggleButton: {
    position: "absolute",
    top: 35,
    left: 10,
    zIndex: 1,
    backgroundColor: "#007bff",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    
  },
  sidebar: {
    width: 250,
    backgroundColor: "#f8f9fa",
    borderRightWidth: 1,
    borderColor: "#dee2e6",
  },
  fullWidth: {
    flex: 1,
  },
  header: {
    fontSize: 20,
    fontWeight: "bold",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#dee2e6",
    backgroundColor: "#fff",
    marginTop:50
  },
  userList: {
    flex: 1,
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
  selectedUser: {
    backgroundColor: "#e9ecef",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontSize: 16,
    fontWeight: "500",
  },
  chatContainer: {
    flex: 1,
    flexDirection: "column",
  },
  chatHeader: {
    padding: 15,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderColor: "#dee2e6",
  },
  chatHeaderText: {
    fontSize: 18,
    fontWeight: "bold",
    margin:"auto"
  },
  messagesList: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    marginVertical: 5,
    maxWidth: "70%",
  },
  sentMessage: {
    alignSelf: "flex-end",
    backgroundColor: "#007bff",
    borderRadius: 15,
    padding: 10,
  },
  receivedMessage: {
    alignSelf: "flex-start",
    backgroundColor: "rgb(128,128,128)",
    borderRadius: 15,
    padding: 10,
  },
  messageBubble: {
    flexDirection: "column",
  },
  sender: {
    fontWeight: "bold",
    marginBottom: 5,
    color: "#fff",
  },
  messageText: {
    fontSize: 16,
    color: "#fff",
  },
  inputContainer: {
    flexDirection: "row",
    padding: 10,
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderColor: "#dee2e6",
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
    marginRight: 10,
    backgroundColor: "#fff",
  },
  sendButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
    justifyContent: "center",
  },
  sendButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  disabledButton: {
    backgroundColor: "#ccc",
  },
  noChat: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatWeb;