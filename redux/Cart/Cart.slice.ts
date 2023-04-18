import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IOrderProduct, IShop, ISupplier} from '../types';
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

        let product = {...action.payload.product};
        product.quantity = action.payload.product.quantum;

        order!.products.push(product);
      } else {
        let product = {...action.payload.product};
        product.quantity = action.payload.product.quantum;

        state.push({
          supplier: action.payload.supplier,
          shop: action.payload.shop,
          products: [product],
        });
      }
    },

    increaseProductToCart: (state, action: PayloadAction<CartEditProduct>) => {
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
    },
    removeProductFromCart: (state, action: PayloadAction<string>) => {},
  },
});
export const {addProductToCart, removeProductFromCart, increaseProductToCart} =
  cartSlice.actions;
export const getCartSelector = (state: RootState) => state.cart;

export default cartSlice.reducer;
