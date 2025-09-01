import { StyleSheet, Text, View } from 'react-native';
import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import LoginScreen from './src/Screens/LoginScreen.jsx';
import HomeScreem from './src/Screens/HomeScreem.jsx';
import CartScreen from './src/Screens/CartScreen.jsx';
import { NavigationContainer } from '@react-navigation/native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { CartContext, CartProvider } from './src/Context/CartContext.jsx';
import CartIcon from './src/Icons/CartIcon.jsx';
import HomeIcon from './src/Icons/HomeIcon.jsx';
import Splash from './src/Screens/Splash.jsx';
import ProfileScreen from './src/Screens/ProfileScreen.jsx';
import ProductDetailsScreen from './src/Screens/ProductDetailsScreen.jsx';
import ProfileIcon from './src/Icons/ProfileIcon.jsx';
const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: 'tomato',
        tabBarInactiveTintColor: 'gray',
        tabBarIcon: ({ color, size }) => {
          if (route.name === 'Home') {
            return <HomeIcon color={color} size={size + 6} />;
          } else if (route.name === 'Cart') {
            return <CartIcon color={color} size={size + 6} />;
          } else if (route.name === 'Profile') {
            return <ProfileIcon color={color} size={size + 6} />;
          }
        },
        tabBarStyle: {
          height: 70,
          paddingTop: 10,
        },
      })}
    >
      <Tab.Screen name="Home" component={HomeScreem} />
      <Tab.Screen name="Cart" component={CartScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};

const StackNavigator = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName="Splash"
    >
      <Stack.Screen name="Splash" component={Splash} />

      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="Main" component={TabNavigator} />
      <Stack.Screen name="ProductDetails" component={ProductDetailsScreen} />
    </Stack.Navigator>
  );
};

const App = () => {
  return (
    <SafeAreaProvider>
      <CartProvider>
        <NavigationContainer>
          <StackNavigator />
        </NavigationContainer>
      </CartProvider>
    </SafeAreaProvider>
  );
};

export default App;

const styles = StyleSheet.create({});
