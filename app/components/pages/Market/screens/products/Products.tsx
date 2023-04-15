import React, {ReactElement} from 'react';
import styled from 'styled-components';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MarketRootParamList} from '../../../../../Navigation/routes';

import {getProductsInfo} from '../../../../../api/api';
import {COLORS, siteUrl} from '../../../../../constants';
import Modal from './productsUI/Modal';

interface Props {
  supplier: any;
  selectShopCode: any;
  category: any;
}

const Products = (props: Props): ReactElement => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MarketRootParamList>>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: props.supplier.name,
      headerTitleStyle: {fontSize: 20},
      animation: 'fade',
    });
  }, [navigation]);

  const [products, setProducts] = React.useState<any>(undefined);

  const [active, setActive] = React.useState<boolean>(false);
  const [info, setInfo] = React.useState<any>(undefined);
  const [buy, setBuy] = React.useState<boolean>(false);
  const [miniActive, setMiniActive] = React.useState<boolean>(false);
  const [choosed, setChoosed] = React.useState<string | undefined>(undefined);

  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
  const [loadSkeleton, setLoadSkeleton] = React.useState<boolean>(true);

  const getProducts = async () => {
    const products = await getProductsInfo(
      'getProducts',
      props.category.code,
      props.selectShopCode,
      props.supplier.code,
    );
    setProducts(products);
    setLoadSkeleton(false);
  };

  const showModal = () => {
    setModalVisible(!isModalVisible);
  };

  const AddProduct = (product: any) => {
    setActive(false);
    setBuy(false);

    let obj = {...info};
    obj.quantum = obj.step;
    setInfo(obj);
  };

  const incrementCounter = (product: any) => {
    let obj = {...info};
    obj.quantum = obj.quantum + obj.step;

    let newArray = [...products];
    let newRow = newArray.find((a: any) => a.code === obj.code);
    newRow.quantum = obj.quantum;

    setProducts(newArray);
    setInfo(obj);
  };

  const decrementCounter = (product: any) => {
    let obj = {...info};
    obj.quantum = obj.quantum - obj.step;

    let newArray = [...products];
    let newRow = newArray.find((a: any) => a.code === obj.code);
    newRow.quantum = obj.quantum;

    setProducts(newArray);
    setInfo(obj);
  };

  const makeActive = () => {
    setMiniActive(true);
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <View>
      <ScrollView>
        <ProductsContentContainer>
          {products && products.length > 0
            ? products.map((product: any) => {
                return (
                  <ProductsContentBoxTextContainer>
                    <ProductsContentOutsideBox>
                      <ProductsContentBox>
                        <TouchableOpacity
                          onPress={() => {
                            showModal();
                            setInfo(product);
                          }}>
                          <ProductsContentImages
                            source={{
                              uri:
                                product &&
                                product.images &&
                                product.images.length > 0
                                  ? siteUrl + '/api/repo/' + product.images[0]
                                  : undefined,
                            }}
                          />
                        </TouchableOpacity>

                        <ProductsContentBoxText numberOfLines={3}>
                          {product.name}
                        </ProductsContentBoxText>

                        {miniActive && choosed == product.code ? (
                          <>
                            {buy ? (
                              <Text
                                style={{
                                  fontSize: 12,
                                  marginLeft: 10,
                                  marginBottom: 2,
                                  color: COLORS.primary,
                                }}>
                                {product?.price}
                              </Text>
                            ) : (
                              <>
                                {product?.quantum <= 0 ? null : (
                                  <Text
                                    style={{
                                      fontSize: 12,
                                      marginLeft: 10,
                                      marginBottom: 2,
                                      color: COLORS.primary,
                                    }}>
                                    {(
                                      product?.price * product?.quantum
                                    ).toFixed(2)}{' '}
                                    ₽
                                  </Text>
                                )}
                              </>
                            )}
                          </>
                        ) : null}

                        <ProductsContentBoxSubText>
                          {product.description_short}
                        </ProductsContentBoxSubText>

                        <TouchableOpacity
                          onPress={() => {
                            makeActive();
                            setInfo(product);
                          }}
                          onPressIn={() => setChoosed(product?.code)}>
                          {miniActive == true && choosed == product.code ? (
                            <>
                              {product?.quantum <= 0 ? (
                                <TouchableOpacity
                                  onPress={() => incrementCounter(product)}>
                                  <ProductsContentBoxPriceContainer>
                                    <ProductsContentBoxPriceText>
                                      {product.price} ₽
                                    </ProductsContentBoxPriceText>
                                  </ProductsContentBoxPriceContainer>
                                </TouchableOpacity>
                              ) : (
                                <ProductsContentBoxMiniPrice>
                                  <TouchableOpacity
                                    onPress={() => decrementCounter(product)}>
                                    <ProductMiniExpression>
                                      <ProductsExpression>-</ProductsExpression>
                                    </ProductMiniExpression>
                                  </TouchableOpacity>
                                  <Text
                                    style={{
                                      fontSize: 13,
                                    }}>
                                    {product?.quantum}
                                  </Text>
                                  <TouchableOpacity
                                    onPress={() => incrementCounter(product)}>
                                    <ProductMiniExpression>
                                      <ProductsExpression>+</ProductsExpression>
                                    </ProductMiniExpression>
                                  </TouchableOpacity>
                                </ProductsContentBoxMiniPrice>
                              )}
                            </>
                          ) : (
                            <ProductsContentBoxPriceContainer>
                              <ProductsContentBoxPriceText>
                                {product.price} ₽
                              </ProductsContentBoxPriceText>
                            </ProductsContentBoxPriceContainer>
                          )}
                        </TouchableOpacity>
                      </ProductsContentBox>
                    </ProductsContentOutsideBox>
                  </ProductsContentBoxTextContainer>
                );
              })
            : undefined}
        </ProductsContentContainer>
      </ScrollView>
      <Modal
        isModalVisible={isModalVisible}
        info={info}
        active={active}
        showModal={showModal}
        AddProduct={AddProduct}
        incrementCounter={incrementCounter}
        decrementCounter={decrementCounter}
      />
    </View>
  );
};

export default Products;

const ProductsContentContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 10px;

  padding: 10px 10px 10px 15px;
`;

const ProductsContentOutsideBox = styled(View)`
  margin-bottom: 125%;
`;

const ProductsContentBox = styled(View)`
  background-color: ${COLORS.white};
  width: 115px;
  height: 110px;

  border-radius: 8px;
`;

const ProductsContentImages = styled(Image)`
  width: 100%;
  height: 100%;
  object-fit: contain;

  border-radius: 8px;
`;

const ProductsContentBoxText = styled(Text)`
  color: ${COLORS.black};
  height: 50%;
  font-size: 12px;

  margin-left: 10px;
  margin-top: 10px;
`;

const ProductsContentBoxSubText = styled(Text)`
  color: ${COLORS.gray};
  font-size: 12px;

  margin-left: 10px;
`;

const ProductsContentBoxPriceContainer = styled(View)`
  background-color: ${COLORS.white};
  align-self: center;
  width: 90px;
  font-size: 13px;

  border-radius: 5px;
  margin-top: 30px;
  padding: 5px;
`;

const ProductsContentBoxPriceText = styled(Text)`
  color: ${COLORS.black};

  font-size: 13px;
  text-align: center;
`;

const ProductsContentBoxMiniPrice = styled(View)`
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;

  margin-top: 10px;
`;

const ProductsContentBoxTextContainer = styled(View)`
  background-color: ${COLORS.brightgray};

  border-radius: 8px;
  margin-bottom: 15px;
`;

const ProductMiniExpression = styled(View)`
  background-color: ${COLORS.white};
  width: 30px;
  height: 30px;

  align-items: center;
  justify-content: center;

  border-radius: 10px;
`;

const ProductsExpression = styled(Text)`
  font-weight: 600;
`;
