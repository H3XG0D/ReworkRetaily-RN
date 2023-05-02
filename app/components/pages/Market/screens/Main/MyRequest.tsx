import {FlatList, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MyRequestTypeRootParamList} from '../../../../../Navigation/routes';
import RetailyLayout from '../../../../layout/RetailyLayout';

import {COLORS} from '../../../../../constants';

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

  const info = [
    {
      id: 'Заявка №201790',
      date: 'ср, 2 мая 2023 г., 13:52',
      supplier: 'Якутский хлебокомбинат',
      price: '15048 ₽',
      status: 'Отменён заказчиком',
    },
    {
      id: 'Заявка №201763',
      date: 'пт, 26 апр. 2023 г., 16:23',
      supplier: 'Якутский Гормолзавод',
      price: '20753 ₽',
      status: 'Новый',
    },
    {
      id: 'Заявка №201763',
      date: 'пт, 26 апр. 2023 г., 16:23',
      supplier: 'Якутский Гормолзавод',
      price: '20753 ₽',
      status: 'Новый',
    },
    {
      id: 'Заявка №201763',
      date: 'пт, 26 апр. 2023 г., 16:23',
      supplier: 'Якутский Гормолзавод',
      price: '20753 ₽',
      status: 'Новый',
    },
    {
      id: 'Заявка №201763',
      date: 'пт, 26 апр. 2023 г., 16:23',
      supplier: 'Якутский Гормолзавод',
      price: '20753 ₽',
      status: 'Отменён заказчиком',
    },
    {
      id: 'Заявка №201763',
      date: 'пт, 26 апр. 2023 г., 16:23',
      supplier: 'Якутский Гормолзавод',
      price: '20753 ₽',
      status: 'Отменён заказчиком',
    },
    {
      id: 'Заявка №201763',
      date: 'пт, 26 апр. 2023 г., 16:23',
      supplier: 'Якутский Гормолзавод',
      price: '20753 ₽',
      status: 'Отменён заказчиком',
    },
  ];

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
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={{padding: 20, fontSize: 15}}>Ошибка загрузки</Text>
      </View>
    );
  };

  return (
    <RetailyLayout>
      <FlatList
        data={info}
        renderItem={({item}: any) => (
          <TouchableOpacity
            onPress={() => navigation.navigate('MyRequestOrder', {item})}>
            <View>
              <View style={{flexDirection: 'row', paddingTop: 15}}>
                <View style={{paddingLeft: 20, gap: 5}}>
                  <Text
                    style={{
                      fontSize: 13,
                      fontWeight: '600',
                    }}>
                    {item.id}
                  </Text>
                  <Text>{item.date}</Text>
                  <Text>{item.supplier}</Text>
                </View>
                <Text
                  style={{
                    marginLeft: 'auto',
                    marginRight: 20,
                    fontSize: 12,
                    color: COLORS.primary,
                  }}>
                  {item.status}
                </Text>
              </View>

              <View
                style={{marginLeft: 'auto', marginRight: 20, marginBottom: 15}}>
                <Text>{item.price}</Text>
              </View>
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
