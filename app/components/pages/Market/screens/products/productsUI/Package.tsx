import {View, Text, ScrollView, TouchableOpacity, FlatList} from 'react-native';
import React from 'react';

import ReactNativeModal from 'react-native-modal';

import {COLORS} from '../../../../../../constants';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faClose} from '@fortawesome/free-solid-svg-icons';

interface Props {
  isModalVisible: any;
  info: any;

  showModal: () => void;
  getProductCategory: () => void;
}

const persons = [
  {
    id: '1',
    name: 'Sivtsev Ivan',
  },
  {
    id: '2',
    name: 'Danya',
  },
  {
    id: '3',
    name: 'Lox',
  },
];

const Package = (props: Props) => {
  const [selectedId, setSelectedId] = React.useState<string>();

  const myItemSeparator = () => {
    return (
      <View
        style={{height: 1, backgroundColor: 'grey', marginHorizontal: 10}}
      />
    );
  };

  const myListEmpty = () => {
    return (
      <View style={{alignItems: 'center'}}>
        <Text style={{padding: 20, fontSize: 15}}>No data found</Text>
      </View>
    );
  };

  const map_product_properties = props.info?.properties2.map(
    ({name, ...data}: any) => data,
  );

  const data = map_product_properties?.find((i: any) => i?.values)?.values;
  const getData = data?.map((i: any) => i.name);

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
                data={getData}
                renderItem={({item}) => (
                  <Text style={{padding: 20, fontSize: 15, marginTop: 5}}>
                    {item}
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
                keyExtractor={item => item.name}
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
