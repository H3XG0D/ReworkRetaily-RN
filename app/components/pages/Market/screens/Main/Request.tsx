import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RetaiyRootTypeParamList} from '../../../../../Navigation/routes';

import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  getAppSelectore,
  useAppDispatch,
} from '../../../../../../redux/store/store.hooks';

import {
  CartOrder,
  decreaseProductToCart,
  getCartSelector,
  increaseProductToCart,
  removeAllFromCart,
} from '../../../../../../redux/Cart/Cart.slice';

import Button from '../../../../UI/Button';
import styled from 'styled-components';
import {COLORS, siteUrl} from '../../../../../constants';

import RetailyLayout from '../../../../layout/RetailyLayout';
import {IOrderProduct, IShop, ISupplier} from '../../../../../../redux/types';

const Request = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RetaiyRootTypeParamList>>();

  const dispatch = useAppDispatch();
  const cartProduct = getAppSelectore(getCartSelector);

  const incrementToCart = (
    supplier: ISupplier,
    shop: IShop,
    productInc: IOrderProduct,
  ) => {
    dispatch(
      increaseProductToCart({
        supplier: supplier,
        shop: shop,
        product: productInc,
      }),
    );
  };

  const decreaseToCart = (
    supplier: ISupplier,
    shop: IShop,
    productDec: IOrderProduct,
  ) => {
    dispatch(
      decreaseProductToCart({
        supplier: supplier,
        shop: shop,
        product: productDec,
      }),
    );
  };

  const removeCartItems = (shop: string) => {
    dispatch(removeAllFromCart(shop));
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
        {cartProduct.map((cart: CartOrder) => (
          <>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginTop: 15,
              }}>
              <Text
                style={{
                  fontSize: 20,
                  marginLeft: '5%',
                }}>
                {cart.shop.name}
              </Text>

              <TouchableOpacity
                onPress={() => removeCartItems(cart.shop.code)}
                style={{marginLeft: 'auto', marginRight: '5%'}}>
                <MaterialCommunityIcons name="trash-can" size={30} />
              </TouchableOpacity>
            </View>

            {cart.products.map(item => (
              <RequestView key={item.code}>
                <RequestItems>
                  <RequestImage>
                    <Image
                      source={{
                        uri:
                          item && item.images && item.images.length > 0
                            ? siteUrl + '/api/repo/' + item.images[0]
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
                    <Text>Имя товара: {item.name}</Text>
                    <Text style={{color: COLORS.primary}}>
                      {(
                        cartProduct!
                          .find(
                            (f: CartOrder) =>
                              f.supplier.code === cart.supplier.code &&
                              f.shop.code === cart.shop.code,
                          )!
                          .products.find(p => p.code === item.code)!.price *
                        cartProduct!
                          .find(
                            (f: CartOrder) =>
                              f.supplier.code === cart.supplier.code &&
                              f.shop.code === cart.shop.code,
                          )!
                          .products.find(p => p.code === item.code)!.quantity
                      ).toFixed(2)}{' '}
                      ₽
                    </Text>
                  </View>

                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 10,
                    }}>
                    <Button
                      title="+"
                      onPress={() =>
                        incrementToCart(cart.supplier, cart.shop, item)
                      }
                      style={{width: 25, height: 25, marginTop: 0}}
                    />

                    <Text>{item.quantity}</Text>

                    <Button
                      title="-"
                      onPress={() =>
                        decreaseToCart(cart.supplier, cart.shop, item)
                      }
                      style={{width: 25, height: 25, marginTop: 0}}
                    />
                  </View>
                </RequestItems>
              </RequestView>
            ))}
          </>
        ))}
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
  gap: 30px;

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
