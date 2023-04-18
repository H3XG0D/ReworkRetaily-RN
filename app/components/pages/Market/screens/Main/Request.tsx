import {View, Text, ScrollView, Image} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RetaiyRootTypeParamList} from '../../../../../Navigation/routes';

import {
  getAppSelectore,
  useAppDispatch,
} from '../../../../../../redux/store/store.hooks';

import {
  getCartSelector,
  getTotalPrice,
  removeProductFromCart,
} from '../../../../../../redux/Cart/Cart.slice';

import Button from '../../../../UI/Button';
import styled from 'styled-components';
import {COLORS, siteUrl} from '../../../../../constants';

import RetailyLayout from '../../../../layout/RetailyLayout';

const Request = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RetaiyRootTypeParamList>>();

  const dispatch = useAppDispatch();
  const cartProduct = getAppSelectore(getCartSelector);
  const totalPrice = getAppSelectore(getTotalPrice).toFixed(2);

  const removeProduct = (code: string) => {
    dispatch(removeProductFromCart(code));
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Корзина',
      headerTitleAlign: 'left',
      headerLeft: () => <Text></Text>,
      headerTitleStyle: {fontSize: 27, fontWeight: '700'},
      animation: 'none',
    });
  }, [navigation]);

  return (
    <RetailyLayout>
      <ScrollView>
        {cartProduct.map(product => (
          <RequestView key={product.code}>
            <RequestItems>
              <RequestImage>
                <Image
                  source={{
                    uri:
                      product && product.images && product.images.length > 0
                        ? siteUrl + '/api/repo/' + product.images[0]
                        : undefined,
                  }}
                  style={{
                    width: '100%',
                    height: '100%',
                    resizeMode: 'contain',
                  }}
                />
              </RequestImage>

              <View>
                <Text>Имя товара: {product.name}</Text>
              </View>
              <View style={{width: 100}}>
                <Text style={{color: COLORS.primary}}>
                  Цена: {product.price} ₽
                </Text>
              </View>
              <Button
                title="X"
                onPress={() => removeProduct(product.code)}
                style={{width: 25, height: 25, marginTop: 0}}
              />
            </RequestItems>
          </RequestView>
        ))}
        {totalPrice === '0.00' ? (
          <RequestTotalPrice>Корзина пуста</RequestTotalPrice>
        ) : (
          <RequestTotalPrice>В сумме: {totalPrice} ₽</RequestTotalPrice>
        )}
      </ScrollView>
    </RetailyLayout>
  );
};

export default Request;

const RequestImage = styled(View)`
  width: 80px;
  height: 80px;

  align-items: center;
  justify-content: center;

  border-width: 1px;
  padding: 5px;
  border-color: ${COLORS.brightgray};
`;

const RequestView = styled(View)`
  width: 100%;
  height: 120px;

  flex-direction: row;

  align-items: center;
  align-self: center;
  justify-content: center;

  border-radius: 10px;

  border-bottom-width: 1px;
  border-color: ${COLORS.brightgray};
`;

const RequestItems = styled(View)`
  width: 90px;
  height: 100px;

  flex-direction: row;
  gap: 20px;

  justify-content: center;
  align-items: center;
`;

const RequestTotalPrice = styled(Text)`
  font-size: 18px;
  font-weight: 600;
  text-align: center;
  margin-top: 15px;
  margin-bottom: 30px;
`;

const MiniBtnView = styled(View)`
  width: 30px;
  height: 30px;
  background-color: ${COLORS.brightgray};

  align-items: center;
  justify-content: center;
  border-radius: 10px;
`;

const MiniBtnText = styled(Text)`
  font-weight: bold;
`;
