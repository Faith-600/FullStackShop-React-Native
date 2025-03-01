import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { UserContext } from "./user/Post-Context";


export default function CommentForm({ handleSubmit, submitLabel }) {
  const [text, setText] = useState("");
  const [isReplying, setIsReplying] = useState(false);
  const { username } = useContext(UserContext);

  // Toggle reply form visibility
  const toggleReplyForm = () => {
    setIsReplying(!isReplying);
  };

  const onSubmit = () => {
    if (text.trim() !== "") {
      handleSubmit(text); // Pass the comment text to the parent handler
      setText(""); // Clear the input
      setIsReplying(false); // Hide the reply form after submission
    }
  };

  return (
    <View>
      {isReplying && ( // Only show the form when replying
        <View style={styles.commentBox}>
          <TextInput
            style={styles.textInput}
            value={text}
            onChangeText={setText}
            placeholder="Write your comment..."
            multiline
          />
          <View style={styles.buttonContainer}>
            <TouchableOpacity
              onPress={onSubmit}
              disabled={username.toLowerCase() === "guest"}
            >
              <Text
                style={[
                  styles.submitButton,
                  username.toLowerCase() === "guest" && styles.disabledButton,
                ]}
              >
                Submit
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={toggleReplyForm}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
          </View>
        </View>
      )}

      {!isReplying && (
        <TouchableOpacity
          onPress={toggleReplyForm}
          disabled={username.toLowerCase() === "guest"}
        >
          <Text
            style={[
              styles.replyButton,
              username.toLowerCase() === "guest" && styles.disabledButton,
            ]}
          >
            {submitLabel}
          </Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  commentBox: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 8,
    marginVertical: 8,
  },
  textInput: {
    height: 60,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
    paddingHorizontal: 8,
    marginBottom: 8,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  submitButton: {
    color: "#007bff",
    fontSize: 14,
  },
  cancelButton: {
    color: "#dc3545",
    fontSize: 14,
  },
  replyButton: {
    color: "#007bff",
    fontSize: 14,
    marginVertical: 5,
  },
  disabledButton: {
    color: "#aaa",
  },
});
