import React from 'react';
import {View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';

import ReactNativeModal from 'react-native-modal';

import {COLORS} from '../../../../../../constants';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';

interface Props {
  isModalVisible: any;
  info: any;
  setInfo: any;

  selected: any;
  setSelected: any;

  supplier: any;
  shop: any;

  category: any;
  setCategory: any;
  data: any;

  load: any;
  setLoad: any;

  showModal: () => void;
  getProductCategory: () => void;
  addToCart: (item: any) => void;
}

const Package = (props: Props) => {
  const myItemSeparator = () => {
    return (
      <View
        style={{
          height: 1,
          backgroundColor: 'grey',
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
    <View>
      <ReactNativeModal
        isVisible={props.isModalVisible}
        onBackdropPress={() => props.showModal()}
        style={{
          margin: 0,
          padding: 0,
          justifyContent: 'flex-end',
        }}>
        <View
          style={{
            width: '100%',
            height: 230,
            backgroundColor: COLORS.white,
            borderTopLeftRadius: 8,
            borderTopRightRadius: 8,
          }}>
          <TouchableOpacity onPress={() => props.showModal()}>
            <FontAwesomeIcon
              icon={faClose}
              size={28}
              style={{
                marginLeft: 'auto',
                marginRight: 20,
                marginTop: 20,
              }}
            />
          </TouchableOpacity>
          <ScrollView>
            <View>
              <FlatList
                data={props.data}
                renderItem={({item}) => (
                  <Text
                    style={{padding: 20, fontSize: 15, marginTop: 5}}
                    onPress={() => {
                      // props.setInfo(props.category);
                      // props.addToCart(item);
                      props.setSelected(item);
                      props.getProductCategory();
                    }}>
                    {item.name}
                  </Text>
                )}
                ListHeaderComponent={() => (
                  <Text
                    style={{
                      fontSize: 18,
                      fontWeight: '600',
                      marginLeft: '4%',
                    }}>
                    Выберите один из вариантов
                  </Text>
                )}
                keyExtractor={item => item.code}
                ItemSeparatorComponent={myItemSeparator}
                ListEmptyComponent={myListEmpty}
              />
            </View>
          </ScrollView>
        </View>
      </ReactNativeModal>
    </View>
  );
};

export default Package;
