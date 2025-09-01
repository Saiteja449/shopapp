import React, { useContext, useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  FlatList,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import { CartContext } from '../Context/CartContext';
import Header from '../Components/Header';
import { SafeAreaView } from 'react-native-safe-area-context';

const ProductDetailsScreen = ({ route, navigation }) => {
  const { product } = route.params;
  const { addToCart } = useContext(CartContext);
  const [quantity, setQuantity] = useState(1);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const showToast = message => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Cart', message);
    }
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch('https://fakestoreapi.com/products');
        const data = await res.json();
        const filtered = data.filter(p => p.id !== product.id);
        setRelatedProducts(filtered.slice(0, 6));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, [product.id]);

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Header isHome={false} />
      <ScrollView contentContainerStyle={styles.container}>
        <Image source={{ uri: product.image }} style={styles.image} />

        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.price}>${product.price}</Text>
        <Text style={styles.desc}>{product.description}</Text>

        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => setQuantity(prev => (prev > 1 ? prev - 1 : 1))}
          >
            <Text style={styles.qtyText}>-</Text>
          </TouchableOpacity>
          <Text style={styles.qtyNumber}>{quantity}</Text>
          <TouchableOpacity
            style={styles.qtyButton}
            onPress={() => setQuantity(prev => prev + 1)}
          >
            <Text style={styles.qtyText}>+</Text>
          </TouchableOpacity>
        </View>

        {/* Add to Cart Button */}
        <TouchableOpacity
          style={styles.addBtn}
          onPress={() => {
            addToCart({ ...product, quantity });
            showToast('Added to cart');
          }}
        >
          <Text style={styles.addBtnText}>Add to Cart</Text>
        </TouchableOpacity>

        {/* Go to Cart Button */}
        <TouchableOpacity
          style={[styles.addBtn, { backgroundColor: '#333' }]}
          onPress={() =>
            navigation.navigate('Main', {
              screen: 'Cart',
            })
          }
        >
          <Text style={styles.addBtnText}>Go to Cart</Text>
        </TouchableOpacity>

        <Text style={styles.sectionHeading}>You may also like</Text>
        {loading ? (
          <ActivityIndicator size="large" color="#ff6347" />
        ) : (
          <FlatList
            horizontal
            data={relatedProducts}
            keyExtractor={item => item.id.toString()}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingVertical: 10 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.relatedCard}
                onPress={() =>
                  navigation.push('ProductDetails', { product: item })
                }
              >
                <Image
                  source={{ uri: item.image }}
                  style={styles.relatedImage}
                />
                <Text numberOfLines={1} style={styles.relatedTitle}>
                  {item.title}
                </Text>
                <Text style={styles.relatedPrice}>${item.price}</Text>
              </TouchableOpacity>
            )}
          />
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default ProductDetailsScreen;

const styles = StyleSheet.create({
  container: { padding: 20 },
  image: {
    height: 250,
    width: '100%',
    resizeMode: 'contain',
    marginBottom: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 8,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ff6347',
    marginBottom: 12,
    textAlign: 'center',
  },
  desc: { fontSize: 14, color: '#555', textAlign: 'justify', marginBottom: 20 },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    justifyContent: 'center',
  },
  qtyButton: {
    backgroundColor: '#ff6347',
    paddingHorizontal: 14,
    paddingVertical: 6,
    borderRadius: 8,
  },
  qtyText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  qtyNumber: { fontSize: 16, fontWeight: '600', marginHorizontal: 12 },
  addBtn: {
    backgroundColor: '#ff6347',
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 12,
  },
  addBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  sectionHeading: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 10,
    marginTop: 10,
  },
  relatedCard: {
    width: 140,
    backgroundColor: '#fff',
    marginRight: 12,
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  relatedImage: { height: 100, resizeMode: 'contain', marginBottom: 8 },
  relatedTitle: { fontSize: 12, fontWeight: '600', marginBottom: 4 },
  relatedPrice: { fontSize: 14, fontWeight: 'bold', color: '#ff6347' },
});
