import React from 'react';
import styled from 'styled-components';

import {View, Text, ScrollView, TouchableOpacity} from 'react-native';

import {COLORS} from '../../../../../../constants';
import ReactNativeModal from 'react-native-modal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';
import Field from '../../../../../UI/Field';

interface IModal {
  supplier: any;
  shop: any;
  cart: any;

  showOrderModal: () => void;
  isOrderModalVisible: any;
}

const RequestOrderModal = (props: IModal) => {
  return (
    <ReactNativeModal
      isVisible={props.isOrderModalVisible}
      backdropOpacity={0.4}
      onSwipeComplete={() => props.showOrderModal()}
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
          <TouchableOpacity onPress={() => props.showOrderModal()}>
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
          <OrderView>
            <OrderTitle>Оформление заявки</OrderTitle>

            <OrderInfoView>
              <OrderInfoText>
                Поставщик: <OrderInfoData>{props.supplier}</OrderInfoData>
              </OrderInfoText>

              <OrderInfoText>
                Общая сумма: <OrderInfoData>{props.cart} ₽</OrderInfoData>
              </OrderInfoText>

              <OrderInfoText>
                Магазин: <OrderInfoData>{props.shop}</OrderInfoData>
              </OrderInfoText>

              <OrderFeedbackView>
                <Text>Номер телефона</Text>
                <OrderInputView>
                  {/* Phone number field */}
                  <Field
                    style={{
                      width: 360,
                      backgroundColor: COLORS.white,
                      borderColor: COLORS.brightgray,
                      borderWidth: 1,
                      marginTop: 5,
                      fontSize: 15,
                      paddingLeft: 10,
                    }}
                    isNumeric="number-pad"
                  />

                  {/* Comment field */}
                  <Field
                    placeholder="Комментарий к заказу"
                    style={{
                      width: 360,
                      height: 80,
                      backgroundColor: COLORS.white,
                      borderColor: COLORS.brightgray,
                      borderWidth: 1,
                      marginTop: 5,
                      fontSize: 15,
                      paddingLeft: 10,
                    }}
                  />

                  <TouchableOpacity>
                    <PaymentButtonView>
                      <PaymentButtonText>Подтвердить</PaymentButtonText>
                    </PaymentButtonView>
                  </TouchableOpacity>
                </OrderInputView>
              </OrderFeedbackView>
            </OrderInfoView>
          </OrderView>
        </ScrollView>
      </View>
    </ReactNativeModal>
  );
};

export default RequestOrderModal;

const OrderView = styled(View)`
  height: 600px;
`;

const OrderTitle = styled(Text)`
  text-align: center;
  font-weight: 600;
  font-size: 20px;
`;

const OrderInfoView = styled(View)`
  margin-top: 15px;
  margin-left: 15px;

  gap: 5px;
`;

const OrderInfoText = styled(Text)`
  font-size: 13px;
`;

const OrderInfoData = styled(Text)`
  color: ${COLORS.primary};
`;

const OrderFeedbackView = styled(View)`
  margin-top: 15px;
`;

const OrderInputView = styled(View)`
  gap: 5px;
`;

const PaymentButtonView = styled(View)`
  width: 355px;
  height: 40px;
  background-color: ${COLORS.primary};
  border-radius: 5px;

  justify-content: center;
  align-items: center;

  margin-top: 10px;
  margin-bottom: 20px;
`;
const PaymentButtonText = styled(Text)`
  color: ${COLORS.white};

  font-size: 15px;
  font-weight: 600;
`;
