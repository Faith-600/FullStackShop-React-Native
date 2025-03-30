import React from 'react'
import { View,Text,StyleSheet,Image,ScrollView,TouchableOpacity,Linking } from 'react-native'
import { IconButton } from 'react-native-paper';
function About() {
  const openGitHub = () => {
    Linking.openURL('https://github.com/Faith-600');
  };
  return (
     <ScrollView nestedScrollEnabled>
      <Image
              source={{ uri: "https://i0.wp.com/picjumbo.com/wp-content/uploads/cheers-free-photo.jpg?w=2210&quality=70" }}
              style={styles.logo}
            />

      <Text style= {styles.heading}>Our Story</Text>
      <Text style={styles.textContainer}>
      Hi 👋🏽👋🏻👋🏿, I'm Faith Ezekiel, the creator of CircleKonnect.
      CircleKonnect is my first major project since transitioning into tech. What started as a simple login and signup project soon grew into something bigger.
    I've always been curious about my friends' wider circles,wanting to connect with their friends and get to know them better. That curiosity inspired me to build CircleConnect, a platform designed to bridge connections, expand friendships, and help people discover more about their extended networks.
   Beyond just social connections, CircleConnect is also about supporting each other. If a friend has a business, I can patronize it, and they can do the same for others. My goal is to create a thriving community where we can connect, grow, and succeed together
      </Text>
      <TouchableOpacity onPress={openGitHub}>
        <Text style={styles.linkText}><IconButton icon="github" size={30} />
        </Text>
        <Text style={styles.linkText}>Visit My Github Profile</Text>
      </TouchableOpacity>
     </ScrollView>
    
  )
}

const styles  = StyleSheet.create({
  container:{
    

  },
   logo: {
    height: 300, 
    borderRadius: 10, 
  },
  heading:{
    textAlign:"center",
    fontSize:20,
    borderTop:10,
    fontWeight:"bold"

  },
  textContainer:{
  fontFamily:"Courier New",
    fontSize:18,
    lineHeight:30,
    padding:20,
 },
 linkText:{
 textAlign:"center",
 fontSize:15
 }

})

export default About