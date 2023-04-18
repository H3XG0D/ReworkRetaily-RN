import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IOrder, IOrderProduct, IShop, ISupplier} from '../types';
import type {RootState} from '../store/store';

export interface CartOrder {
  supplier: ISupplier;
  shop: IShop;
  products: IOrderProduct[];
}

export interface CartEditProduct {
  supplier: ISupplier;
  shop: IShop;
  product: IOrderProduct;
}

const initialState: CartOrder[] = [];

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart: (state, action: PayloadAction<CartEditProduct>) => {
      if (
        state.some(
          order =>
            order.supplier.code === action.payload.supplier.code &&
            order.shop.code === action.payload.shop.code,
        )
      ) {
        let order: CartOrder | undefined = state.find(
          order =>
            order.supplier.code === action.payload.supplier.code &&
            order.shop.code === action.payload.shop.code,
        );

        if (
          order!.products.some(
            product => product.code === action.payload.product.code,
          )
        ) {
          order!.products!.find(
            product => product.code === action.payload.product.code,
          )!.quantity += action.payload.product.step;
        } else {
          let product = {...action.payload.product};
          product.quantity = action.payload.product.quantum;

          order!.products.push(product);
        }
      } else {
        let product = {...action.payload.product};
        product.quantity = action.payload.product.quantum;

        state.push({
          supplier: action.payload.supplier,
          shop: action.payload.shop,
          products: [product],
        });
      }
      // const indexProduct = state.findIndex(
      //   product => product.code === action.payload.code,
      // );
      // if (indexProduct !== -1) {
      //   state[indexProduct].quantum + state[indexProduct].step;
      // } else {
      //   state.push({...action.payload, amount: 1});
      // }
    },
    removeProductFromCart: (state, action: PayloadAction<string>) => {
      // const indexCartProdux = state.findIndex(
      //   product => product.code == action.payload,
      // );
      // if (state[indexCartProdux].amount > 1) {
      //   state[indexCartProdux].amount += -1;
      // } else {
      //   return state.filter(product => product.code !== action.payload);
      // }
    },
  },
});
export const {addProductToCart, removeProductFromCart} = cartSlice.actions;

export const getCartSelector = (state: RootState) => state.cart;

// export const getTotalPrice = (state: RootState) =>
//   state.cart.reduce((acc, next) => (acc += next.price * next.quantum), 0);

export default cartSlice.reducer;
