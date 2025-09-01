import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import React, { useContext } from 'react';
import { CartContext } from '../Context/CartContext';
import BackIcon from '../Icons/BackIcon';
import { useNavigation } from '@react-navigation/native';

const Header = ({ isHome = true }) => {
  const { user } = useContext(CartContext);
  const navigation = useNavigation();
  return (
    <View style={styles.header}>
      {isHome ? (
        <View style={styles.header1}>
          <Text style={styles.welcome}>Welcome 👋</Text>
          <Text style={styles.email}>{user?.email || 'Email'}</Text>
        </View>
      ) : (
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <BackIcon size={28} />
        </TouchableOpacity>
      )}
      <Text style={styles.title}>ShopEase</Text>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#ff6347',
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    justifyContent: 'space-between',
    height:70
  },
  header1: { backgroundColor: '#ff6347' },
  welcome: { fontSize: 15, color: '#fff', fontWeight: '600' },
  email: { color: '#fff', marginTop: 4 },
  // logo: {
  //   width: 40,
  //   height: 40,
  //   marginRight: 10,
  //   borderRadius: 8,
  // },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 1,
  },
});
