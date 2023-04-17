import {View, Text} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RetaiyRootTypeParamList} from '../../../../../Navigation/routes';
import RetailyLayout from '../../../../layout/RetailyLayout';
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
    <RequestView>
      {cartProduct.map(product => (
        <RequestItems key={product.code}>
          {/* <Text>{`Имя товара: ${product.name} количество: ${
            product.amount
          } цена: ${product.price} в сумме:${
            product.amount * product.price
          }$`}</Text>
          <Button title="Удалить" onPress={() => removeProduct(product.code)} />
          <Text>Total: {totalPrice}</Text> */}
          <Text>Имя товара: {product.name}</Text>
          <Text>Количество: {product.quantum}</Text>
          <Text>Цена: {product.price}</Text>
          <Button
            title="X"
            onPress={() => removeProduct(product.code)}
            style={{marginTop: 10, width: 30, height: 30}}
          />
        </RequestItems>
      ))}
      <Text style={{fontWeight: '600'}}>В сумме: {totalPrice}</Text>
    </RequestView>
  );
};

export default Request;

const RequestView = styled(View)`
  width: 100%;
  height: 100%;

  align-items: center;
  justify-content: center;
  gap: 30px;
`;

const RequestItems = styled(View)`
  align-items: center;
  justify-content: center;
`;
