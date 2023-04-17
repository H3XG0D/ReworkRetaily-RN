import {createSlice} from '@reduxjs/toolkit';
import {IOrder} from '../types';

interface IInitialState {
  orders: IOrder[] | undefined;
}

const initialState: IInitialState = {
  orders: [],
};

export const cartSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addToCart: (state = initialState, {payload}) => {
      const productId = payload;
      state.orders?.push(productId);
    },
  },
});

export const {actions, reducer} = cartSlice;
