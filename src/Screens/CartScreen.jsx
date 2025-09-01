import React, { useContext } from 'react';
import {
  Text,
  StyleSheet,
  FlatList,
  View,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import { CartContext } from '../Context/CartContext';
import { SafeAreaView } from 'react-native-safe-area-context';
import Header from '../Components/Header';

const CartScreen = () => {
  const { cart, addToCart, removeFromCart } = useContext(CartContext);

  const handleDecrease = item => {
    if (item.quantity > 1) {
      removeFromCart(item.id, false);
    } else {
      removeFromCart(item.id, true);
    }
  };

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const discount = subtotal * 0.1; 
  const tax = (subtotal - discount) * 0.05; 
  const finalTotal = subtotal - discount + tax;

  return (
    <SafeAreaView style={styles.container}>
      <Header isHome={false} />
      {cart.length === 0 ? (
        <Text style={styles.empty}>Cart is empty</Text>
      ) : (
        <ScrollView>
          <FlatList
            nestedScrollEnabled={true}
            contentContainerStyle={{
              marginVertical: 16,
            }}
            data={cart}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <View style={styles.item}>
                <Image source={{ uri: item.image }} style={styles.image} />

                <View style={styles.info}>
                  <Text style={styles.name} numberOfLines={2}>
                    {item.title}
                  </Text>

                  <Text style={styles.price}>
                    ${(item.price * item.quantity).toFixed(2)}
                  </Text>
                  <View style={styles.row}>
                    <View style={styles.qtyContainer}>
                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => handleDecrease(item)}
                      >
                        <Text style={styles.btnText}>-</Text>
                      </TouchableOpacity>

                      <Text style={styles.qty}>{item.quantity}</Text>

                      <TouchableOpacity
                        style={styles.qtyBtn}
                        onPress={() => addToCart({ ...item, quantity: 1 })}
                      >
                        <Text style={styles.btnText}>+</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.removeBtn}
                  onPress={() => removeFromCart(item.id, true)}
                >
                  <Text style={styles.remove}>❌</Text>
                </TouchableOpacity>
              </View>
            )}
          />
          <View style={styles.footer}>
            <View style={styles.rowBetween}>
              <Text style={styles.footerText}>Subtotal</Text>
              <Text style={styles.footerValue}>${subtotal.toFixed(2)}</Text>
            </View>

            <View style={styles.rowBetween}>
              <Text style={styles.footerText}>Discount (10%)</Text>
              <Text style={styles.discountValue}>- ${discount.toFixed(2)}</Text>
            </View>

            <View style={styles.rowBetween}>
              <Text style={styles.footerText}>Taxes (5%)</Text>
              <Text style={styles.footerValue}>+ ${tax.toFixed(2)}</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.rowBetween}>
              <Text style={styles.totalText}>Final Total</Text>
              <Text style={styles.totalPrice}>${finalTotal.toFixed(2)}</Text>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  empty: { textAlign: 'center', marginTop: 20, color: '#888' },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    marginHorizontal: 12,
    marginVertical: 6,
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  image: {
    width: 80,
    height: 80,
    resizeMode: 'contain',
    marginRight: 12,
  },
  info: { flex: 1 },
  name: { fontSize: 15, fontWeight: '600', marginBottom: 6 },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  qtyContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 6,
    padding:4
  },
  qtyBtn: {
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
    marginHorizontal: 4,
  },
  btnText: { fontSize: 18, fontWeight: 'bold', color: '#333' },
  qty: { minWidth: 24, textAlign: 'center', fontWeight: '600' },
  price: {
    fontWeight: '600',
    color: '#ff6347',
    fontSize: 16,
    marginVertical:8
  },
  remove: { fontSize: 16 },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderColor: '#ddd',
    backgroundColor: '#f1f1f1',
  },
  rowBetween: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  footerText: { fontSize: 15, color: '#333' },
  footerValue: { fontSize: 15, fontWeight: '600', color: '#333' },
  discountValue: { fontSize: 15, fontWeight: '600', color: 'green' },
  divider: {
    borderTopWidth: 1,
    borderColor: '#ccc',
    marginVertical: 8,
  },
  totalText: { fontSize: 18, fontWeight: 'bold' },
  totalPrice: { fontSize: 18, fontWeight: 'bold', color: '#ff6347' },
});
