import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import HomeScreen from '../screens/HomeScreen';
// import CartScreen from '../screens/CartScreen';
import CartIcon from '../components/CartIcon';

import {Image, TouchableOpacity, StyleSheet} from 'react-native';
import DetailsScreen from '../screens/DetailsScreen';
import CartScreen from '../screens/CartScreen';

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={({navigation}) => ({
            title: 'Dream Store',
            headerStyle: styles.header,
            headerTitleAlign: 'center',
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.navigate('Home')}>
                <Image
                  source={require('../assets/bootsplash_logo.png')}
                  style={styles.icon}
                />
              </TouchableOpacity>
            ),
            headerRight: () => <CartIcon navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Details"
          component={DetailsScreen}
          options={({navigation}) => ({
            title: 'Product Details',
            headerStyle: styles.header,
            headerTitleAlign: 'center',
            headerRight: () => <CartIcon navigation={navigation} />,
          })}
        />
        <Stack.Screen
          name="Cart"
          component={CartScreen}
          options={({navigation}) => ({
            title: 'Cart',
            headerStyle: styles.header,
            headerTitleAlign: 'center',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  header: {
    fontWeight: '300',
    padding: '100',
    fontSize: 15,
    backgroundColor: 'white',
  },
  icon: {
    width: 30,
    height: 30,
    backgroundColor: '#ffffff',
  },
  quantityContainer: {
    position: 'absolute',
    backgroundColor: 'red',
    width: 12,
    height: 12,
    borderRadius: 10,
    right: 9,
    top: +9,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    alignItems: 'center',
    justifyContent: 'center',
    color: '#FFFFFF',
    fontSize: 8,
    fontWeight: '600',
  },
});

export default RootNavigator;
