import React, { useContext, useState, useEffect } from "react";
import { View, Text, Image, FlatList, StyleSheet, ScrollView, Alert } from "react-native";
import { UserContext,PostsContext } from "./user/Post-Context";
import Comment from "./Comment";
import CommentForm from "./CommentForm";


export default function Chats() {
  const { posts } = useContext(PostsContext);
  const { username } = useContext(UserContext);
  const [comments, setComments] = useState([]);


  // Fetch comments for a post
  const fetchComments = async (postId) => {
     try {
      const response = await fetch(
        `https://full-stack-shop-backend.vercel.app/api/posts/${postId}/comments`
      );
      // console.log("Response Status:", response.status);

      if (!response.ok) {
        throw new Error(`Failed to fetch comments. Status: ${response.status}`);
      }

      const data = await response.json();
     
      setComments((prevComments) => {
        const newComments = data.filter(
          (newComment) =>
            !prevComments.some(
              (existingComment) =>
                existingComment.id === newComment.id && existingComment.postId === newComment.postId
            )
        );
        return [...prevComments, ...newComments];
      });
    } catch (error) {
      console.error("Error fetching comments:", error);
    }
  };


  useEffect(() => {
    if (posts.length > 0) {
      posts.forEach((post) => {
        // Fetch only if comments for this post haven't been loaded
        const commentsForPost = comments.filter((comment) => comment.postId === post._id);
        if (commentsForPost.length === 0  && post._id) {
          fetchComments(post._id);
        }
      });
    }
  }, []);


  // Add a new comment
  const addComment = async (text, postId) => {
  if (!text) return;


  if (!postId) {
    console.error("Error: postId is undefined or missing!");
    Alert.alert("Error", "Post ID is missing.");
    return;
  }

  if (!postId) {
    console.error(" Error: postId is undefined or missing!");
    Alert.alert("Error", "Post ID is missing.");
    return;
  }

  try {
    const response = await fetch(
      `https://full-stack-shop-backend.vercel.app/api/posts/${postId}/comments`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content: text, username }),
      }
    );

   

    if (!response.ok) throw new Error("Failed to save comment");

    const newComment = await response.json();
    setComments((prevComments) => [...prevComments, { ...newComment, username, postId }]);
  } catch (err) {
    console.error("Failed to create comment:", err);
    Alert.alert("Error", "Failed to create comment.");
  }
};

  // Render each post
  const renderPost = ({ item: post }) => {
    const postComments = comments.filter((comment) => comment.postId === post._id);

    return (
      <View style={styles.postContainer}>
        <View style={styles.userInfo}>
          <Image source={{ uri: `https://robohash.org/${post.username}` }} style={styles.avatar} />
          <View>
            <Text style={styles.username}>{post.username}</Text>
            <Text style={styles.postContent}>{post.content}</Text>
          </View>
        </View>

        {/* Comment Form */}
        <CommentForm submitLabel="Reply" handleSubmit={(text) =>{
       if (post && post._id) {
      addComment(text, post._id);
    } else {
      console.error("Post ID is missing.");
      Alert.alert("Error", "Post ID is missing.");
    }}}  />

        {/* Comments */}
        <FlatList
          data={postComments}
          keyExtractor={(comment) => `comment-${comment.postId}-${comment._id}`}
          renderItem={({ item: comment }) => (
            <Comment
              comment={comment}
              replies={[]}
              addReply={(text) => addComment(text, comment._id)}
              avatarUrl={`https://robohash.org/${comment.username}`}
            />
          )}
        />
      </View>
    );
  };

  return (
    <FlatList
    style={styles.container}
    data={posts}
    keyExtractor={(post) => `post-${post._id}`}
    renderItem={renderPost}
    ListEmptyComponent={<Text style={styles.noPosts}>No posts available</Text>}
  />
  
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingHorizontal: 16,
    paddingVertical: 24,
    flexShrink: 1
  },
  postContainer: {
    backgroundColor: "#f9f9f9",
    padding: 16,
    borderRadius: 10,
    marginBottom: 16,
  },
  userInfo: {
    marginBottom: 8,
  },
  avatar: {
    width: 46,
    height: 46,
    borderRadius: 24,
    marginRight:"auto",
  },
  username: {
    fontSize: 16,
    fontWeight: "bold",
  },
  postContent: {
    fontSize: 14,
    color: "#333",
  },
  noPosts: {
    textAlign: "center",
    fontSize: 16,
    marginTop: 20,
    color: "#888",
  },
});

