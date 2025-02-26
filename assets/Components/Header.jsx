import React, { useState, useContext } from "react";
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from "react-native";
import { useNavigation } from "@react-navigation/native";
import axios from "axios";
import { UserContext,PostsContext } from "./user/Post-Context"; 
import { Drawer } from "react-native-paper";
import { Ionicons, MaterialIcons } from "@expo/vector-icons"; // Icons for mobile menu
// import LinearGradient from "react-native-linear-gradient";

const Header = () => {
  const navigation = useNavigation();
  const { username, setUsername } = useContext(UserContext);
  const { setPosts } = useContext(PostsContext);
  const [menuOpen, setMenuOpen] = useState(false);
 

  const handleLogout = async () => {
    try {
      const response = await axios.post("https://full-stack-shop-backend.vercel.app/logout");
      if (response.status === 200) {
        setUsername(null);
        setPosts([]);
        Alert.alert("Logged Out", "You have been logged out successfully.");
        navigation.navigate("Signin"); 
      }
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  // Navigation links
  const navigationLinks = [
    { name: "Thoughts", screen: "ThoughtsScreen" },
    { name: "Message", screen: "MessageScreen" },
    { name: "Marketplace", screen: "MarketplaceScreen" },
    { name: "About", screen: "AboutScreen" },
  ];

  // Unique user color generator
  const getUserColor = (username) => {
    if (!username) return "#4A5568";
    const hash = username.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const colors = ["#E53E3E", "#3182CE", "#48BB78", "#D69E2E", "#805AD5"];
    return colors[hash % colors.length];
  };

  return (
//     <LinearGradient 
//     colors={["#B3E5FC", "#E3F2FD", "#F5F5F5"]} 
//     style={styles.background}
//   >
    
    <View style={styles.header}>
      {/* Logo */}
      <Image
        source={{ uri: "https://img.freepik.com/premium-vector/blue-waves-simple-logo-design_302761-1052.jpg?w=996" }}
        style={styles.logo}
      />

      {/* Welcome Message */}
    
      <View style={styles.userContainer}>
    <Text style={[styles.welcomeText, { color: getUserColor(username) }]}>
      Welcome, {username ? username.charAt(0).toUpperCase() + username.slice(1) : "Guest"}!
    </Text>
  
 

      {/* Mobile Menu Icon */}
      <TouchableOpacity onPress={() => setMenuOpen(!menuOpen)} style={styles.menuButton}>
        <Ionicons name={menuOpen ? "close" : "menu"} size={24} color="black" />
      </TouchableOpacity>
      </View>
      
  
      
      {menuOpen && (
        <Drawer.Section style={styles.drawer}>
          {navigationLinks.map((item) => (
            <TouchableOpacity
              key={item.name}
              style={styles.navItem}
              onPress={() => {
                setMenuOpen(false);
                navigation.navigate(item.screen);
              }}
            >
              <Text style={styles.navText}>{item.name}</Text>
            </TouchableOpacity>
          ))}
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <MaterialIcons name="logout" size={20} color="red" />
            <Text style={styles.logoutText}>Log out</Text>
          </TouchableOpacity>
        </Drawer.Section>
      )}
    </View>
    // </LinearGradient>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
   padding: 15,
    backgroundColor: "#fff",
    elevation: 4, // Shadow effect
    justifyContent:"space-between",
    alignItems: "center",
  },
  logo: {
    height: 80,
    width: 80,
  },
  userContainer: {
    flexDirection: "column", 
    alignItems: "center",
  },
  welcomeText: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 5, 
  },
  menuButton: {
    padding: 8,
    marginTop: 5, 
  },
//   background: {
//     flex: 1, 
//     paddingVertical: 20, 
//     paddingHorizontal: 15,
//   },
 
  drawer: {
    position: "absolute",
    top: 60,
    right: 10,
    width: 180,
    backgroundColor: "#fff",
    elevation: 6,
    borderRadius: 8,
    paddingVertical: 10,
  },
  navItem: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#ddd",
  },
  navText: {
    fontSize: 16,
    color: "#333",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    marginTop: 10,
  },
  logoutText: {
    fontSize: 16,
    color: "red",
    marginLeft: 5,
  },
});

export default Header;
