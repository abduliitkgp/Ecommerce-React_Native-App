import React, {useEffect, useState} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
} from 'react-native';

import CartRow from '../components/cartRow';
import {useCart, selectProductsInCart} from '../Store';

const CartScreen = ({navigation}) => {
  const removefromCart = useCart(state => state.removeFromCart);
  const productsInCart = useCart(selectProductsInCart);
  const cartItems = useCart(state => state.cart);

  function renderItem({item}) {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Details', {productId: item.id});
        }}>
        <View style={styles.cartLine}>
          <Image
            source={{uri: item.image_url}}
            style={styles.cartImage}
            resizeMode="contain"
          />
          <Text style={styles.lineLeft}>
            {item.name} x {item.qty_cart}
          </Text>
          <Text style={styles.lineRight}>Rs. {item.price * item.qty_cart}</Text>
        </View>
      </TouchableOpacity>
    );
  }

  const Totals = () => {
    let [total, setTotal] = useState(0);
    const totalPrice = useCart(state => state.total);
    useEffect(() => {
      setTotal(totalPrice);
    }, [totalPrice]);
    return (
      <View style={styles.totalContainer}>
        <View style={styles.lineStyle} />
        <View style={styles.cartLineTotal}>
          <Text style={[styles.lineLeft, styles.lineTotal]}>Total</Text>
          <Text style={styles.lineRight}>Rs. {total}</Text>
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <FlatList
        style={styles.itemsList}
        contentContainerStyle={styles.itemsListContainer}
        data={productsInCart}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        ListFooterComponent={Totals}
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    width: '100%',
    height: '100%',
    backgroundColor: 'white',
    borderRadius: 20,
    justifyContent: 'space-between',
    flexGrow: 1,
  },
  totalContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    flex: 1,
    justifyContent: 'flex-end',
    flexGrow: 1,
  },
  cartLine: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    margin: 5,
  },
  cartImage: {
    width: 50,
    height: 50,
    borderRadius: 50,
  },
  cartLineTotal: {
    flexDirection: 'row',
    paddingHorizontal: 10,
    margin: 20,
  },
  lineTotal: {
    fontWeight: 'bold',
  },
  lineLeft: {
    fontSize: 12,
    color: '#333333',
    marginLeft: 5,
    marginRight: 5,
    marginTop: 10,
    marginBottom: 10,
  },
  lineRight: {
    flex: 1,
    fontSize: 15,
    color: 'green',
    textAlign: 'right',
    marginTop: 10,
    marginBottom: 10,
  },
  itemsList: {
    backgroundColor: 'white',
    margin: 5,
  },
  itemsListContainer: {
    backgroundColor: 'white',
    borderRadius: 20,
    marginHorizontal: 8,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    margin: 20,
    elevation: 3,
    marginVertical: 20,
    paddingVertical: 8,
  },
  lineStyle: {
    borderWidth: 0.15,
    width: '90%',
    alignSelf: 'center',
    borderColor: 'grey',
    margin: 2,
  },
});
export default CartScreen;
