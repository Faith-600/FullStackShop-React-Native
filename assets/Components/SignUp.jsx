import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, Alert } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/native";

const SignUp = () => {
  const [values, setValues] = useState({ name: "", email: "", password: "" });
  const navigation = useNavigation();

  const handleInput = (key, value) => {
    setValues((prev) => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async () => {
    const namePattern = /^[A-Za-z]{2,50}$/;
    const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!namePattern.test(values.name)) {
      showAlert("Name must be 2-50 alphabetic characters long.");
      return;
    }
    if (!passwordPattern.test(values.password)) {
      showAlert("Password must be at least 8 characters long and contain uppercase, lowercase, number, and special character.");
      return;
    }

    try {
      const res = await axios.post("https://full-stack-shop-backend.vercel.app/users", values);
      console.log(res);
      navigation.navigate("SignIn");
    } catch (err) {
      console.log(err.response);
      if (err.response?.data?.message === "Email already in use") {
        showAlert("This email is already registered. Please use a different email.");
      } else {
        showAlert("An error occurred during registration. Please try again.");
      }
    }
  };

  const showAlert = (msg) => {
    Alert.alert("Error", msg, [{ text: "OK" }]);
  };

  return (
    <View style={styles.container}>
      <Image
        source={{ uri: "https://img.freepik.com/premium-vector/blue-waves-simple-logo-design_302761-1052.jpg?w=996" }}
        style={styles.logo}
      />
      <Text style={styles.title}>Sign Up</Text>

      <TextInput
        placeholder="Username"
        style={styles.input}
        onChangeText={(text) => handleInput("name", text)}
      />
      
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        style={styles.input}
        onChangeText={(text) => handleInput("email", text)}
      />
      
      <TextInput
        placeholder="Password"
        secureTextEntry
        style={styles.input}
        onChangeText={(text) => handleInput("password", text)}
      />

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.signInText}>
        Already have an account?{" "}
        <TouchableOpacity onPress={() => navigation.navigate("SignIn")}>
          <Text style={styles.signInLink}>Sign In</Text>
        </TouchableOpacity>
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
    backgroundColor: "#fff",
    justifyContent:"center"
  },
  logo: {
    width: 80,
    height: 80,
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
  },
  input: {
    width: "65%",
    height: 50,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  button: {
    width: "65%",
    backgroundColor: "#4F46E5",
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: "center",
    marginBottom: 15,
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
  signInText: {
    fontSize: 14,
    color: "#555",
  },
  signInLink: {
    color: "#4F46E5",
    fontWeight: "bold",
  },
});

export default SignUp;
