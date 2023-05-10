import React from 'react';
import {View, Text, TouchableOpacity, Image, ScrollView} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {
  BottomRootTypeParamList,
  MyRequestTypeRootParamList,
} from '../../../../../../Navigation/routes';
import {COLORS, siteUrl} from '../../../../../../constants';

import styled from 'styled-components';
import {checkProducts, repeatOrder} from '../../../../../../api/api';
import {useAppDispatch} from '../../../../../../../redux/store/store.hooks';
import {addProductToCart} from '../../../../../../../redux/Cart/Cart.slice';

const MyRequestOrder = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MyRequestTypeRootParamList>>();

  const cart =
    useNavigation<NativeStackNavigationProp<BottomRootTypeParamList>>();

  const route = useRoute();
  const {item}: any = route.params;
  const dispatch = useAppDispatch();

  const [load, setLoad] = React.useState<boolean>(false);
  const [products, setProducts] = React.useState<any>();
  const [data, setData] = React.useState<any>();

  let productCode = item.orders_products?.map((info: any) => info);

  const checkProductData = async () => {
    setLoad(true);
    const data = await checkProducts(
      'checkProducts',
      productCode,
      item.shop,
      item.supplier,
    );
    setData(data);
  };

  const repeatOrderProducts = async () => {
    const data = await repeatOrder('repeatorder', item.code, item.shop);
    setLoad(false);
    setProducts(data);
  };

  const addToCart = () => {
    dispatch(
      addProductToCart({
        supplier: item?.supplier,
        shop: item?.shop,
        product: data.products,
        balance: products?.orders_products?.map((i: any) => i.balance),
        price: products?.orders_products?.map((i: any) => i.price),
        quantum: products?.orders_products?.map((i: any) => i.quantum),
        step: products?.orders_products?.map((i: any) => i.step),
        ei: products?.orders_products?.map((i: any) => i.ei),
        product_properties: products?.orders_products?.map(
          (i: any) => i.properties1,
        ),
        description_short: products?.orders_products?.map(
          (i: any) => i.description_short,
        ),
      }),
    );
  };

  const cartNavigate = () => {
    addToCart();
    cart.navigate('Request');
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: item.num,
      headerTitleAlign: 'left',
      headerTitleStyle: {fontSize: 18, fontWeight: '700'},
      animation: 'none',
    });
  }, [navigation]);

  return (
    <MyRequestOrderMain>
      <ScrollView>
        <MyRequestOrderContainer>
          <MyRequestOrderItems>
            <Text style={{color: COLORS.gray, fontSize: 14}}>
              {item?.date_create}
            </Text>
            <Text style={{fontSize: 14}}>{item?.supplier_name}</Text>
            <Text style={{fontSize: 14}}>{item?.shop_name}</Text>
          </MyRequestOrderItems>

          <Text style={{color: item.status_obj.color}}>
            {item.status_obj.name}
          </Text>
        </MyRequestOrderContainer>
        <Text style={{marginLeft: 'auto'}}>{item.total_cost.toFixed(2)} ₽</Text>

        <MyRequestBodyContainer>
          <Text>Комментарий:</Text>

          <MyRequestOrderBox>
            <MyRequestOrderBoxItems>
              <Text style={{color: COLORS.gray, fontSize: 13}}>
                {item.comment}
              </Text>
            </MyRequestOrderBoxItems>
          </MyRequestOrderBox>

          <TouchableOpacity>
            <MyRequestCancelBtn>
              <MyRequestCancelBtnText>Отменить</MyRequestCancelBtnText>
            </MyRequestCancelBtn>
          </TouchableOpacity>

          <RequestView>
            {item.orders_products?.map((info: any) => (
              <RequestItems>
                <RequestImage>
                  <Image
                    source={{
                      uri:
                        info && info.images && info.images.length > 0
                          ? siteUrl + '/api/repo/' + info.images[0]
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
                  <RequestProductName numberOfLines={3}>
                    {info.name}
                  </RequestProductName>

                  <RequestProductPrice>
                    <RequestProductWeight>
                      {info.description_short}
                    </RequestProductWeight>{' '}
                    • {info.price} ₽
                  </RequestProductPrice>
                </View>
                <RequestFinalPriceView>
                  <RequestFinalPriceText>
                    {info.total_cost} ₽
                  </RequestFinalPriceText>
                  <Text style={{marginLeft: 'auto', marginTop: 5}}>
                    {info.quantity} шт.
                  </Text>
                </RequestFinalPriceView>
              </RequestItems>
            ))}
          </RequestView>

          <TouchableOpacity
            onPress={() => {
              checkProductData();
              repeatOrderProducts();
              // cartNavigate();
            }}>
            <MyRequestRepeatBtn>
              <MyRequestRepeatBtnText>Повторить заявку</MyRequestRepeatBtnText>
            </MyRequestRepeatBtn>
          </TouchableOpacity>
        </MyRequestBodyContainer>
      </ScrollView>
    </MyRequestOrderMain>
  );
};

export default MyRequestOrder;

const MyRequestOrderMain = styled(View)`
  height: 100%;
  background-color: ${COLORS.white};
  padding: 15px 10px 0px 10px;
`;

const MyRequestOrderContainer = styled(View)`
  flex-direction: row;
  justify-content: space-between;
`;

const MyRequestOrderItems = styled(View)`
  gap: 5px;
`;

const MyRequestBodyContainer = styled(View)`
  margin-top: 10px;
`;

const MyRequestOrderBox = styled(View)`
  background-color: ${COLORS.milky};
  width: 100%;
  height: 80px;
  border-radius: 5px;
  margin-top: 5px;
  margin-bottom: 10px;
`;

const MyRequestOrderBoxItems = styled(View)`
  padding: 10px 5px 0px 10px;
  gap: 5px;
`;

const MyRequestRepeatBtn = styled(View)`
  background-color: ${COLORS.primary};
  width: 350px;
  height: 45px;
  align-items: center;
  justify-content: center;
  align-self: center;
  border-radius: 6px;
  margin-top: 30px;
  margin-bottom: 50px;
`;

const MyRequestRepeatBtnText = styled(Text)`
  color: ${COLORS.white};
  font-size: 14px;
`;

const MyRequestCancelBtn = styled(View)`
  background-color: ${COLORS.brightgray};
  width: 350px;
  height: 40px;
  align-items: center;
  justify-content: center;
  align-self: center;
  border-radius: 6px;
`;

const MyRequestCancelBtnText = styled(Text)`
  color: ${COLORS.black};
  font-size: 14px;
`;

const RequestView = styled(View)`
  flex-direction: column;
  margin-top: 15px;
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
  padding: 10px;

  border-radius: 10px;
  border-bottom-width: 1px;
  border-color: ${COLORS.brightgray};
`;

const RequestProductName = styled(Text)`
  font-size: 13px;
  width: 180px;
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
