import React, { useEffect } from "react";
import { View, SafeAreaView, ScrollView } from "react-native";
import axios from "axios";
import Header from "./Header";




const Layout = ({ posts, setPosts, children }) => {
  useEffect(() => {
    axios
      .get("https://full-stack-shop-backend.vercel.app/posts")
      .then((res) => {
        if (Array.isArray(res.data.posts)) {
          setPosts(res.data.posts);
        } else {
          console.error("Posts data is not an array:", res.data.posts);
        }
      })
      .catch((err) => console.error(err));
  }, []);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header />
      <ScrollView>
        <View style={{ padding: 10 }}>{children}</View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Layout;
