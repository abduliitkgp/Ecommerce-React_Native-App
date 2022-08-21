import create from 'zustand';
import {Data} from './screens/HomeScreen';

type cartItem = {[id: string]: number};

type CartState = {
  products: Data[];
  cart: {[id: string]: number};
  total : number;
  addToCart: (data: Data) => void;
  removeFromCart: (id: string) => void;
};

// Selectors
// Allows us to easily select a single piece of data later
export const selectProductsInCart = (state: CartState) =>
  state.products.filter(product => state.cart[product.id]);

// Initialize our store with initial values and actions to mutate the state
export const useCart = create<CartState>(set => ({
  products: [],
  cart: {},
  total: 0,
  addToCart: pdt =>
    set(state => {
      if (pdt.qty_cart < 1 || !pdt.qty_cart) {
        pdt.qty_cart = 1;
      } else {
        pdt.qty_cart = pdt.qty_cart + 1;
      }
      state.total = state.total + pdt.price;
      return {cart: {...state.cart, [pdt.id]: 1}};
    }),
  removeFromCart: (id: string) =>
    set(state => {
      const nextCart = {...state.cart};
      delete nextCart[id];
      return {cart: nextCart};
    }),
}));
