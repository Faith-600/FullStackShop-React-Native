import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

function Subtotal() {
  const getTotal = (cart) => {
    return cart.reduce((amount, item) => parseFloat(item.price + amount), 0);
  };

  const cart = useSelector((state) => state.cart);

  return (
    <View style={styles.container}>
      <View style={styles.subtotalContainer}>
        <Text style={styles.subtotalText}>Subtotal</Text>
        <Text style={styles.totalText}>
          ({cart.cart.length} items): ${getTotal(cart.cart).toFixed(2)}
        </Text>
      </View>

      <TouchableOpacity style={styles.checkoutButton}>
        <Text style={styles.checkoutText}>Checkout</Text>
      </TouchableOpacity>

      <View style={styles.continueShoppingContainer}>
        <Text style={styles.orText}>or</Text>
        <TouchableOpacity>
          <Text style={styles.continueShoppingText}>
            Continue Shopping →
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    marginHorizontal: 20,
    marginTop: 20,
  },
  subtotalContainer: {
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    paddingBottom: 10,
    marginBottom: 10,
  },
  subtotalText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  totalText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginTop: 5,
  },
  checkoutButton: {
    backgroundColor: '#4F46E5',
    paddingVertical: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  continueShoppingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 15,
  },
  orText: {
    fontSize: 14,
    color: '#666',
  },
  continueShoppingText: {
    fontSize: 14,
    color: '#4F46E5',
    fontWeight: 'bold',
    marginLeft: 5,
  },
});

export default Subtotal;
