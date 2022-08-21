import React, {useState, useEffect} from 'react';
import {Product} from '../components/Products';
import {
  StyleSheet,
  FlatList,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useCart} from '../Store';

export type Data = {
  name: string;
  short_description: string;
  description: string;
  price: number;
  quantity: number;
  banner_image_url: string;
  image_url: string;
  id: string;
  num_owners: string;
  total_volume: string;
  qty_cart: number;
};

const dataList: Data[] = [];

const HomeScreen = ({navigation}) => {
  const renderProduct = ({item: product}) => {
    return (
      <Product
        {...product}
        onPress={() => {
          navigation.navigate('Details', {
            productId: product.id,
          });
        }}
      />
    );
  };

  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState<Data[]>([]);
  const [offset, setOffset] = useState(0);
  const products = useCart(state => state.products);

  useEffect(() => {
    setLoading(true);
    const fetchData = () => {
      const url =
        'https://api.opensea.io/api/v1/collections?offset=' +
        offset +
        '&limit=10';
      fetch(url)
        .then(response => response.json())
        .then(json => {
          for (let obj of json.collections) {
            let item: Data = {
              name: getName(obj.name),
              short_description: obj.short_description,
              description: obj.description,
              price: obj.stats.average_price,
              quantity: obj.stats.total_supply,
              id: obj.name,
              banner_image_url: obj.banner_image_url,
              image_url: obj.image_url,
              num_owners: obj.stats.num_owners,
              total_volume: obj.stats.total_volume,
              qty_cart: 0,
            };

            if (!dataList.find(product => product.id === item.id)) {
              dataList.push(item);
              products.push(item);
            }
          }
          console.log(products);
          setData(d => dataList);
          // setOffset(offset + 10);
          setLoading(false);
        })
        .catch(error => console.log(error))
        .finally(() => {
          setLoading(false);
        });
    };
    fetchData();
  }, [offset]);

  const getName = (name: string) => {
    const indexOfHyphen =
      name.indexOf('-') !== -1 ? name.indexOf('-') : name.length;
    let st = name.substring(0, indexOfHyphen);
    const indexOfHash = st.indexOf('#') !== -1 ? st.indexOf('#') : name.length;
    st = st.substring(0, indexOfHash);
    st = st.replace('.', ' ');
    return st;
  };
  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => setOffset(offset + 10)}
          style={styles.loadMoreBtn}>
          <Text style={styles.btnText}>Load More</Text>
          {isLoading ? (
            <ActivityIndicator color="white" style={{marginLeft: 8}} />
          ) : null}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <>
      <View style={styles.Container}>
        <Text style={styles.header}>Products</Text>
        <FlatList
          style={styles.productsList}
          contentContainerStyle={styles.productsListContainer}
          keyExtractor={item => item.id.toString()}
          data={data}
          renderItem={renderProduct}
          ListFooterComponent={renderFooter}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  Container: {
    width: '100%',
    height: '100%',
  },
  header: {
    textTransform: 'capitalize',
    fontSize: 18,
    fontWeight: '500',
    marginTop: 20,
    marginBottom: 5,
    marginLeft: 20,
    marginRight: 20,
    color: 'black',
  },
  productsList: {
    backgroundColor: '#eeeeee',
  },
  productsListContainer: {
    backgroundColor: '#eeeeee',
    paddingVertical: 8,
    marginHorizontal: 8,
  },
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  loadMoreBtn: {
    padding: 10,
    backgroundColor: '#800000',
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: {
    color: 'white',
    fontSize: 15,
    textAlign: 'center',
  },
});

export function GetProduct(id: string) {
  return dataList.find(product => product.id === id);
}

export default HomeScreen;
