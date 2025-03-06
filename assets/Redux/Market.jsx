import React, { useContext, useEffect } from 'react';
import { View, Text, Image, FlatList, TouchableOpacity, ActivityIndicator, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import Addtocart from './AddToCart';
import { UserContext } from '../Components/user/Post-Context';
import { useNavigation } from '@react-navigation/native';
import Heading from './Heading';
import   { loadCart }  from './LoadCart';

function Market() {
  const { username } = useContext(UserContext);
  const dispatch = useDispatch();
  const navigation = useNavigation();

  const handleAddToCart = (product) => {
    dispatch(Addtocart(product));
  };

  useEffect(() => {
   dispatch(loadCart(username))
  }, [username, dispatch]);

  const { isLoading, data: products, error } = useQuery({
    queryKey: ['marketplace'],
    queryFn: async () => {
      const response = await axios.get('https://fakestoreapi.com/products');
      return response.data;
    },
  });

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.error}>Error: {error.message}</Text>;
  }

  return (
    <View style={styles.container}>
      <Heading />
      <FlatList
        data={products}
        keyExtractor={(item, index) => `${item.id}-${index}`}
        numColumns={2}
        contentContainerStyle={styles.list}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={styles.card}
            onPress={() => navigation.navigate('ItemsDetail', { id: item.id })}
          >
            <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />
            <Text style={styles.title}>{item.title}</Text>
            <Text style={styles.price}>${item.price}</Text>
            <TouchableOpacity
              style={[
                styles.cartButton,
                username === 'Guest' && styles.disabledButton,
              ]}
              onPress={() => handleAddToCart(item)}
              disabled={username === 'Guest'}
            >
              <Text style={styles.buttonText}>Add to Cart</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loader: {
    marginTop: 20,
  },
  error: {
    color: 'red',
    textAlign: 'center',
    marginTop: 20,
  },
  list: {
    paddingHorizontal: 10,
    paddingVertical: 20,
  },
  card: {
    flex: 1,
    margin: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 10,
    alignItems: 'center',
    elevation: 3,
  },
  image: {
    width: 120,
    height: 120,
  },
  title: {
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  cartButton: {
    marginTop: 10,
    backgroundColor: '#007bff',
    padding: 8,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 14,
  },
  disabledButton: {
    backgroundColor: '#ccc',
  },
});

export default Market;
