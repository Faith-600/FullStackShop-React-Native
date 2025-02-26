import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const Alert = ({ show, msg, type, onClose }) => {
  if (!show) return null;

  return (
    <View style={[styles.alert, type === 'danger' ? styles.danger : styles.success]}>
      <Icon name={type === 'danger' ? 'exclamation-circle' : 'check-circle'} size={20} color="white" />
      <Text style={styles.message}>{msg}</Text>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text style={styles.closeText}>Close</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  alert: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 5,
    margin: 10,
  },
  danger: {
    backgroundColor: 'red',
  },
  success: {
    backgroundColor: 'green',
  },
  message: {
    color: 'white',
    marginLeft: 10,
    flex: 1,
  },
  closeButton: {
    marginLeft: 'auto',
    padding: 5,
  },
  closeText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default Alert;
