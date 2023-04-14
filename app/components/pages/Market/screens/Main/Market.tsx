import {View, Text} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RetaiyRootTypeParamList} from '../../../../../Navigation/routes';

const Market = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RetaiyRootTypeParamList>>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Главная',
      headerTitleAlign: 'left',
      headerLeft: () => <Text></Text>,
      headerTitleStyle: {fontSize: 27, fontWeight: '700'},
      animation: 'none',
    });
  }, [navigation]);

  const [image, setImage] = React.useState<any>([]);
  const [suppliers, setSuppliers] = React.useState<any>([]);

  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
  const [loadSkeleton, setLoadSkeleton] = React.useState<boolean>(true);

  const [active, setActive] = React.useState<string | undefined>(undefined);
  const [content, setContent] = React.useState<any>(undefined);

  return (
    <View>
      <Text>Market</Text>
    </View>
  );
};

export default Market;
