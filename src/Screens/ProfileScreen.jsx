import React, { useContext } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { CartContext } from '../Context/CartContext';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProfileScreen = () => {
  const { user, setUser, setIsLoggedIn, setCart } = useContext(CartContext);
  const navigation = useNavigation();

  const handleLogout = async () => {
    try {
      await AsyncStorage.clear(); 
      setUser(null);
      setCart([]);
      setIsLoggedIn(false);

      Alert.alert('Logged Out', 'You have been logged out successfully.');

      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [{ name: 'Splash' }],
        }),
      );
    } catch (error) {
      console.log('Error clearing async storage:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Profile</Text>
      {user && (
        <View style={styles.userInfo}>
          <Text style={styles.label}>Email</Text>
          <Text style={styles.value}>{user.email}</Text>
        </View>
      )}
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>My Orders</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Settings</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.option}>
        <Text style={styles.optionText}>Help & Support</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 24,
  },
  userInfo: {
    paddingVertical: 12,
    alignSelf: 'center',
    borderBottomColor: '#ddd',
  },
  label: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
  },
  value: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 4,
  },
  option: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
  },
  logoutBtn: {
    marginTop: 'auto',
    backgroundColor: '#ff4444',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
