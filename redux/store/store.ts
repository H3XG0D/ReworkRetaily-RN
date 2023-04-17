import {configureStore} from '@reduxjs/toolkit';
import products from '../Products/Products.slice';
import cart from '../Cart/Cart.slice';

export const store = configureStore({
  reducer: {
    products,
    cart,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type appDispatch = typeof store.dispatch;
