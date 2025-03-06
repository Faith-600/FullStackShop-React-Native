import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons'; 


function Heading() {
    const cart = useSelector(state => state.cart.cart);
    const navigation = useNavigation(); 
     
     

    return (
        <TouchableOpacity 
            style={styles.container} 
            onPress={() => navigation.navigate('Checkout')} 
        >
           
            <View style={styles.cartBadge}>
                <Text style={styles.cartText}>{cart.length}</Text>
            </View>
            <FontAwesome name="shopping-cart" size={24} color="black" />
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: "flex-end",
       marginRight:20
    },
    // cartBadge: {
        // position: 'absolute',
        // right: -10,
        // top: -5,
    //     backgroundColor: 'red',
    //     borderRadius: 10,
    //     width: 20,
    //     height: 20,
    //     justifyContent: 'center',
    //     alignItems: 'center',
    // },
    cartText: {
        color: 'black',
        fontSize: 12,
        fontWeight: 'bold',
    },
});

export default Heading;
