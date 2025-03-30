import React, { useState, useEffect,useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import { UserContext } from './assets/Components/user/Post-Context';
import { Text,StyleSheet,View,Platform, TouchableOpacity,Alert } from 'react-native';
import Chats from './assets/Components/Chats';
import SignIn from './assets/Components/Signin';
import Welcome from './assets/Components/Welcome';
import SignUp from './assets/Components/SignUp';
import Header from './assets/Components/Header';
import Message from './assets/ChatWeb/Message';
import Market from './assets/Redux/Market';
import ItemsDetail from './assets/Redux/ItemsDetail';
import Checkout from './assets/Redux/Checkout';
import About from './assets/About/About';
import * as Notifications from 'expo-notifications'
import * as Device from 'expo-device';

const Stack = createStackNavigator();

async function registerForPushNotificationsAsync() {
  if (!Device.isDevice) {
    Alert.alert('Error', 'Must use a physical device');
    return null;
  }
  const { status } = await Notifications.getPermissionsAsync();
  let finalStatus = status;
  if (status !== 'granted') {
    const { status: newStatus } = await Notifications.requestPermissionsAsync();
    finalStatus = newStatus;
  }
  if (finalStatus !== 'granted') {
    Alert.alert('Error', 'Push notification permissions denied');
    return null;
  }
  try {
    const token = (await Notifications.getExpoPushTokenAsync()).data; // No projectId needed after publish
    console.log('Expo Push Token:', token);
    return token;
  } catch (error) {
    console.error('Token error:', error);
    Alert.alert('Token Error', error.message);
    return null;
  }
}

function MainApp() {
    const {setUsername,username} = useContext(UserContext);
    const [loading, setLoading] = useState(true);

    // const updateTokenOnBackend = async (username, token) => {
    //   try {
    //     // console.log('Sending:', { name: username, pushToken: token });
    //     await axios.post('https://full-stack-shop-backend.vercel.app/update-token', {
    //       name: username,
    //       pushToken: token,
    //     });
    //   } catch (error) {
    //     console.error('Error updating token:', error.message);
    //   }
    // };
    // useEffect(() => {
    //   registerForPushNotificationsAsync().then((token) => {
    //     if (token) {
    //       updateTokenOnBackend(username, token);
    //     }
    //   });
    // }, [username]);

   useEffect(() => {
        console.log("Fetching user data...");
      axios
        .get('https://full-stack-shop-backend.vercel.app')
        .then((res) => {
            console.log("usernames", res.data);
          if (res.data.valid) {
            console.log("Setting username to:", res.data.user.name); // Log before updating state

            setUsername(res.data.user.name);
          } else {
            console.log("Setting username to: Guest");
            setUsername('Guest');
          }
        })
        .catch((err) => console.error(err))
        .finally(() => setLoading(false));
    }, []);
  
    if (loading) {
      return(
        <View style={styles.loadingContainer}>
        <Text style={styles.load}>Loading...</Text>
      </View>
    )
    }
  return (
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName="SignIn"
      screenOptions={{
        header: () => <Header />, 
      }}
    >

      <Stack.Screen name="SignIn" component={SignIn} options={{ headerShown: false }} />
      <Stack.Screen name="Signup" component={SignUp}   options={{ headerShown: false }}/>
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Chats" component={Chats} />
      <Stack.Screen name="Message" component={Message} />
      <Stack.Screen name="Market" component={Market} />
      <Stack.Screen name="ItemsDetail" component={ItemsDetail} />
      <Stack.Screen name="Checkout" component={Checkout} />
      <Stack.Screen name="About" component={About} />
    </Stack.Navigator>
    
  </NavigationContainer>
);

}
const styles = StyleSheet.create({
    loadingContainer: {
      flex: 1,
      alignItems: "center",
     
    },
    load: {
      fontSize: 18,
      fontWeight: "bold",
      margin:"auto"
     },
   
  })

export default MainApp