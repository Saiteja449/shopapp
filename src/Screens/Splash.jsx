import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import React, { useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const Splash = () => {
  const navigation = useNavigation();

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const user = await AsyncStorage.getItem('user');
        setTimeout(() => {
          if (user) {
            navigation.replace('Main');
          } else {
            navigation.replace('LoginScreen');
          }
        }, 1500); 
      } catch (error) {
        navigation.replace('LoginScreen');
      }
    };

    checkLogin();
  }, [navigation]);

  return (
    <View style={styles.container}>
      <Text style={styles.brand}>ShopEase</Text>
      <ActivityIndicator size="large" color="#fff" style={{ marginTop: 20 }} />
    </View>
  );
};

export default Splash;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ff6f61',
    justifyContent: 'center',
    alignItems: 'center',
  },
  brand: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
  },
});
