import React from "react";
import { View, Text, Image, StyleSheet, FlatList } from "react-native";
import CommentForm from "./CommentForm";


export default function Comment({ comment, replies, addReply, avatarUrl }) {
  return (
    <View style={styles.commentContainer}>
      <View style={styles.commentHeader}>
        {/* Commenter's Avatar */}
        <Image source={{ uri: avatarUrl }} style={styles.avatar} />
        <View>
          <Text style={styles.username}>{comment.username}</Text>
          <Text style={styles.commentText}>{comment.content}</Text>
        </View>
      </View>

      {/* Reply Form */}
      <View style={styles.replyForm}>
        <CommentForm
          submitLabel=""
          handleSubmit={(text) => addReply(text, comment.id)}
        />
      </View>

      {/* Replies List */}
      {replies?.length > 0 && (
        <FlatList
          data={replies}
          keyExtractor={(reply) => `reply-${reply.id}`}
          renderItem={({ item: reply }) => (
            <Comment
              comment={reply}
              replies={[]} // Handle nested replies if needed
              addReply={addReply}
              avatarUrl={`https://robohash.org/${reply.username}`}
            />
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  commentContainer: {
    marginLeft: 20,
    marginBottom: 16,
  },
  commentHeader: {
    marginBottom: 8,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  username: {
    fontWeight: "bold",
    fontSize: 14,
  },
  commentText: {
    fontSize: 14,
    color: "#333",
  },
  replyForm: {
    marginLeft: 20,
    marginTop: 10,
  },
});
