import React from 'react';
import { View, Text, Image, ActivityIndicator, StyleSheet, ScrollView } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { useRoute } from '@react-navigation/native';
import { FontAwesome } from '@expo/vector-icons';

function ItemsDetail() {
  const route = useRoute();
  const { id } = route.params;

  const { data: item, isLoading, error } = useQuery({
    queryKey: ['item', id],
    queryFn: async () => {
      const response = await axios.get(`https://fakestoreapi.com/products/${id}`);
      return response.data;
    },
  });

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" style={styles.loader} />;
  }

  if (error) {
    return <Text style={styles.error}>Error fetching product details: {error?.message}</Text>;
  }

  if (!item) {
    return <Text style={styles.error}>Product not found.</Text>;
  }

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image */}
      <Image source={{ uri: item.image }} style={styles.image} resizeMode="contain" />

      {/* Product Title */}
      <Text style={styles.title}>{item.title}</Text>

      {/* Price */}
      <Text style={styles.price}>${item.price}</Text>

      {/* Reviews */}
      <View style={styles.reviews}>
        {[0, 1, 2, 3, 4].map((rating) => (
          <FontAwesome
            key={rating}
            name="star"
            size={20}
            color={rating < 4 ? 'gold' : 'gray'}
            style={styles.starIcon}
          />
        ))}
        <Text style={styles.reviewText}>117 reviews</Text>
      </View>

      {/* Description */}
      <Text style={styles.detailsTitle}>Details</Text>
      <Text style={styles.description}>{item.description || 'No additional details available.'}</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 16,
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
  image: {
    width: '100%',
    height: 300,
    alignSelf: 'center',
    marginBottom: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginTop: 5,
  },
  reviews: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 10,
  },
  starIcon: {
    marginRight: 3,
  },
  reviewText: {
    marginLeft: 5,
    fontSize: 14,
    color: 'gray',
  },
  detailsTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 15,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
});

export default ItemsDetail;
