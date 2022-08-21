import React from 'react';
import {Text, Image, View, StyleSheet, TouchableOpacity} from 'react-native';

export function Product({name, price, quantity, image_url, onPress}) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Image style={styles.thumb} source={{uri: image_url}} />
      <View style={styles.infoContainer}>
        <Text style={styles.name}>{name}</Text>
        <Text style={styles.price}>
          {' '}
          Selling Price :<Text style={styles.priceText}> Rs. {price}</Text>
        </Text>
        <Text style={styles.quantity}>
          {' '}
          Units : <Text style={styles.quantityText}> {quantity}</Text>
        </Text>
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 18,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
    margin: 10,
  },
  thumb: {
    height: 200,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    width: '100%',
  },
  infoContainer: {
    padding: 16,
    justifyContent: 'space-between',
  },
  name: {
    textTransform: 'capitalize',
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  price: {
    fontSize: 15,
    fontWeight: '300',
    marginBottom: 8,
    textAlign: 'left',
  },
  quantity: {
    fontSize: 15,
    fontWeight: '300',
    marginBottom: 8,
  },
  priceText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'green',
    textAlign: 'right',
  },
  quantityText: {
    fontSize: 18,
    fontWeight: '600',
    color: 'grey',
    textAlign: 'right',
  },
});
