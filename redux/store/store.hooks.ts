import {useDispatch, useSelector, TypedUseSelectorHook} from 'react-redux';
import {appDispatch, RootState} from './store';

export const useAppDispatch = () => useDispatch<appDispatch>();
export const getAppSelectore: TypedUseSelectorHook<RootState> = useSelector;
