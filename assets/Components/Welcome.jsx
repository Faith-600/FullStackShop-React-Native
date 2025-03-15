import React, { useState, useContext, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Image,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Alert,
} from "react-native";
import axios from "axios";
import { IconButton } from 'react-native-paper';
import { UserContext,PostsContext } from "./user/Post-Context";

const Welcome = () => {
  const [newPost, setNewPost] = useState("");
  const [edit, setEdit] = useState(null);
  const [editContent, setEditContent] = useState("");
 const { username } = useContext(UserContext);
  const { posts, setPosts } = useContext(PostsContext);
  const [errorMessage, setErrorMessage] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [loading, setLoading] = useState(true);
 

  axios.defaults.withCredentials = true;

  console.log("Current username:", username); 


  const fetchItems = async () => {
    try {
      const response = await axios.get(
        "https://full-stack-shop-backend.vercel.app/posts"
      );
      setPosts(response.data);
      console.log("posts",response.data);
      
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleSubmit = async () => {
    setErrorMessage("");

    if (!newPost.trim()) {
      Alert.alert("Error", "Post content is empty.");
      return;
    }

    if (!username || username.toLowerCase() === "guest") {
      setErrorMessage(
        "You must be logged in to create a post. But you can check out other posts!"
      );
      return;
    }

    try {
      const response = await axios.post(
        "https://full-stack-shop-backend.vercel.app/posts",
        { content: newPost, username }
      );
     
      console.log("Fetched posts:", response.data); 
     
      const { content, username: postUser, created_at, id } = response.data;
      setPosts((prevPosts) => [...prevPosts, { content, postUser, created_at, id }]);
      setNewPost("");
      fetchItems();
    } catch (error) {
      console.error("Error creating post:", error.response?.data || error.message);
    }
  };

  const handleEdit = (_id, content) => {
    setEdit(_id);
    setEditContent(content);
  };

 
  const handleUpdate = async (id) => {
    try {
      const response = await axios.put(
        `https://full-stack-shop-backend.vercel.app/posts/${id}`,
        { content: editContent }
      );
      console.log("Update response:", response.data);
      if (response.data._id) {
        setPosts((prevPosts) =>
          prevPosts.map((p) => (p._id === id ? { ...p, content: editContent } : p))
        );
        setEdit(null);
        setEditContent("");
       
      } else {
        Alert.alert("Error", "Failed to update post.");
      }
    } catch (err) {
      console.error("Error updating post:", err);
    }
  };

  const handleDelete = async (_id) => {
    try {
      await axios.delete(`https://full-stack-shop-backend.vercel.app/posts/${_id}`);
      setPosts((prevPosts) => prevPosts.filter((post) => post._id !== _id));
    } catch (err) {
      console.error("Error deleting post:", err);
    }
  };

  // Loading The Picture
  useEffect(() => {
    if (username) {
      setAvatarUrl(`https://robohash.org/${username}`);
    }
  }, [username]);

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="What is on your mind?"
        value={newPost}
        onChangeText={setNewPost}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Post</Text>
      </TouchableOpacity>

      {errorMessage ? <Text style={styles.errorText}>{errorMessage}</Text> : null}

      {/* Worcation */}
      <Image
        source={{ uri: "https://img.freepik.com/premium-vector/blue-waves-simple-logo-design_302761-1052.jpg?w=996" }}
        style={styles.logo}
      />

      {loading ? <ActivityIndicator size="large" color="blue" /> : null}

      <FlatList
        data={posts?.filter((p) => p.username === username)}
        keyExtractor={(item, index) => (item?._id ? item._id.toString() : index.toString())}
        renderItem={({ item }) => (
          <View style={styles.post}>
            {item._id === edit ? (
              <>
                <TextInput
                  style={styles.input}
                  value={editContent}
                  onChangeText={(text) => setEditContent(text)}
                  multiline
                />
                <TouchableOpacity style={styles.button} onPress={() =>handleUpdate(item._id)} >
                  <Text style={styles.buttonText}>Save</Text>
                </TouchableOpacity>
              </>
            ) : (
              <>
                <View style={styles.postHeader}>
                  <View>
                    <Text style={styles.content}>{item.content}</Text>
                    </View>
                </View>
               <View style={styles.postImg} >
                <Image source={{ uri: avatarUrl }} style={styles.avatar} />
                <View style={styles.postuser}>
                <Text style={styles.username}>{item.username}</Text>
                <Text style={styles.date}>
                      {new Date(item.createdAt).toLocaleString()}
                    </Text>
                </View>
                </View>
                
                    
                <View style={styles.actions}>
                  <IconButton icon='pencil'
                   
                    size={20}
                    color="blue"
                    onPress={() => {
                      console.log("Editing item:", item);
                      handleEdit(item._id, item.content)}}
                  />
                   <IconButton icon='trash-can'
                    size={20}
                    color="red"
                    onPress={() => handleDelete(item._id)}
                  />
                </View>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
     alignItems: "center", 


  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign:"right",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "rgb(133, 193, 240)",
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    fontSize: 16,
    width:"75%",
    height:80,
    alignItems:"center",
    backgroundColor:"#F5F5F5"
  },
  button: {
    backgroundColor: "rgb(10, 138, 236)",
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    width:"20%",
    marginRight:200
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign:"center",
   
    
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginBottom: 10,
  },
  post: {
    backgroundColor: "white",
    padding: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderTopColor:"rgb(93, 178, 221)",
    borderTopWidth: 1, 
     borderBottomLeftRadius: 10, 
    borderBottomRightRadius: 10,
    shadowColor: "#aaa", 
    shadowOffset: { width: -2, height: -2 }, 
    shadowOpacity: 1, 
    shadowRadius: 3, 
    elevation: 3
    
    
    
  },
  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent:"center",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight:"bold",
    fontSize: 15,
  },
  date: {
    fontSize: 12,
    color: "gray",
   
  },
  content: {
    fontSize: 18,
    fontFamily:'Courier New',
    marginBottom: 10,
     
  },
  actions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 15,
  },
  postuser:{
    flexDirection:"column",
    // alignItems: "center",
  },
  logo: {
    height: 40,
    width: 40,
  },
  postImg:{
   flexDirection:"row"
  }
});

export default Welcome;
