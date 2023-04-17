import {View, Text, ScrollView} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RetaiyRootTypeParamList} from '../../../../../Navigation/routes';

import {
  getAppSelectore,
  useAppDispatch,
} from '../../../../../../redux/store/store.hooks';

import {
  getCartSelecror,
  getTotalPrice,
  removeProductFromCart,
} from '../../../../../../redux/Cart/Cart.slice';

import Button from '../../../../UI/Button';
import styled from 'styled-components';
import PaddingLayout from '../../../../layout/PaddingLayout';

const Request = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RetaiyRootTypeParamList>>();

  const dispatch = useAppDispatch();
  const cartProduct = getAppSelectore(getCartSelecror);
  const totalPrice = getAppSelectore(getTotalPrice).toFixed(2);

  const removeProduct = (code: string) => {
    dispatch(removeProductFromCart(code));
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Заявки',
      headerTitleAlign: 'left',
      headerLeft: () => <Text></Text>,
      headerTitleStyle: {fontSize: 27, fontWeight: '700'},
      animation: 'none',
    });
  }, [navigation]);

  return (
    <PaddingLayout>
      <ScrollView>
        <RequestView>
          {cartProduct.map(product => (
            <RequestItems key={product.code}>
              <Text>Имя товара: {product.name}</Text>
              <Text>Количество: {product.quantum}</Text>
              <Text>Цена: {product.price} ₽</Text>
              <Button
                title="X"
                onPress={() => removeProduct(product.code)}
                style={{marginTop: 10, width: 30, height: 30}}
              />
            </RequestItems>
          ))}
          {totalPrice === '0.00' ? (
            <Text style={{fontWeight: '600', marginBottom: 30}}>
              Корзина пуста
            </Text>
          ) : (
            <Text style={{fontWeight: '600', marginBottom: 30}}>
              В сумме: {totalPrice} ₽
            </Text>
          )}
        </RequestView>
      </ScrollView>
    </PaddingLayout>
  );
};

export default Request;

const RequestView = styled(View)`
  width: 100%;
  height: 100%;
  margin-top: 20px;

  align-items: center;
  gap: 30px;
`;

const RequestItems = styled(View)`
  align-items: center;
`;
