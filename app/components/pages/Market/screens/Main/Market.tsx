import {View, Text} from 'react-native';
import React, {ReactElement} from 'react';
import styled from 'styled-components';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RetaiyRootTypeParamList} from '../../../../../Navigation/routes';

import RetailyLayout from '../../../../layout/RetailyLayout';
import {COLORS} from '../../../../../constants';

import Banner from './MarketUI/Banner';
import Tags from './MarketUI/Tags';
import {getClient} from '../../../../../api/api';
import Supplier from './MarketUI/Supplier';
import Modal from './MarketUI/Modal';

interface Props {}

const Market = (props: Props): ReactElement => {
  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
  const [loadSkeleton, setLoadSkeleton] = React.useState<boolean>(true);

  const [active, setActive] = React.useState<string | undefined>(undefined);
  const [suppliers, setSuppliers] = React.useState<any>([]);
  const [content, setContent] = React.useState<any>([]);

  const showModal = () => {
    setModalVisible(!isModalVisible);
  };

  const navigation =
    useNavigation<NativeStackNavigationProp<RetaiyRootTypeParamList>>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: content.name,
      headerTitleStyle: {fontSize: 20},
      animation: 'fade',
    });
  }, [navigation]);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Главная',
      headerTitleAlign: 'left',
      headerLeft: () => <Text></Text>,
      headerTitleStyle: {fontSize: 27, fontWeight: '700'},
      animation: 'none',
    });
  }, [navigation]);

  const getSuppliers = async () => {
    const result = await getClient({cmd: 'getsuppliers'});
    setSuppliers(result);
  };

  React.useEffect(() => {
    getSuppliers();
  }, []);

  return (
    <RetailyLayout style={{backgroundColor: COLORS.milky}}>
      <MarketPaginationView>
        <Banner
          showModal={showModal}
          setContent={setContent}
          loadSkeleton={loadSkeleton}
          setLoadSkeleton={setLoadSkeleton}
        />
        <Tags
          suppliers={suppliers}
          active={active}
          setActive={setActive}
          loadSkeleton={loadSkeleton}
        />
      </MarketPaginationView>
      <Supplier
        suppliers={suppliers}
        active={active}
        setContent={setContent}
        loadSkeleton={loadSkeleton}
      />

      <Modal
        content={content}
        isVisible={isModalVisible}
        showModal={showModal}
      />
    </RetailyLayout>
  );
};

export default Market;

const MarketPaginationView = styled(View)`
  background-color: ${COLORS.white};
  height: 205px;
`;
