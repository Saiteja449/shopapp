import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { createContext, useEffect, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [user, setUser] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const savedCart = await AsyncStorage.getItem('cart');
        if (savedCart) {
          setCart(JSON.parse(savedCart));
        }
      } catch (error) {
        console.log('Error loading cart:', error);
      }
    };
    loadCart();
  }, []);

  const saveCart = async updatedCart => {
    try {
      setCart(updatedCart);
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
    } catch (error) {
      console.log('Error saving cart:', error);
    }
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('user');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.log(error);
        setIsLoggedIn(false);
      }
    };
    fetchUser();
  }, []);

  const addToCart = product => {
    const updatedCart = (() => {
      const existing = cart.find(item => item.id === product.id);
      if (existing) {
        return cart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item,
        );
      } else {
        return [...cart, { ...product, quantity: product.quantity || 1 }];
      }
    })();
    saveCart(updatedCart);
  };

  const removeFromCart = (id, removeCompletely = false) => {
    const updatedCart = cart
      .map(item => {
        if (item.id === id) {
          if (removeCompletely || item.quantity === 1) {
            return null;
          }
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      })
      .filter(item => item !== null);
    saveCart(updatedCart);
  };

  const decreaseQuantity = productId => {
    const updatedCart = cart
      .map(item =>
        item.id === productId ? { ...item, quantity: item.quantity - 1 } : item,
      )
      .filter(item => item.quantity > 0);
    saveCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        decreaseQuantity,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        setCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
