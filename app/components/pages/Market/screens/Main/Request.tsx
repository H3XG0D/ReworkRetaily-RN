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
          <View>
            <RequestHeader>
              <RequestSuppler>{cart.supplier.name}</RequestSuppler>
              <RequestTrashIcon onPress={() => removeCartItems(cart.shop.code)}>
                <MaterialCommunityIcons name="trash-can" size={30} />
              </RequestTrashIcon>
            </RequestHeader>

            <RequestShop>{cart.shop.name}</RequestShop>

            {cart.products.map(item => (
              <RequestView key={cart.shop.code}>
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

                  <RequestInfo>
                    <RequestProductName numberOfLines={3}>
                      {item.name}
                    </RequestProductName>

                    <RequestProductPrice>
                      <RequestProductWeight>
                        {item.description_short}
                      </RequestProductWeight>{' '}
                      • {item.price} ₽
                    </RequestProductPrice>
                  </RequestInfo>

                  <RequestRightView>
                    <RequestFinalPriceView>
                      <RequestFinalPriceText>
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
                      </RequestFinalPriceText>
                    </RequestFinalPriceView>

                    <RequestBtn>
                      <TouchableOpacity
                        onPress={() =>
                          decreaseToCart(cart.supplier, cart.shop, item)
                        }>
                        <MiniBtnView>
                          <MiniBtnText>-</MiniBtnText>
                        </MiniBtnView>
                      </TouchableOpacity>

                      <Text>{item.quantity}</Text>

                      <TouchableOpacity
                        onPress={() =>
                          incrementToCart(cart.supplier, cart.shop, item)
                        }>
                        <MiniBtnView>
                          <MiniBtnText>+</MiniBtnText>
                        </MiniBtnView>
                      </TouchableOpacity>
                    </RequestBtn>
                  </RequestRightView>
                </RequestItems>
              </RequestView>
            ))}
          </View>
        ))}
      </ScrollView>
    </RetailyLayout>
  );
};

export default Request;

const RequestView = styled(View)`
  width: 90%;
  height: 90px;
  flex-direction: row;

  border-radius: 10px;
  border-bottom-width: 1px;
  border-color: ${COLORS.brightgray};

  margin-top: 15px;
  margin-left: 5%;
`;

const RequestHeader = styled(View)`
  flex-direction: row;
  margin-top: 15px;
`;

const RequestInfo = styled(View)`
  margin-bottom: 30px;
`;

const RequestRightView = styled(View)`
  margin-left: 3%;
`;

const RequestFinalPriceView = styled(View)`
  margin-top: 5px;
  margin-bottom: 10px;
  margin-left: auto;
`;

const RequestFinalPriceText = styled(Text)`
  color: ${COLORS.secondary};

  font-size: 12px;
  font-weight: 600;
`;

const RequestBtn = styled(View)`
  flex-direction: row;
  gap: 10;

  align-items: center;
`;

const RequestImage = styled(View)`
  width: 75px;
  height: 75px;

  align-items: center;
  justify-content: center;

  border-width: 1px;
  border-radius: 6px;
  border-color: ${COLORS.brightgray};
`;

const RequestItems = styled(View)`
  flex-direction: row;
  gap: 10px;
`;

const RequestSuppler = styled(Text)`
  font-size: 17px;
  font-weight: 600;

  margin-left: 5%;
`;

const RequestShop = styled(Text)`
  font-size: 16px;
  font-weight: 400;

  margin-left: 5%;
`;

const RequestProductName = styled(Text)`
  width: 140px;

  font-size: 13px;
  line-height: 20px;
`;

const RequestProductPrice = styled(Text)`
  color: ${COLORS.primary};

  font-size: 12px;
  margin-top: 3px;
`;

const RequestProductWeight = styled(Text)`
  color: ${COLORS.gray};
`;

const RequestTrashIcon = styled(TouchableOpacity)`
  margin-left: auto;
  margin-right: 5%;
`;

const MiniBtnView = styled(View)`
  width: 40px;
  height: 40px;

  background-color: ${COLORS.brightgray};

  align-items: center;
  justify-content: center;
  border-radius: 6px;
`;

const MiniBtnText = styled(Text)`
  font-size: 10px;
  font-weight: 600;
`;
