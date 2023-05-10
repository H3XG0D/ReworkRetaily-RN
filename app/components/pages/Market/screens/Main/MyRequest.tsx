import React from 'react';
import {FlatList, Text, TouchableOpacity, View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MyRequestTypeRootParamList} from '../../../../../Navigation/routes';
import RetailyLayout from '../../../../layout/RetailyLayout';

import {COLORS} from '../../../../../constants';
import styled from 'styled-components';
import {getOrders} from '../../../../../api/api';
import MyRequestSkeleton from '../../Skeletons/MyRequestSkeleton';

const MyRequest = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MyRequestTypeRootParamList>>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Мои заявки',
      headerTitleAlign: 'left',
      headerLeft: () => <Text></Text>,
      headerTitleStyle: {fontSize: 27, fontWeight: '700'},
      animation: 'none',
    });
  }, [navigation]);

  const [load, setLoad] = React.useState<boolean>(false);
  const [data, setData] = React.useState<any>();

  const getOrdersData = async () => {
    setLoad(true);
    const order = await getOrders('getOrders', 20, 0);
    setData(order);
    setLoad(false);
  };

  const myItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: COLORS.brightgray,
          marginHorizontal: 10,
        }}
      />
    );
  };

  const myListEmpty = () => {
    return <MyRequestSkeleton />;
  };

  React.useEffect(() => {
    getOrdersData();
  }, []);

  return (
    <RetailyLayout>
      <FlatList
        data={data}
        renderItem={({item}: any) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('MyRequestOrder', {item})}>
            <View>
              <MyRequestMainView>
                <MyRequestLeftView>
                  <MyRequestIdText>Заявка №{item.num}</MyRequestIdText>
                  <Text>{item.date_create}</Text>
                  <Text>{item.supplier_name}</Text>
                  <Text>{item.shop_name}</Text>
                </MyRequestLeftView>
                <MyRequestStatusText style={{color: item.status_obj.color}}>
                  {item.status_obj.name}
                </MyRequestStatusText>
              </MyRequestMainView>

              <MyRequestPriceView>
                <Text>{item.total_cost.toFixed(2)} ₽</Text>
              </MyRequestPriceView>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item: any) => item.id}
        ItemSeparatorComponent={myItemSeparator}
        ListEmptyComponent={myListEmpty}
      />
    </RetailyLayout>
  );
};

export default MyRequest;

const MyRequestMainView = styled(View)`
  flex-direction: row;
  padding-top: 15px;
`;

const MyRequestLeftView = styled(View)`
  padding-left: 20px;
  gap: 5px;
`;

const MyRequestPriceView = styled(View)`
  margin-left: auto;
  margin-right: 20px;
  margin-bottom: 8px;
`;

const MyRequestIdText = styled(Text)`
  font-size: 13px;
  font-weight: 600;
`;

const MyRequestStatusText = styled(Text)`
  margin-left: auto;
  margin-right: 20px;
  font-size: 12px;
  color: ${COLORS.primary};
`;
