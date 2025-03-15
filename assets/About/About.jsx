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
              source={{ uri: "https://www.farmersalmanac.com/wp-content/uploads/2018/02/Cheers-Champagne-New-Years-as_262292829.jpeg" }}
              style={styles.logo}
            />

      <Text style= {styles.heading}>Our Story</Text>
      <Text style={styles.textContainer}>
        Hi, I'm Faith Ezekiel, the creator of FullStackShop. 
      I've always been curious about my friends' wider circles,wanting to connect
       with their friends and get to know them better. That's
        why I built this app. FullStackShop is designed to bridge those connections,
         helping people like me build new friendships and discover more about the people in our extended networks. Plus, it's
          a great way to support each other,if someone has a business, 
          I can patronize it, and they can do the same for others. 
          My goal is to create a community where we can connect, grow, and thrive together..  
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