import React, { useContext, useEffect, useState, useCallback } from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  RefreshControl,
  Modal,
  ToastAndroid,
  Platform,
  Alert,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { CartContext } from '../Context/CartContext';
import Header from '../Components/Header.jsx';
import { useNavigation } from '@react-navigation/native';

const HomeScreem = () => {
  const { addToCart, user } = useContext(CartContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const navigation = useNavigation();

  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      let res = await fetch('https://fakestoreapi.com/products');
      let data = await res.json();
      setProducts(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchProducts();
  }, []);

  const showToast = (message) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(message, ToastAndroid.SHORT);
    } else {
      Alert.alert('Cart', message);
    }
  };

  const handleAddToCart = () => {
    if (selectedItem) {
      addToCart({ ...selectedItem, quantity });
      showToast('Added to cart');
      setSelectedItem(null);
      setQuantity(1);
    }
  };

  const renderItem = ({ item }) => (
    <TouchableOpacity
      style={styles.card}
      onPress={() => navigation.navigate('ProductDetails', { product: item })}
    >
      <Image source={{ uri: item.image }} style={styles.image} />
      <Text style={styles.title} numberOfLines={2}>
        {item.title}
      </Text>
      <Text style={styles.price}>${item.price}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => setSelectedItem(item)}
      >
        <Text style={styles.buttonText}>Add to Cart</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <Header />
      {loading ? (
        <ActivityIndicator size="large" color="#ff6347" style={{ flex: 1 }} />
      ) : (
        <FlatList
          data={products}
          ListHeaderComponent={() => {
            return (
              <View style={styles.banner}>
                <Text style={styles.bannerText}>🔥 Super Sale - 50% Off!</Text>
              </View>
            );
          }}
          keyExtractor={item => item.id.toString()}
          renderItem={renderItem}
          numColumns={2}
          columnWrapperStyle={styles.row}
          contentContainerStyle={styles.productList}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        />
      )}
      <Modal
        visible={!!selectedItem}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setSelectedItem(null)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            {selectedItem && (
              <>
                <Image
                  source={{ uri: selectedItem.image }}
                  style={styles.modalImage}
                />
                <Text style={styles.modalTitle}>{selectedItem.title}</Text>
                <Text style={styles.modalPrice}>${selectedItem.price}</Text>
                <Text style={styles.modalDesc} numberOfLines={3}>
                  {selectedItem.description}
                </Text>

                <View style={styles.quantityRow}>
                  <TouchableOpacity
                    style={styles.qtyButton}
                    onPress={() =>
                      setQuantity(prev => (prev > 1 ? prev - 1 : 1))
                    }
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
                <TouchableOpacity
                  style={styles.addBtn}
                  onPress={handleAddToCart}
                >
                  <Text style={styles.addBtnText}>Add to Cart</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.cancelBtn}
                  onPress={() => setSelectedItem(null)}
                >
                  <Text style={styles.cancelBtnText}>Cancel</Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreem;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fafafa' },

  banner: {
    marginVertical: 16,
    padding: 20,
    paddingVertical: 30,
    borderRadius: 12,
    backgroundColor: '#ffe4e1',
    alignItems: 'center',
  },
  bannerText: { fontSize: 18, fontWeight: 'bold', color: '#ff6347' },
  productList: { paddingHorizontal: 10, paddingBottom: 20 },
  row: { justifyContent: 'space-between' },
  card: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    marginHorizontal: 4,
    elevation: 2,
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
  },
  image: {
    height: 120,
    resizeMode: 'contain',
    marginBottom: 10,
    alignSelf: 'center',
    width: '100%',
  },
  title: { fontSize: 14, fontWeight: '600', marginBottom: 4 },
  price: { fontSize: 16, fontWeight: 'bold', marginBottom: 6, color: '#333' },
  button: {
    backgroundColor: '#ff6347',
    paddingVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: { color: '#fff', fontWeight: '600' },

  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalImage: {
    height: 150,
    width: 150,
    resizeMode: 'contain',
    marginBottom: 10,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    textAlign: 'center',
    marginBottom: 6,
  },
  modalPrice: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ff6347',
    marginBottom: 6,
  },
  modalDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 12,
  },
  quantityRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 12 },
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
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    marginBottom: 8,
  },
  addBtnText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  cancelBtn: {
    paddingVertical: 10,
    borderRadius: 10,
    alignItems: 'center',
    width: '100%',
    borderWidth: 1,
    borderColor: '#ccc',
  },
  cancelBtnText: { color: '#333', fontSize: 14 },
});
