import React, {useEffect, useState} from 'react';
import {useCart} from '../Store';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Button,
  ScrollView,
  Image,
  Platform,
  ToastAndroid,
  Alert,
} from 'react-native';
import {Data, GetProduct} from './HomeScreen';

const MSG = 'Product added successsfully';

const DetailsScreen = ({route}) => {
  const {productId} = route.params;
  const [product, setProduct] = useState<Data>();
  const addtocart = useCart(state => state.addToCart);

  const notifyMessage = (msg: string) => {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      Alert.alert(msg);
    }
  };

  useEffect(() => {
    setProduct(GetProduct(productId));
  }, [productId]);
  return (
    <SafeAreaView>
      <ScrollView>
        <Image style={styles.image} source={{uri: product?.image_url}} />
        <View style={styles.infoContainer}>
          <Text style={styles.name}>{product?.name}</Text>
          <Text style={styles.price}> Rs. {product?.price}</Text>
          <Text style={styles.description}>{product?.description}</Text>
          <Button
            onPress={() => {
              addtocart(GetProduct(productId));
              notifyMessage(MSG);
            }}
            title="Add to cart"
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  card: {
    backgroundColor: 'white',
    borderRadius: 16,
    shadowOpacity: 0.2,
    shadowRadius: 4,
    shadowColor: 'black',
    shadowOffset: {
      height: 0,
      width: 0,
    },
    elevation: 1,
    marginVertical: 20,
  },
  image: {
    height: 300,
    width: '100%',
  },
  infoContainer: {
    padding: 16,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 8,
    textTransform: 'capitalize',
  },
  price: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    fontWeight: '400',
    color: '#787878',
    marginBottom: 16,
  },
});
export default DetailsScreen;
