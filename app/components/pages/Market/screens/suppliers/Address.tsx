import React from 'react';
import styled from 'styled-components';

import {View, Text, ScrollView, Pressable} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

import {getShopsContract, getShopsInfo} from '../../../../../api/api';
import {MarketRootParamList} from '../../../../../Navigation/routes';
import {COLORS} from '../../../../../constants';

import RetailyLayout from '../../../../layout/RetailyLayout';
import Field from '../../../../UI/Field';
import Button from '../../../../UI/Button';
import ButtonLoader from '../../../../UI/ButtonLoader';

const Address = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MarketRootParamList>>();

  const route = useRoute();
  const {supplier}: any = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: supplier.name,
      headerTitleStyle: {fontSize: 20},
      animation: 'fade',
    });
  }, [navigation]);

  const [load, setLoad] = React.useState<boolean>(false);
  const [choosed, setChoosed] = React.useState<boolean>(false);

  const [shops, setShops] = React.useState<any>([]);
  const [selectShopCode, setSelectShopCode] = React.useState<
    string | undefined
  >(undefined);

  const [search, setSearch] = React.useState<any>('');

  const getContractInfo = async () => {
    setLoad(true);
    const info = await getShopsInfo('getShops', supplier.code);
    setShops(info);
    setLoad(false);
  };

  const filterList = (list: any) => {
    return list?.filter(
      (listItem: any) =>
        listItem.name &&
        listItem.name
          .toString()
          .toLowerCase()
          .includes(search.toString().toLowerCase()),
    );
  };

  const ChooseHandler = () => {
    setChoosed(true);
  };

  React.useEffect(() => {
    getContractInfo();
  }, []);

  return (
    <RetailyLayout>
      <AddressContent>
        <AddressTitle>Выберите магазин</AddressTitle>

        <Field
          onChangeText={(search: string) => setSearch(search)}
          placeholder="Поиск..."
          style={{
            width: 350,
            height: 40,
            fontSize: 20,
            alignSelf: 'center',
            borderColor: COLORS.milky,
            borderWidth: 1,
            borderRadius: 6,
            paddingLeft: 15,
          }}
        />

        <ScrollView style={{height: 400}}>
          <View>
            {filterList(shops).map((item: any, index: any) => {
              return (
                <Pressable
                  onPress={() => {
                    setSelectShopCode(item.code);
                  }}
                  onPressIn={() => ChooseHandler()}>
                  <AddressItemContent>
                    {item.code === selectShopCode ? (
                      <AddressItemLine>
                        <AddressSelectView>
                          <AddressItemText key={index}>
                            {item.name}
                          </AddressItemText>
                          <AddressItemSubtitle>
                            Инн: {item.inn}
                          </AddressItemSubtitle>
                        </AddressSelectView>
                      </AddressItemLine>
                    ) : (
                      <AddressItemLine>
                        <AddressUnSelectView>
                          <AddressItemText key={index}>
                            {item.name}
                          </AddressItemText>
                          <AddressItemSubtitle>
                            Инн: {item.inn}
                          </AddressItemSubtitle>
                        </AddressUnSelectView>
                      </AddressItemLine>
                    )}
                  </AddressItemContent>
                </Pressable>
              );
            })}
          </View>
        </ScrollView>

        <Button
          title={load ? <ButtonLoader /> : 'Выбрать'}
          onPress={() =>
            navigation.navigate('Categories', {supplier, selectShopCode})
          }
          disabled={load || !choosed ? true : false}
          style={{
            backgroundColor: choosed ? COLORS.tertiary : COLORS.gray,
            alignSelf: 'center',
          }}
        />
      </AddressContent>
    </RetailyLayout>
  );
};

export default Address;

const AddressContent = styled(View)`
  gap: 10px;
`;

const AddressTitle = styled(Text)`
  color: ${COLORS.black};
  text-align: center;

  font-size: 22px;
  font-weight: 600;

  margin-top: 15px;
`;

const AddressItemContent = styled(View)`
  margin-top: 3px;
`;

const AddressItemLine = styled(View)`
  border-color: ${COLORS.brightgray};

  border-bottom-width: 1px;
  padding: 10px;
`;

const AddressSelectView = styled(View)`
  width: 350px;

  border-color: ${COLORS.primary};
  border-top-width: 1px;
  border-left-width: 1px;
  border-right-width: 1px;
  border-bottom-width: 1px;

  border-radius: 8px;

  padding: 10px 5px 10px 5px;
`;

const AddressUnSelectView = styled(View)`
  padding: 10px 5px 10px 5px;
`;

const AddressItemText = styled(Text)`
  color: ${COLORS.black};

  font-size: 15px;
  margin-left: 10px;
`;

const AddressItemSubtitle = styled(Text)`
  color: ${COLORS.gray};

  font-size: 16px;
  margin-left: 10px;
`;

const AddressButton = styled(View)`
  width: 350px;
  height: 45px;

  background-color: ${COLORS.tertiary};
  justify-content: center;
  align-items: center;

  border-radius: 10px;

  margin-top: 15px;
  margin-bottom: 50px;
  align-self: center;
`;

const AddressButtonText = styled(Text)`
  color: ${COLORS.white};

  font-size: 16px;
  font-weight: 600;
`;
