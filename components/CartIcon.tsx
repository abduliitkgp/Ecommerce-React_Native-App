import React from 'react';
import {StyleSheet, TouchableOpacity, Image} from 'react-native';
//import {CartContext} from '../CartContext';
import {withBadge} from 'react-native-elements'

const CartIcon = ({navigation}) => {
  //const {getItemsCount} = useContext(CartContext);
  return (
    <>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Cart');
        }}>
        <Image style={styles.cart} source={require('../assets/cart.png')} />
      </TouchableOpacity>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    marginHorizontal: 8,
    backgroundColor: 'green',
    height: 20,
    padding: 12,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  cart: {
    width: 30,
    height: 30,
  },
});

export default CartIcon;
