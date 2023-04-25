import React from 'react';
import styled from 'styled-components';
import {View, Text, Image, TouchableOpacity, ScrollView} from 'react-native';

import {COLORS, siteUrl} from '../../../../../../constants';
import {
  getAppSelectore,
  useAppDispatch,
} from '../../../../../../../redux/store/store.hooks';
import {
  CartOrder,
  addProductToCart,
  decreaseProductToCart,
  getCartSelector,
  increaseProductToCart,
} from '../../../../../../../redux/Cart/Cart.slice';
import {
  IOrderProduct,
  IShop,
  ISupplier,
} from '../../../../../../../redux/types';

import ProductsSkeleton from '../../../Skeletons/ProductsSkeleton';

interface Props {
  loadSkeleton: any;
  products: any;
  setInfo: any;
  info: any;
  buy: any;

  category: any;
  setCategory: any;

  supplier: ISupplier;
  shop: IShop;
  showModal: () => void;
  getProductCategory: () => void;
}

const Items = (props: Props) => {
  const dispatch = useAppDispatch();
  const cartProduct = getAppSelectore(getCartSelector);

  // const [category, setCategory] = React.useState<any>(undefined);

  // const getProductCategory = async () => {
  //   const productCategory = await getProductPrice(
  //     'getProductPrice',
  //     String(props.info?.code),
  //     String(props.shop?.code),
  //     String(props.supplier?.code),
  //     productData,
  //   );
  //   setCategory(productCategory);
  // };

  // const product_properties = {
  //   ...props.info.properties2,
  // };

  // const map_product_properties = props.info?.properties2.map(
  //   ({name, ...data}: any) => data,
  // );

  // const values = map_product_properties?.find((i: any) => i?.values)?.values;
  // const code_values = values?.find((i: any) => i?.code)?.code;
  // const code_product = map_product_properties?.find((i: any) => i?.code)?.code;

  // const productData = [
  //   {
  //     property: code_product,
  //     code: code_values,
  //   },
  // ];

  const addToCart = (product: IOrderProduct) => {
    dispatch(
      addProductToCart({
        supplier: props.supplier,
        shop: props.shop,
        product: product,
      }),
    );
  };

  const incrementToCart = (product: IOrderProduct) => {
    dispatch(
      increaseProductToCart({
        supplier: props.supplier,
        shop: props.shop,
        product: product,
      }),
    );
  };

  const decreaseToCart = (product: IOrderProduct) => {
    dispatch(
      decreaseProductToCart({
        supplier: props.supplier,
        shop: props.shop,
        product: product,
      }),
    );
  };

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
                    <ProductsContentBoxTextContainer
                      style={{
                        borderBottomWidth: cartProduct?.some(
                          (f: CartOrder) =>
                            f.supplier.code === props.supplier.code &&
                            f.shop.code === props.shop.code &&
                            f.products.some(p => p.code === product.code),
                        )
                          ? 4
                          : 0,
                        borderColor: cartProduct?.some(
                          (f: CartOrder) =>
                            f.supplier.code === props.supplier.code &&
                            f.shop.code === props.shop.code &&
                            f.products.some(p => p.code === product.code),
                        )
                          ? COLORS.primary
                          : COLORS.brightgray,
                      }}>
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

                          {cartProduct?.some(
                            (f: CartOrder) =>
                              f.supplier.code === props.supplier.code &&
                              f.shop.code === props.shop.code &&
                              f.products.some(p => p.code === product.code),
                          ) ? (
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
                                  {cartProduct?.some(
                                    (f: CartOrder) =>
                                      f.supplier.code === props.supplier.code &&
                                      f.shop.code === props.shop.code &&
                                      f.products.some(
                                        p => p.code === product.code,
                                      ),
                                  ) ? (
                                    <Text
                                      style={{
                                        fontSize: 12,
                                        marginLeft: 10,
                                        marginBottom: 2,
                                        color: COLORS.primary,
                                      }}>
                                      {(
                                        cartProduct!
                                          .find(
                                            (f: CartOrder) =>
                                              f.supplier.code ===
                                                props.supplier.code &&
                                              f.shop.code === props.shop.code,
                                          )!
                                          .products.find(
                                            p => p.code === product.code,
                                          )!.price *
                                        cartProduct!
                                          .find(
                                            (f: CartOrder) =>
                                              f.supplier.code ===
                                                props.supplier.code &&
                                              f.shop.code === props.shop.code,
                                          )!
                                          .products.find(
                                            p => p.code === product.code,
                                          )!.quantity
                                      ).toFixed(2)}{' '}
                                      ₽
                                    </Text>
                                  ) : null}
                                </>
                              )}
                            </>
                          ) : null}

                          <ProductsContentBoxSubText>
                            {product.description_short}
                          </ProductsContentBoxSubText>

                          <TouchableOpacity
                            onPress={() => {
                              props.setInfo(product);
                              addToCart(product);
                            }}
                            disabled={
                              true
                                ? cartProduct?.some(
                                    (f: CartOrder) =>
                                      f.supplier.code === props.supplier.code &&
                                      f.shop.code === props.shop.code &&
                                      f.products.some(
                                        p => p.code === product.code,
                                      ),
                                  )
                                : false
                            }>
                            {cartProduct?.some(
                              (f: CartOrder) =>
                                f.supplier.code === props.supplier.code &&
                                f.shop.code === props.shop.code &&
                                f.products.some(p => p.code === product.code),
                            ) ? (
                              <>
                                <ProductsContentBoxMiniPrice>
                                  <TouchableOpacity
                                    onPress={() => decreaseToCart(product)}>
                                    <ProductMiniExpression>
                                      <ProductsExpression>-</ProductsExpression>
                                    </ProductMiniExpression>
                                  </TouchableOpacity>
                                  <Text
                                    style={{
                                      fontSize: 13,
                                    }}>
                                    {
                                      cartProduct!
                                        .find(
                                          (f: CartOrder) =>
                                            f.supplier.code ===
                                              props.supplier.code &&
                                            f.shop.code === props.shop.code,
                                        )!
                                        .products.find(
                                          p => p.code === product.code,
                                        )!.quantity
                                    }
                                  </Text>
                                  <TouchableOpacity
                                    onPress={() => incrementToCart(product)}>
                                    <ProductMiniExpression>
                                      <ProductsExpression>+</ProductsExpression>
                                    </ProductMiniExpression>
                                  </TouchableOpacity>
                                </ProductsContentBoxMiniPrice>
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
