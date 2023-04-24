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
  value?: any;
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

    decreaseProductToCart: (state, action: PayloadAction<CartEditProduct>) => {
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
          let new_quantity =
            order!.products!.find(
              product => product.code === action.payload.product.code,
            )!.quantity - action.payload.product.step;

          if (
            new_quantity <= 0 ||
            new_quantity < action.payload.product.quantum
          ) {
            order!.products = order!.products!.filter(
              product => product.code !== action.payload.product.code,
            );
          } else {
            order!.products!.find(
              product => product.code === action.payload.product.code,
            )!.quantity = new_quantity;
          }
        }
      }
    },

    updateCartQuantity: (state, action: PayloadAction<CartEditProduct>) => {
      let new_quantity: number = action.payload.product.quantum;

      while (
        new_quantity + action.payload.product.step <=
          Number(action.payload.value) &&
        (action.payload.product.balance === null ||
          new_quantity + action.payload.product.step <=
            action.payload.product.balance)
      ) {
        new_quantity += action.payload.product.step;
      }

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
          if (Number(action.payload.value) <= 0) {
            order!.products = order!.products!.filter(
              product => product.code !== action.payload.product.code,
            );
          } else {
            order!.products!.find(
              product => product.code === action.payload.product.code,
            )!.quantity = new_quantity;
          }
        } else {
          let product = {...action.payload.product};
          product.quantity = new_quantity;

          order!.products.push(product);
        }
      } else {
        let product = {...action.payload.product};
        product.quantity = new_quantity;

        state.push({
          supplier: action.payload.supplier,
          shop: action.payload.shop,
          products: [product],
        });
      }
    },

    removeAllFromCart: (state, action: PayloadAction<string>) => {
      return state.filter(p => p.shop.code !== action.payload);
    },
  },
});

export const {
  addProductToCart,
  increaseProductToCart,
  decreaseProductToCart,
  removeAllFromCart,
  updateCartQuantity,
} = cartSlice.actions;

export const getCartSelector = (state: RootState) => state.cart;

export default cartSlice.reducer;
