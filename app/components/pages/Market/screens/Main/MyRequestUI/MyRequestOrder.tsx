import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MyRequestTypeRootParamList} from '../../../../../../Navigation/routes';
import RetailyLayout from '../../../../../layout/RetailyLayout';
import {COLORS} from '../../../../../../constants';
import Button from '../../../../../UI/Button';
import styled from 'styled-components';

const MyRequestOrder = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MyRequestTypeRootParamList>>();

  const route = useRoute();
  const {item}: any = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: item?.id,
      headerTitleAlign: 'left',
      headerTitleStyle: {fontSize: 18, fontWeight: '700'},
      animation: 'none',
    });
  }, [navigation]);

  return (
    <RetailyLayout style={{paddingTop: 15, paddingLeft: 10, paddingRight: 10}}>
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <View style={{gap: 5}}>
          <Text style={{color: COLORS.gray, fontSize: 14}}>{item?.date}</Text>
          <Text style={{fontSize: 14}}>{item?.supplier}</Text>
        </View>
        <Text style={{color: COLORS.primary}}>{item?.status}</Text>
      </View>
      <Text style={{marginLeft: 'auto'}}>{item?.price}</Text>

      <View style={{marginTop: 10}}>
        <Text>Комментарий:</Text>
        <View
          style={{
            width: '100%',
            height: 80,
            backgroundColor: COLORS.milky,
            borderRadius: 5,
            marginTop: 5,
          }}>
          <View
            style={{paddingLeft: 10, paddingRight: 5, paddingTop: 5, gap: 5}}>
            <Text style={{color: COLORS.gray, fontSize: 13}}>
              Номер телефона:{' '}
              <Text style={{color: COLORS.black}}>81231312331</Text>
            </Text>
            <Text style={{color: COLORS.gray, fontSize: 13}}>
              Заказ на дату:{' '}
              <Text style={{color: COLORS.black}}>28.04.2023</Text>
            </Text>
            <TouchableOpacity>
              <Text style={{color: COLORS.primary}}>Свернуть</Text>
            </TouchableOpacity>
          </View>
        </View>
        <TouchableOpacity>
          <MyRequestCancelBtn>
            <MyRequestCancelBtnText>Отменить</MyRequestCancelBtnText>
          </MyRequestCancelBtn>
        </TouchableOpacity>
      </View>
    </RetailyLayout>
  );
};

export default MyRequestOrder;

const MyRequestCancelBtn = styled(View)`
  background-color: ${COLORS.brightgray};
  width: 350px;
  height: 45px;
  align-items: center;
  justify-content: center;
  align-self: center;
  border-radius: 6px;
  margin-top: 10px;
`;

const MyRequestCancelBtnText = styled(Text)`
  color: ${COLORS.black};
  font-size: 14px;
`;
