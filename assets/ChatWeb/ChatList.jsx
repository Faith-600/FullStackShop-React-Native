// import React, { useContext, useState, useEffect } from "react";
// import { View, Text, FlatList, Image, StyleSheet } from "react-native";
// import { UserContext } from "../Components/user/Post-Context";
// import SenderChat from "./SenderChat";
// import axios from "axios";

// const ChatList = () => {
//   const { username, receiverUsername } = useContext(UserContext);
//   const [messages, setMessages] = useState([]);

//   const fetchMessages = async () => {
//     try {
//       const response = await axios.get(
//         `https://full-stack-shop-backend.vercel.app/messages/${username}/${receiverUsername}`
//       );
//       setMessages(response.data);
//     } catch (error) {
//       console.error("Error fetching messages:", error);
//     }
//   };

//   useEffect(() => {
//     fetchMessages();
//   }, [username, receiverUsername]);

//   return (
//     <FlatList
//       data={messages}
//       keyExtractor={(item, index) => index.toString()}
//       renderItem={({ item }) =>
//         item.sender === username ? (
//           <SenderChat message={item.content} />
//         ) : (
//           <View style={styles.messageContainer}>
//             <Image
//               source={{ uri: `https://robohash.org/${receiverUsername}` }}
//               style={styles.avatar}
//             />
//             <View>
//               <Text style={styles.username}>{receiverUsername}</Text>
//               <View style={styles.messageBubble}>
//                 <Text style={styles.messageText}>{item.content}</Text>
//               </View>
//             </View>
//           </View>
//         )
//       }
//     />
//   );
// };

// // Styles
// const styles = StyleSheet.create({
//   messageContainer: {
//     flexDirection: "row",
//     alignItems: "center",
//     marginBottom: 12,
//     padding: 10,
//   },
//   avatar: {
//     width: 48,
//     height: 48,
//     borderRadius: 24,
//     marginRight: 12,
//   },
//   username: {
//     fontSize: 16,
//     fontWeight: "bold",
//   },
//   messageBubble: {
//     backgroundColor: "#90cdf4", 
//     padding: 10,
//     borderRadius: 10,
//     maxWidth: "80%",
//   },
//   messageText: {
//     color: "#000",
//   },
// });

// export default ChatList;
