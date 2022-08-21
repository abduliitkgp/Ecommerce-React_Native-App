import React from 'react';
import {View, Text, Image, StyleSheet, Button} from 'react-native';

const styles = StyleSheet.create({
  cartRow: {flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10},
  cartImage: {
    width: 100,
    height: 100,
  },
  content: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
});

type ICartRow = {
  name: string;
  image_url: string;
  id: string;
  onRemove: (id: string) => void;
};

const CartRow = ({image_url, name, id, onRemove}: ICartRow) => {
  return (
    <View style={styles.cartRow}>
      <Image
        source={{uri: image_url}}
        style={styles.cartImage}
        resizeMode="contain"
      />
      <View style={styles.content}>
        <Text>{name}</Text>
        <Button title="Remove from Cart" onPress={() => onRemove(id)} />
      </View>
    </View>
  );
};
export default CartRow;
