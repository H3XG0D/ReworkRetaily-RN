import React from 'react';
import styled from 'styled-components';

import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TextInput,
} from 'react-native';

import {COLORS, siteUrl} from '../../../../../../constants';
import ReactNativeModal from 'react-native-modal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import {
  getAppSelectore,
  useAppDispatch,
} from '../../../../../../../redux/store/store.hooks';

import {
  CartOrder,
  decreaseProductToCart,
  getCartSelector,
  increaseProductToCart,
  updateCartQuantity,
} from '../../../../../../../redux/Cart/Cart.slice';

import {IProduct, IShop, ISupplier} from '../../../../../../../redux/types';

interface IModal {
  isModalVisible: any;
  info: any;
  setInfo: any;
  cart: any;

  showModal: () => void;
}

const Modal = (props: IModal) => {
  const dispatch = useAppDispatch();
  const cartProduct = getAppSelectore(getCartSelector);

  const [quantity, onChangeQuantity] = React.useState<string>('');

  const incrementToCart = (
    supplier: ISupplier,
    shop: IShop,
    productInc: IProduct,
  ) => {
    dispatch(
      increaseProductToCart({
        supplier: supplier,
        shop: shop,
        product: productInc,
        // code: selected && selected.code ? selected.code : product.code,
        balance: productInc.balance,
        price: productInc.price,
        quantum: productInc.quantum,
        step: productInc.step,
        ei: productInc.ei,
        product_properties: productInc.description,
        description_short: productInc.description_short,
      }),
    );
  };

  const decreaseToCart = (
    supplier: ISupplier,
    shop: IShop,
    productDec: IProduct,
  ) => {
    dispatch(
      decreaseProductToCart({
        supplier: supplier,
        shop: shop,
        product: productDec,
        // code: selected && selected.code ? selected.code : product.code,
        balance: productDec.balance,
        price: productDec.price,
        quantum: productDec.quantum,
        step: productDec.step,
        ei: productDec.ei,
        product_properties: productDec.description,
        description_short: productDec.description_short,
      }),
    );
  };

  const handleQuantity = (
    product: IProduct,
    supplier: ISupplier,
    shop: IShop,
    e: any,
  ) => {
    dispatch(
      updateCartQuantity({
        value: e.nativeEvent.text,
        supplier: supplier,
        shop: shop,
        product: product,
        // code: selected && selected.code ? selected.code : product.code,
        balance: product.balance,
        price: product.price,
        quantum: product.quantum,
        step: product.step,
        ei: product.ei,
        product_properties: product.description,
        description_short: product.description_short,
      }),
    );
  };

  const value = cartProduct!
    .find(
      (f: CartOrder) =>
        f.supplier.code === props.cart?.supplier?.code &&
        f.shop.code === props.cart?.shop?.code,
    )
    ?.products.find(p => p.code === props.info?.code)?.quantity;

  const oldQuantum = React.useRef('');

  const handleChange = (e: any) => {
    oldQuantum.current = quantity;
    onChangeQuantity(String(value));
  };

  React.useEffect(() => {
    onChangeQuantity(String(value));
  }, [value]);

  return (
    <ReactNativeModal
      isVisible={props.isModalVisible}
      backdropOpacity={0.4}
      onSwipeComplete={() => props.showModal()}
      swipeDirection="down"
      style={{
        width: '100%',
        height: '100%',
        margin: 0,
        padding: 0,
        justifyContent: 'flex-end',
      }}>
      <View
        style={{
          maxHeight: 1300 - 10,
          width: '100%',
          backgroundColor: COLORS.white,
          borderRadius: 15,
          marginTop: 50,
        }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <TouchableOpacity onPress={() => props.showModal()}>
            <FontAwesomeIcon
              icon={faClose}
              size={28}
              style={{
                marginLeft: 'auto',
                marginRight: 20,
                marginTop: 15,
              }}
            />
          </TouchableOpacity>

          <ProductsModalImage
            source={{
              uri:
                props.info && props.info.images && props.info.images.length > 0
                  ? siteUrl + '/api/repo/' + props.info.images[0]
                  : undefined,
            }}
          />

          <ProductsModalContent>
            <ProductsModalHeader>
              <ProductsModalTitle>{props.info?.name}</ProductsModalTitle>
              <View style={{alignItems: 'center'}}>
                {cartProduct?.some(
                  (f: CartOrder) =>
                    f.supplier.code === props.cart?.supplier?.code &&
                    f.shop.code === props.cart?.shop?.code &&
                    f.products.some(p => p.code === props.info?.code),
                ) ? (
                  <>
                    {props.info?.quantum <= 0 ? null : (
                      <ProductsModalCost>
                        {cartProduct && cartProduct.length > 0
                          ? (
                              cartProduct!
                                .find(
                                  (f: CartOrder) =>
                                    f.supplier.code ===
                                      props.cart?.supplier?.code &&
                                    f.shop.code === props.cart?.shop?.code,
                                )!
                                .products.find(
                                  p => p.code === props.info?.code,
                                )!.price *
                              cartProduct!
                                .find(
                                  (f: CartOrder) =>
                                    f.supplier.code ===
                                      props.cart?.supplier?.code &&
                                    f.shop.code === props.cart?.shop?.code,
                                )!
                                .products.find(
                                  p => p.code === props.info?.code,
                                )!.quantity
                            ).toFixed(2)
                          : null}{' '}
                        ₽
                      </ProductsModalCost>
                    )}
                    {cartProduct?.some(
                      (f: CartOrder) =>
                        f.supplier.code === props.cart?.supplier?.code &&
                        f.shop.code === props.cart?.shop?.code &&
                        f.products.some(p => p.code === props.info?.code),
                    ) ? (
                      <>
                        {props.info?.quantum <= 0 ? null : (
                          <ProductsModalSubtitleCost>
                            {props.info?.price} ₽
                          </ProductsModalSubtitleCost>
                        )}
                      </>
                    ) : null}
                  </>
                ) : null}
              </View>
            </ProductsModalHeader>

            {cartProduct?.some(
              (f: CartOrder) =>
                f.supplier.code === props.cart?.supplier?.code &&
                f.shop.code === props.cart?.shop?.code &&
                f.products.some(p => p.code === props.info?.code),
            ) ? (
              <>
                <ProductsModalCountView>
                  <TouchableOpacity
                    onPress={() =>
                      cartProduct.find((f: CartOrder) =>
                        decreaseToCart(
                          props.cart.supplier,
                          props.cart.shop,
                          props.info,
                        ),
                      )
                    }>
                    <ProductsModalMinusBtn>
                      <ProductsModalExpression>-</ProductsModalExpression>
                    </ProductsModalMinusBtn>
                  </TouchableOpacity>
                  <TextInput
                    onEndEditing={(e: any) => {
                      handleQuantity(
                        props?.info,
                        props.cart.supplier,
                        props.cart.shop,
                        e,
                      );
                    }}
                    onChangeText={value => onChangeQuantity(value)}
                    value={quantity}
                    keyboardType="number-pad"
                    onBlur={(e: any) => handleChange(e)}
                    style={{
                      width: 80,
                      height: 50,
                      backgroundColor: COLORS.white,
                      color: COLORS.black,
                      fontSize: 20,
                      fontWeight: '600',
                      textAlign: 'center',
                    }}
                  />
                  <TouchableOpacity
                    onPress={() =>
                      cartProduct.find((f: CartOrder) =>
                        incrementToCart(
                          props.cart.supplier,
                          props.cart.shop,
                          props.info,
                        ),
                      )
                    }>
                    <ProductsModalPlusBtn>
                      <ProductsModalExpression>+</ProductsModalExpression>
                    </ProductsModalPlusBtn>
                  </TouchableOpacity>
                </ProductsModalCountView>
              </>
            ) : // <ProductsModalCountView>
            //   <TouchableOpacity
            //     onPress={() =>
            //       cartProduct.find((f: CartOrder) =>
            //         decreaseToCart(
            //           props.cart.supplier,
            //           props.cart.shop,
            //           props.info,
            //         ),
            //       )
            //     }>
            //     <ProductsModalMinusBtn>
            //       <ProductsModalExpression>-</ProductsModalExpression>
            //     </ProductsModalMinusBtn>
            //   </TouchableOpacity>

            //   <TextInput
            //     onChange={(e: any) =>
            //       cartProduct.find((f: CartOrder) =>
            //         handleQuantity(e, props.info),
            //       )
            //     }
            //     style={{
            //       width: 80,
            //       height: 50,
            //       backgroundColor: COLORS.white,
            //       color: COLORS.black,
            //       fontSize: 20,
            //       fontWeight: '600',
            //       textAlign: 'center',
            //     }}>
            //     {
            //       cartProduct!
            //         .find(
            //           (f: CartOrder) =>
            //             f.supplier.code === props.cart?.supplier?.code &&
            //             f.shop.code === props.cart?.shop?.code,
            //         )
            //         ?.products.find(p => p.code === props.info?.code)
            //         ?.quantity
            //     }
            //   </TextInput>
            //   <TouchableOpacity
            //     onPress={() =>
            //       cartProduct.find((f: CartOrder) =>
            //         incrementToCart(
            //           props.cart.supplier,
            //           props.cart.shop,
            //           props.info,
            //         ),
            //       )
            //     }>
            //     <ProductsModalPlusBtn>
            //       <ProductsModalExpression>+</ProductsModalExpression>
            //     </ProductsModalPlusBtn>
            //   </TouchableOpacity>
            // </ProductsModalCountView>
            null}

            <ProductModalInfoContainer>
              {props.info?.properties1 && props.info?.properties1.length > 0
                ? props.info.properties1.map((prop: any) => {
                    return (
                      <View
                        style={{
                          flexDirection: 'row',
                        }}>
                        <View style={{marginLeft: '5%'}}>
                          <ProductModalInfoCharacteristic>
                            {prop.name}:
                          </ProductModalInfoCharacteristic>
                        </View>
                        <View
                          style={{
                            width: 150,
                            marginLeft: 'auto',
                            marginRight: '10%',
                          }}>
                          <ProductModalInfoText>
                            {prop.value}
                          </ProductModalInfoText>
                        </View>
                      </View>
                    );
                  })
                : undefined}
            </ProductModalInfoContainer>
          </ProductsModalContent>
        </ScrollView>
      </View>
    </ReactNativeModal>
  );
};

export default Modal;

const ProductsModalContent = styled(View)`
  background-color: ${COLORS.milky};
  height: 450px;
`;

const ProductsModalBackground = styled(View)`
  background-color: white;
  max-height: 1300px - 10px;
  width: 100%;

  border-radius: 15px;
  margin-top: 50px;
`;

const ProductsModalImage = styled(Image)`
  width: 300px;
  height: 250px;
  object-fit: contain;
  align-self: center;

  border-radius: 15px;
  margin-bottom: 30px;
`;

const ProductsModalHeader = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 20px;

  margin-left: 20px;
  margin-top: 20px;
`;

const ProductsModalTitle = styled(Text)`
  color: ${COLORS.black};
  width: 235px;

  font-size: 16px;
`;

const ProductsModalCost = styled(Text)`
  color: ${COLORS.forth};

  font-size: 18px;
  font-weight: 600;
`;

const ProductsModalSubtitleCost = styled(Text)`
  color: ${COLORS.gray};

  font-size: 15px;
  font-weight: 600;
`;

const ProductsModalBtn = styled(View)`
  background-color: ${COLORS.tertiary};
  width: 350px;
  height: 45px;

  align-items: center;
  justify-content: center;
  align-self: center;

  border-radius: 10px;
  margin-top: 20px;
`;

const ProductsModalBtnText = styled(Text)`
  color: ${COLORS.white};

  font-size: 18px;
  font-weight: 600;
`;

const ProductModalInfoContainer = styled(View)`
  gap: 10px;
  margin-top: 20px;
`;

const ProductModalInfoCharacteristic = styled(Text)`
  color: ${COLORS.gray};
  width: 150px;

  font-size: 13px;
  text-align: right;
`;

const ProductModalInfoText = styled(Text)`
  color: ${COLORS.black};
  font-size: 13px;
`;

const ProductsModalCountView = styled(View)`
  flex-direction: row;
  gap: 15px;

  justify-content: center;
  align-items: center;

  margin-top: 15px;
`;

const ProductsModalMinusBtn = styled(View)`
  background-color: ${COLORS.white};
  width: 50px;
  height: 50px;

  align-items: center;
  justify-content: center;

  border-radius: 10px;
`;

const ProductsModalPlusBtn = styled(View)`
  background-color: ${COLORS.white};
  width: 50px;
  height: 50px;

  align-items: center;
  justify-content: center;

  border-radius: 10px;
`;

const ProductsModalExpression = styled(Text)`
  font-weight: 600;
`;
