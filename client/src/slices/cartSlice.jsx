import { createSlice } from '@reduxjs/toolkit';
import { updateCart } from '../utils/cartUtils';

const initialState = localStorage.getItem('cart')
  ? JSON.parse(localStorage.getItem('cart'))
  : { cartItems: [], shippingAddress: {}, paymentMethod: 'PayPal' };

const cartSlice = createSlice({
  name: 'cart',
  initialState: initialState,
  reducers: {
    addToCart: (state, action) => {
      const newItem = action.payload;

      const existsItem = state.cartItems.find(
        (currentItem) => currentItem._id === newItem._id
      );

      if (existsItem) {
        state.cartItems = state.cartItems.map((currentItem) =>
          currentItem._id === newItem._id ? newItem : currentItem
        );
      } else {
        state.cartItems.push(newItem);
      }

      return updateCart(state);
    },
    //
    removeFromCart: (state, action) => {
      const cartId = action.payload;
      state.cartItems = state.cartItems.filter((item) => item._id !== cartId);
      // update localstorage
      return updateCart(state);
    },
    saveShippingAddress: (state, action) => {
      state.shippingAddress = action.payload;
      // update localstorage
      return updateCart(state);
    },
    savePaymentMethod: (state, action) => {
      state.paymentMethod = action.payload;
      // update localstorage
      return updateCart(state);
    },
    clearCartItems: (state, action) => {
      state.cartItems = [];
      // update localstorage
      return updateCart(state);
    },
    // NOTE: here we need to reset state for when a user logs out so the next
    // user doesn't inherit the previous users cart and shipping
    resetCart: (state) => (state = initialState),
  },
});

export const {
  addToCart,
  removeFromCart,
  saveShippingAddress,
  savePaymentMethod,
  clearCartItems,
  resetCart,
} = cartSlice.actions;

export default cartSlice.reducer;
