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

// import {createSlice, PayloadAction} from '@reduxjs/toolkit';
// import {IOrder, IOrderProduct} from '../types';

// import type {RootState} from '../store/store';

// const initialState: IOrder = {
//   value: [],
//   products: [],
// };

// export const productSlice = createSlice({
//   name: 'products',
//   initialState,
//   reducers: {
//     addProduct: (state, action: PayloadAction<IOrderProduct>) => {
//       if (
//         state.value.find(
//           product => product.supplier_code !== '' && product.shop_code !== '',
//         )
//       ) {
//         state.products.push(action.payload);
//       } else {
//         console.log('Error');
//       }
//     },
//     removeProduct: (state, action: PayloadAction<IOrderProduct>) => {
//       state.products.filter(product => product.code != action.payload.code);
//     },
//     addOrder: (state, action: PayloadAction<IOrder>) => {
//       state.value.forEach(product => {
//         if (product.shop_code === '' && product.supplier_code === '') {
//           product.shop_code === product.shop_code &&
//             product.supplier_code === product.supplier_code;
//         }
//       });
//     },
//   },
// });

// export const getProductsSelector = (state: RootState) => state.products;

// export default productSlice.reducer;
