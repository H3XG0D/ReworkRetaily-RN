import {IOrderProduct, IOrderProductProperty2} from './../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

import {IProduct, IShop, ISupplier} from '../types';
import type {RootState} from '../store/store';

export interface CartOrder {
  supplier: ISupplier;
  shop: IShop;
  products: IOrderProduct[];
}

export interface CartEditProduct {
  supplier: ISupplier;
  shop: IShop;
  product: IProduct;

  balance: number | null;
  price: number;
  ei: string | null;
  quantum: number;
  step: number;
  product_properties: IOrderProductProperty2[];

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

        let product: IOrderProduct = {
          product: action.payload.product.code,
          quantity: 0,
          quantum: action.payload.quantum,
          step: action.payload.step,
          code: action.payload.product.code,
          name: action.payload.product.name,
          // Принять данные с модалки
          price: action.payload.price,
          balance: action.payload.balance,
          ei: action.payload.ei,
          product_properties: action.payload.product_properties,
        };

        product.quantity = action.payload.product.quantum;
        order!.products.push(product);
      } else {
        let product: IOrderProduct = {
          product: action.payload.product.code,
          quantity: 0,
          quantum: action.payload.quantum,
          step: action.payload.step,
          code: action.payload.product.code,
          name: action.payload.product.name,
          // Принять данные с модалки
          price: action.payload.price,
          balance: action.payload.balance,
          ei: action.payload.ei,
          product_properties: action.payload.product_properties,
        };

        product.quantity = action.payload.product?.quantum;

        state.push({
          supplier: action.payload.supplier,
          shop: action.payload.shop,
          products: [product],
        });
      }
      debugger;
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
          if (
            order!.products!.some(
              product =>
                product.code === action.payload.product.code &&
                (action.payload.balance === null ||
                  product.quantity + action.payload.step <=
                    action.payload.balance),
            )
          ) {
            order!.products!.find(
              product => product.code === action.payload.product.code,
            )!.quantity += action.payload.step;
          }
        } else {
          let product: IOrderProduct = {
            product: action.payload.product.code,
            quantity: 0,
            quantum: action.payload.quantum,
            step: action.payload.step,
            code: action.payload.product.code,
            name: action.payload.product.name,
            // Принять данные с модалки
            price: action.payload.price,
            balance: action.payload.balance,
            ei: action.payload.ei,
            product_properties: action.payload.product_properties,
          };

          product.quantity = action.payload.product.quantum;

          if (
            order!.products!.some(
              product =>
                product.code === action.payload.product.code &&
                (action.payload.product.balance === null ||
                  product.quantity + product.step <=
                    action.payload.product.balance),
            )
          ) {
            order!.products.push(product);
          }
        }
      } else {
        let product: IOrderProduct = {
          product: action.payload.product.code,
          quantity: 0,
          quantum: action.payload.quantum,
          step: action.payload.step,
          code: action.payload.product.code,
          name: action.payload.product.name,
          // Принять данные с модалки
          price: action.payload.price,
          balance: action.payload.balance,
          ei: action.payload.ei,
          product_properties: action.payload.product_properties,
        };

        product.quantity = action.payload.product.quantum;

        if (
          action.payload.product.balance === null ||
          product.quantity + product.step <= action.payload.product.balance
        ) {
          state.push({
            supplier: action.payload.supplier,
            shop: action.payload.shop,
            products: [product],
          });
        }
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
          let product: IOrderProduct = {
            product: action.payload.product.code,
            quantity: 0,
            quantum: action.payload.quantum,
            step: action.payload.step,
            code: action.payload.product.code,
            name: action.payload.product.name,
            // Принять данные с модалки
            price: action.payload.price,
            balance: action.payload.balance,
            ei: action.payload.ei,
            product_properties: action.payload.product_properties,
          };

          product.quantity = new_quantity;

          order!.products.push(product);
        }
      } else {
        let product: IOrderProduct = {
          product: action.payload.product.code,
          quantity: 0,
          quantum: action.payload.quantum,
          step: action.payload.step,
          code: action.payload.product.code,
          name: action.payload.product.name,
          // Принять данные с модалки
          price: action.payload.price,
          balance: action.payload.balance,
          ei: action.payload.ei,
          product_properties: action.payload.product_properties,
        };

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
