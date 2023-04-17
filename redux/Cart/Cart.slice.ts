import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IOrderProduct} from '../types';
import type {RootState} from '../store/store';

export interface CartProduct extends IOrderProduct {
  amount: number;
}

const initialState: CartProduct[] = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<IOrderProduct>) => {
      const indexProduct = state.findIndex(
        product => product.code === action.payload.code,
      );
      if (indexProduct !== -1) {
        state[indexProduct].amount += 1;
      } else {
        state.push({...action.payload, amount: 1});
      }
    },
    removeProductFromCart: (state, action: PayloadAction<string>) => {
      const indexCartProdux = state.findIndex(
        product => product.code == action.payload,
      );
      if (state[indexCartProdux].amount > 1) {
        state[indexCartProdux].amount += -1;
      } else {
        return state.filter(product => product.code !== action.payload);
      }
    },
  },
});

export const {addProductToCart, removeProductFromCart} = cartSlice.actions;

export const getCartSelecror = (state: RootState) => state.cart;

export const getTotalPrice = (state: RootState) =>
  state.cart.reduce((acc, next) => (acc += next.price * next.quantum), 0);

export default cartSlice.reducer;
