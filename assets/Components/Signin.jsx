import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";
import { UserContext } from "./user/Post-Context";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as Notifications from 'expo-notifications'
import { loadCart } from "../Redux/LoadCart";
import { useDispatch } from "react-redux";



export default function SignIn() {
  const dispatch = useDispatch();
  const [values, setValues] = useState({ email: "", password: "" });
  const {  setUsername } = useContext(UserContext);
  const navigation = useNavigation();

  const handleInput = (name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }));
  };


 

  const handleSubmit = async () => {
    if (!values.email || !values.password) {
      setUsername("Guest");
      navigation.navigate("Welcome");
      return;
    }
  
    try {


       // Get the Expo Push Token
    const pushToken = await registerForPushNotificationsAsync();
    console.log('Push Token:', pushToken);

      const res = await axios.post("https://full-stack-shop-backend.vercel.app/login",{
     ...values,
        pushToken:pushToken || undefined
      } );
  
      if (res.data.Login) {
        const loggedInUsername = res.data.user.name;
        setUsername(loggedInUsername);
        await AsyncStorage.setItem("userId", res.data.user._id); 
          dispatch(loadCart(loggedInUsername)); 
         navigation.navigate("Welcome");
      } else {
        Alert.alert("Error", "Password or Email is incorrect");
      }
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert("Error", "An error occurred during login. Please try again.");
    }
  };
  
  // Function to request permission & get Expo Push Token
async function registerForPushNotificationsAsync() {
  const { status } = await Notifications.getPermissionsAsync();
  if (status !== "granted") {
    Alert.alert("Permission Denied", "Push notifications are disabled.");
    return null;
  }

  const tokenData = await Notifications.getExpoPushTokenAsync();
  return tokenData.data;
}

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://img.freepik.com/premium-vector/blue-waves-simple-logo-design_302761-1052.jpg?w=996" }}
        style={styles.logo}
      />
      <Text style={styles.title}>Sign in to your account</Text>

      <TextInput
        placeholder="Email address"
        style={styles.input}
        onChangeText={(text) => handleInput("email", text)}
      />
      <TextInput
        placeholder="Password"
        style={styles.input}
        secureTextEntry
        onChangeText={(text) => handleInput("password", text)}
      />

      <TouchableOpacity onPress={handleSubmit} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate("Welcome")} style={styles.button}>
        <Text style={styles.buttonText}>Guest User</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        Don't have an account?{" "}
        <Text onPress={() => navigation.navigate("Signup")} style={styles.signupLink}>
          Sign up
        </Text>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    justifyContent:"center"
  },
  logo: {
    width: 100,
    height: 100,
    marginTop: 30,

  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
    color: "#333",
  },
  input: {
    width: "65%",
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    marginBottom: 12,
  },
  button: {
    backgroundColor: "#4F46E5",
    padding: 12,
    borderRadius: 8,
    width: "65%",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupText: {
    marginTop: 20,
    fontSize: 14,
    color: "#555",
  },
  signupLink: {
    color: "#4F46E5",
    fontWeight: "bold",
  },
});
