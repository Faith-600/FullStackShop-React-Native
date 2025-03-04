import React, { useContext } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Subtotal from './Subtotal';
import Removefromcart from './Removefromcart';
import { UserContext } from '../Components/user/Post-Context';


function Checkout() {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const { username } = useContext(UserContext);

    return (
        <View style={styles.container}>
            {!cart.cart || cart.cart.length === 0 ? (
                <Text style={styles.noItems}>No items added</Text>
            ) : (
                <FlatList
                    data={cart.cart}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.productContainer}>
                            <Image source={{ uri: item.image }} style={styles.image} />
                            <Text style={styles.title}>{item.title}</Text>
                            <Text style={styles.price}>${item.price}</Text>
                            <TouchableOpacity
                                style={styles.button}
                                onPress={() => dispatch(Removefromcart(item.id, username))}
                            >
                                <Text style={styles.buttonText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    )}
                />
            )}
            <Subtotal />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    noItems: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 20,
        color: 'gray',
    },
    productContainer: {
        backgroundColor: '#f9f9f9',
        padding: 10,
        marginBottom: 10,
        borderRadius: 10,
        alignItems: 'center',
    },
    image: {
        width: 100,
        height: 100,
        borderRadius: 10,
    },
    title: {
        marginTop: 10,
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    price: {
        fontSize: 14,
        color: 'green',
        marginTop: 5,
    },
    button: {
        marginTop: 10,
        backgroundColor: 'red',
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 14,
        fontWeight: 'bold',
    },
});

export default Checkout;
