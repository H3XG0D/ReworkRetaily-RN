import React from 'react';
import styled from 'styled-components';

import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';

import ReactNativeModal from 'react-native-modal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';

import {COLORS, siteUrl} from '../../../../../../constants';
import Field from '../../../../../UI/Field';
import {
  getAppSelectore,
  useAppDispatch,
} from '../../../../../../../redux/store/store.hooks';
import {IOrderProduct} from '../../../../../../../redux/types';
import {
  addProductToCart,
  getCartSelector,
} from '../../../../../../../redux/Cart/Cart.slice';

interface Props {
  isModalVisible: any;
  info: any;
  setInfo: any;

  showModal: () => void;
  AddProduct: (product: any) => void;
  incrementCounter: (product: any) => void;
  decrementCounter: (product: any) => void;
}

const Modal = (props: Props) => {
  const dispatch = useAppDispatch();

  const cartProduct = getAppSelectore(getCartSelector);

  const addToCart = (product: IOrderProduct) => {
    dispatch(addProductToCart(product));
  };

  return (
    <ReactNativeModal
      isVisible={props.isModalVisible}
      backdropOpacity={0.4}
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
                  (f: IOrderProduct) => f.code === props.info?.code,
                ) ? (
                  <>
                    {props.info?.quantum <= 0 ? (
                      <ProductsModalCost style={{color: COLORS.black}}>
                        {props.info?.price} ₽
                      </ProductsModalCost>
                    ) : (
                      <ProductsModalCost>
                        {(props.info?.price * props.info?.quantum).toFixed(2)} ₽
                      </ProductsModalCost>
                    )}
                  </>
                ) : (
                  <ProductsModalCost style={{color: COLORS.black}}>
                    {props.info?.price} ₽
                  </ProductsModalCost>
                )}
                {cartProduct?.some(
                  (f: IOrderProduct) => f.code === props.info?.code,
                ) ? (
                  <>
                    {props.info?.quantum <= 0 ? null : (
                      <ProductsModalSubtitleCost>
                        {props.info?.price} ₽
                      </ProductsModalSubtitleCost>
                    )}
                  </>
                ) : null}
              </View>
            </ProductsModalHeader>

            {cartProduct?.some(
              (f: IOrderProduct) => f.code === props.info?.code,
            ) ? (
              <>
                {props.info?.quantum <= 0 ? (
                  <TouchableOpacity
                    onPress={() => {
                      props.AddProduct(props.info);
                      addToCart(props.info);
                    }}>
                    <ProductsModalBtn>
                      <ProductsModalBtnText>
                        {props.info?.price} ₽
                      </ProductsModalBtnText>
                    </ProductsModalBtn>
                  </TouchableOpacity>
                ) : (
                  <ProductsModalCountView>
                    <TouchableOpacity
                      onPress={() => props.decrementCounter(props.info)}>
                      <ProductsModalMinusBtn>
                        <ProductsModalExpression>-</ProductsModalExpression>
                      </ProductsModalMinusBtn>
                    </TouchableOpacity>
                    <Field
                      style={{
                        width: 80,
                        height: 50,
                        backgroundColor: COLORS.white,
                        color: COLORS.black,
                        fontSize: 20,
                        fontWeight: '600',
                        textAlign: 'center',
                      }}>
                      <Text>{props.info?.quantum}</Text>
                    </Field>
                    <TouchableOpacity
                      onPress={() => props.incrementCounter(props.info)}>
                      <ProductsModalPlusBtn>
                        <ProductsModalExpression>+</ProductsModalExpression>
                      </ProductsModalPlusBtn>
                    </TouchableOpacity>
                  </ProductsModalCountView>
                )}
              </>
            ) : (
              <TouchableOpacity
                onPress={() => {
                  props.setInfo(props.info);
                  addToCart(props.info);
                }}>
                <ProductsModalBtn>
                  <ProductsModalBtnText>
                    {props.info?.price} ₽
                  </ProductsModalBtnText>
                </ProductsModalBtn>
              </TouchableOpacity>
            )}

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
