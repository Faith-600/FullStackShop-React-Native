import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Animated } from "react-native";

const Custom = ({ type, msg, removeAlert }) => {
  const [progress, setProgress] = useState(new Animated.Value(100));

  useEffect(() => {
    // Animate progress bar from 100% to 0% in 3 seconds
    Animated.timing(progress, {
      toValue: 0,
      duration: 3000,
      useNativeDriver: false, 
    }).start(() => {
      removeAlert();
    });
  }, [progress, removeAlert]);

  return (
    <View style={[styles.alert, type === "success" ? styles.success : styles.error]}>
      <Text style={styles.alertText}>{msg}</Text>
      <View style={styles.progressBarContainer}>
        <Animated.View
          style={[
            styles.progressBar,
            {
              width: progress.interpolate({
                inputRange: [0, 100],
                outputRange: ["0%", "100%"],
              }),
              backgroundColor: type === "success" ? "green" : "red",
            },
          ]}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  alert: {
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
  },
  success: {
    backgroundColor: "#d4edda",
  },
  error: {
    backgroundColor: "#f8d7da",
  },
  alertText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  progressBarContainer: {
    width: "100%",
    height: 5,
    backgroundColor: "#ddd",
    borderRadius: 5,
    overflow: "hidden",
    marginTop: 10,
  },
  progressBar: {
    height: 5,
  },
});

export default Custom;
