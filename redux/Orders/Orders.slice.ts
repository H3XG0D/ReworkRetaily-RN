import {IOrder, Customer} from './../types';
import {createSlice, PayloadAction} from '@reduxjs/toolkit';

const initialState: IOrder = {
  value: [],
};

export const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    addOrder: (state, action: PayloadAction<Customer>) => {
      state.value.push(action.payload);
    },
    // getOrder: (state, action) => {
    //   state.find(
    //     (f: IOrder) =>
    //       f.supplier === action.payload && f.shop === action.payload,
    //   );
    // },
  },
});

export const {addOrder} = orderSlice.actions;

export default orderSlice.reducer;
