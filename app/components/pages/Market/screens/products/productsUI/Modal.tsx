import React from 'react';
import styled from 'styled-components';

import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  TextInput,
} from 'react-native';

import ReactNativeModal from 'react-native-modal';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';

import {COLORS, siteUrl} from '../../../../../../constants';

import {
  getAppSelectore,
  useAppDispatch,
} from '../../../../../../../redux/store/store.hooks';
import {
  IOrderProduct,
  IShop,
  ISupplier,
} from '../../../../../../../redux/types';
import {
  CartOrder,
  addProductToCart,
  decreaseProductToCart,
  getCartSelector,
  increaseProductToCart,
  updateCartQuantity,
} from '../../../../../../../redux/Cart/Cart.slice';
import {SelectList} from 'react-native-dropdown-select-list';

interface Props {
  isModalVisible: any;
  info: any;
  setInfo: any;
  supplier: any;
  shop: any;
  category: any;
  setCategory: any;

  showModal: () => void;
}

const Modal = (props: Props) => {
  const dispatch = useAppDispatch();
  const cartProduct = getAppSelectore(getCartSelector);

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

  const handleQuantity = (
    e: any,
    product: IOrderProduct,
    supplier: ISupplier,
    shop: IShop,
  ) => {
    dispatch(
      updateCartQuantity({
        value: e.nativeEvent.text,
        supplier: supplier,
        shop: shop,
        product: product,
      }),
    );
  };

  const [quantity, onChangeQuantity] = React.useState<string>('');
  const [selected, setSelected] = React.useState('');

  const value = cartProduct!
    .find(
      (f: CartOrder) =>
        f.supplier.code === props.supplier.code &&
        f.shop.code === props.shop.code,
    )
    ?.products.find(p => p.code === props.info?.code)?.quantity;

  const oldQuantum = React.useRef('');

  const handleChange = (e: any) => {
    oldQuantum.current = quantity;
    onChangeQuantity(String(value));
  };

  const map_product_properties = props.info?.properties2.map(
    ({name, ...data}: any) => data,
  );

  const data = map_product_properties?.find((i: any) => i?.values)?.values;
  const getData = data?.map((i: any) => i.name);

  React.useEffect(() => {
    onChangeQuantity(String(value));
  }, [value]);

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
          maxHeight: 1100 - 20,
          width: '100%',
          backgroundColor: COLORS.white,
          borderRadius: 15,
          marginTop: 50,
        }}>
        <ScrollView>
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
                    f.supplier.code === props.supplier.code &&
                    f.shop.code === props.shop.code &&
                    f.products.some(p => p.code === props.info?.code),
                ) ? (
                  <>
                    {props.info?.quantum <= 0 ? (
                      <ProductsModalCost style={{color: COLORS.black}}>
                        {props.info?.price} ₽
                      </ProductsModalCost>
                    ) : (
                      <ProductsModalCost>
                        {(
                          cartProduct!
                            .find(
                              (f: CartOrder) =>
                                f.supplier.code === props.supplier.code &&
                                f.shop.code === props.shop.code,
                            )!
                            .products.find(p => p.code === props.info?.code)!
                            .price *
                          cartProduct!
                            .find(
                              (f: CartOrder) =>
                                f.supplier.code === props.supplier.code &&
                                f.shop.code === props.shop.code,
                            )!
                            .products.find(p => p.code === props.info?.code)!
                            .quantity
                        ).toFixed(2)}{' '}
                        ₽
                      </ProductsModalCost>
                    )}
                  </>
                ) : (
                  <ProductsModalCost style={{color: COLORS.black}}>
                    {props.info?.price} ₽
                  </ProductsModalCost>
                )}
                {cartProduct?.some(
                  (f: CartOrder) =>
                    f.supplier.code === props.supplier.code &&
                    f.shop.code === props.shop.code &&
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
              </View>
            </ProductsModalHeader>

            {cartProduct?.some(
              (f: CartOrder) =>
                f.supplier.code === props.supplier.code &&
                f.shop.code === props.shop.code &&
                f.products.some(p => p.code === props.info?.code),
            ) ? (
              <>
                {props.info?.quantum <= 0 ? (
                  <>
                    {data?.length > 0 ? (
                      <Text>Values1</Text>
                    ) : (
                      <TouchableOpacity
                        onPress={() => {
                          addToCart(props.info);
                        }}>
                        <ProductsModalBtn>
                          <ProductsModalBtnText>
                            {props.info?.price} ₽
                          </ProductsModalBtnText>
                        </ProductsModalBtn>
                      </TouchableOpacity>
                    )}
                  </>
                ) : (
                  <>
                    {data?.length > 0 ? (
                      <View style={{marginTop: 20, gap: 5}}>
                        <Text style={{marginLeft: 20}}>Упаковка</Text>

                        <SelectList
                          setSelected={setSelected}
                          data={getData}
                          save="value"
                          search={false}
                          boxStyles={{
                            width: 360,
                            alignSelf: 'center',
                            borderColor: COLORS.primary,
                            alignItems: 'center',
                            borderRadius: 5,
                          }}
                          dropdownStyles={{
                            width: 360,
                            backgroundColor: COLORS.white,
                            alignSelf: 'center',
                            marginTop: 0,
                            borderWidth: 0,
                            borderRadius: 5,
                          }}
                          // dropdownItemStyles={{
                          //   borderBottomWidth: 2,
                          //   borderBottomColor: COLORS.brightgray,
                          // }}
                          inputStyles={{color: COLORS.gray, fontSize: 14}}
                          placeholder={selected}
                          onSelect={() => addToCart(props.info)}
                        />
                      </View>
                    ) : (
                      <ProductsModalCountView>
                        <TouchableOpacity
                          onPress={() => decreaseToCart(props.info)}>
                          <ProductsModalMinusBtn>
                            <ProductsModalExpression>-</ProductsModalExpression>
                          </ProductsModalMinusBtn>
                        </TouchableOpacity>

                        {/* !!! Change quantity !!! */}
                        <TextInput
                          onEndEditing={(e: any) => {
                            handleQuantity(
                              e,
                              props.info,
                              props.supplier,
                              props.shop,
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
                          onPress={() => incrementToCart(props.info)}>
                          <ProductsModalPlusBtn>
                            <ProductsModalExpression>+</ProductsModalExpression>
                          </ProductsModalPlusBtn>
                        </TouchableOpacity>
                      </ProductsModalCountView>
                    )}
                  </>
                )}
              </>
            ) : (
              <>
                {data?.length > 0 ? (
                  <View style={{marginTop: 20, gap: 5}}>
                    <Text style={{marginLeft: 20}}>Упаковка</Text>

                    <SelectList
                      setSelected={setSelected}
                      data={getData}
                      save="value"
                      search={false}
                      boxStyles={{
                        width: 360,
                        alignSelf: 'center',
                        borderColor: COLORS.primary,
                        alignItems: 'center',
                        borderRadius: 5,
                      }}
                      dropdownStyles={{
                        width: 360,
                        backgroundColor: COLORS.white,
                        alignSelf: 'center',
                        marginTop: 0,
                        borderWidth: 0,
                        borderRadius: 5,
                      }}
                      // dropdownItemStyles={{
                      //   borderBottomWidth: 2,
                      //   borderBottomColor: COLORS.brightgray,
                      // }}
                      inputStyles={{color: COLORS.gray, fontSize: 14}}
                      placeholder="Выберите значение"
                      onSelect={() => addToCart(props.info)}
                    />
                  </View>
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
              </>
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
