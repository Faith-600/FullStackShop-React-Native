import React, { useState, useEffect,useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import axios from 'axios';
import { UserContext } from './assets/Components/user/Post-Context';
import { Text,StyleSheet,View, } from 'react-native';
import Chats from './assets/Components/Chats';
import SignIn from './assets/Components/Signin';
import Welcome from './assets/Components/Welcome';
import SignUp from './assets/Components/SignUp';
import Header from './assets/Components/Header';
import Message from './assets/ChatWeb/Message';
import Market from './assets/Redux/Market';
import ItemsDetail from './assets/Redux/ItemsDetail';
import Checkout from './assets/Redux/Checkout';

const Stack = createStackNavigator();

function MainApp() {
    const {setUsername} = useContext(UserContext);
    const [loading, setLoading] = useState(true);
  
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
     
      {/* <Stack.Screen name="NotFound" component={NotFound} />  */}
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