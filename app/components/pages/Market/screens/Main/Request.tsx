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

  // let prod = {...cartProduct.map(i => i.products)};
  // const productToCart = Object.values(prod);

  // const productName = cartProduct
  //   .find(order => order.shop.code != order.shop.code)
  //   ?.products.map(i => i.name);

  // console.log(cartProduct);

  // const productName = cartProduct
  //   .filter(p => p.shop.code[0] != p.shop.code[1])
  //   .find(p => p.products);

  // console.log(shopProduct);

  // const shopProduct = cartProduct.find(
  //   i => i.shop.code != i.shop.code,
  // )?.products;

  // const shopProduct = cartProduct.map(v => {
  //   let obj = cartProduct.find(o => o.products === v.products);

  //   if (obj) {
  //     v.products = obj.products;
  //   }

  //   return v;
  // });

  // console.log(shopProduct);

  // const prod = shopProduct.map(i => i.map(t => t))

  // let order: CartOrder;
  // const ord = cartProduct.find(i => i.shop.code !== order?.shop.code)?.products;

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

  const removeCartItems = () => {
    dispatch(removeAllFromCart());
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Корзина',
      headerTitleAlign: 'left',
      headerLeft: () => <Text></Text>,
      headerRight: () => (
        <TouchableOpacity
          onPress={() => removeCartItems()}
          style={{marginRight: 20}}>
          <MaterialCommunityIcons name="trash-can" size={30} />
        </TouchableOpacity>
      ),
      headerTitleStyle: {fontSize: 27, fontWeight: '700'},
      animation: 'none',
    });
  }, [navigation]);

  return (
    <RetailyLayout>
      <ScrollView>
        {cartProduct.map((cart: CartOrder) => (
          <>
            <Text
              style={{
                fontSize: 16,
                fontWeight: '600',
                textAlign: 'center',
                paddingTop: 20,
              }}>
              {cart.shop.name}
            </Text>
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
                    <Text style={{color: COLORS.primary}}>{item.price} ₽</Text>
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
