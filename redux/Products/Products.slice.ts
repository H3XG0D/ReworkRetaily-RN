import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import {IOrderProduct} from '../types';

import type {RootState} from '../store/store';

const initialState: IOrderProduct[] = [];

export const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    addProduct: (state, action: PayloadAction<IOrderProduct>) => {
      state.unshift(action.payload);
    },
    removeProduct: (state, action: PayloadAction<string>) => {
      return state.filter(product => product.code != action.payload);
    },
  },
});

export const {addProduct, removeProduct} = productSlice.actions;
export const getProductsSelector = (state: RootState) => state.products;
export default productSlice.reducer;
