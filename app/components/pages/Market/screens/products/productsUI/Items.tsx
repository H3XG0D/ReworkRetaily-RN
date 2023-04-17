import React from 'react';
import styled from 'styled-components';

import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';

import {COLORS, siteUrl} from '../../../../../../constants';
import ProductsSkeleton from '../../../Skeletons/ProductsSkeleton';

interface Props {
  products: any;
  buy: any;
  loadSkeleton: any;

  setInfo: any;
  makeActive: any;
  miniActive: any;

  choosed: any;
  setChoosed: any;

  showModal: () => void;
  incrementCounter: (product: any) => void;
  decrementCounter: (product: any) => void;
}

const Items = (props: Props) => {
  return (
    <ScrollView>
      <ProductsContentContainer>
        {props.loadSkeleton ? (
          <ProductsSkeleton />
        ) : (
          <>
            {props.products && props.products.length > 0
              ? props.products.map((product: any) => {
                  return (
                    <ProductsContentBoxTextContainer>
                      <ProductsContentOutsideBox>
                        <ProductsContentBox>
                          <TouchableOpacity
                            onPress={() => {
                              props.showModal();
                              props.setInfo(product);
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

                          {props.miniActive && props.choosed == product.code ? (
                            <>
                              {props.buy ? (
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
                              props.makeActive();
                              props.setInfo(product);
                              debugger;
                            }}
                            onPressIn={() => props.setChoosed(product?.code)}>
                            {props.miniActive == true &&
                            props.choosed == product.code ? (
                              <>
                                {product?.quantum <= 0 ? (
                                  <TouchableOpacity
                                    onPress={() =>
                                      props.incrementCounter(product)
                                    }>
                                    <ProductsContentBoxPriceContainer>
                                      <ProductsContentBoxPriceText>
                                        {product.price} ₽
                                      </ProductsContentBoxPriceText>
                                    </ProductsContentBoxPriceContainer>
                                  </TouchableOpacity>
                                ) : (
                                  <ProductsContentBoxMiniPrice>
                                    <TouchableOpacity
                                      onPress={() =>
                                        props.decrementCounter(product)
                                      }>
                                      <ProductMiniExpression>
                                        <ProductsExpression>
                                          -
                                        </ProductsExpression>
                                      </ProductMiniExpression>
                                    </TouchableOpacity>
                                    <Text
                                      style={{
                                        fontSize: 13,
                                      }}>
                                      {product?.quantum}
                                    </Text>
                                    <TouchableOpacity
                                      onPress={() =>
                                        props.incrementCounter(product)
                                      }>
                                      <ProductMiniExpression>
                                        <ProductsExpression>
                                          +
                                        </ProductsExpression>
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
          </>
        )}
      </ProductsContentContainer>
    </ScrollView>
  );
};

export default Items;

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
