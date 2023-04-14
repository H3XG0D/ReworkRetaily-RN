import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styled from 'styled-components';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RetaiyRootTypeParamList} from '../../../../../Navigation/routes';

import RetailyLayout from '../../../../layout/RetailyLayout';
import {COLORS} from '../../../../../constants';

const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
const [loadSkeleton, setLoadSkeleton] = React.useState<boolean>(true);

import Banner from './MarketUI/Banner';
import Tags from './MarketUI/Tags';

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

  return (
    <RetailyLayout style={{backgroundColor: COLORS.milky}}>
      <MarketPaginationView>
        <Banner />
        <Tags />
      </MarketPaginationView>
    </RetailyLayout>
  );
};

export default Market;

const MarketPaginationView = styled(View)`
  background-color: ${COLORS.white};
  height: 205px;
`;

const MarketPaginationBox = styled(View)`
  width: 150px;
  height: 100px;
  border-radius: 10px;

  margin-left: 5px;
  margin-right: 5px;
  margin-top: 20px;
`;

const MarketPaginationFilterAll = styled(View)`
  background-color: ${COLORS.brightgray};

  align-items: center;
  justify-content: center;

  border-radius: 10px;

  padding: 10px 15px;
  margin-left: 15px;
`;

const MarketPagnationFilters = styled(View)`
  background-color: ${COLORS.brightgray};

  align-items: center;
  justify-content: center;

  border-radius: 10px;

  margin-left: 5px;
  margin-right: 5px;
  padding: 10px 15px;
`;

const MarketPaginationSpace = styled(View)`
  flex-direction: row;

  margin-left: 5px;
  margin-right: 15px;
`;

const MarketPaginationFilterTextTabs = styled(Text)`
  color: ${COLORS.black};
  font-size: 16px;
`;

// * Content

const MarketContentContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 25px;

  margin-bottom: 90px;
  padding: 30px 20px 20px 25px;
`;

const MarketContentBox = styled(View)`
  width: 160px;
  height: 190px;

  align-items: center;
  justify-content: center;

  border-radius: 10px;
`;

const MarketContentBoxText = styled(Text)`
  color: ${COLORS.black};

  font-size: 18px;
  text-align: center;
`;

const MarketBannerView = styled(View)`
  gap: 10px;

  padding: 20px 20px;
  margin-left: 10px;
`;

const MarketBannerTitle = styled(Text)`
  color: ${COLORS.black};

  font-size: 22px;
  font-weight: 600;
`;

const MarketBannerSubtitle = styled(Text)`
  color: ${COLORS.black};
  font-size: 13px;
`;

const MarketBannerButton = styled(View)`
  width: 300px;
  height: 45px;

  background-color: ${COLORS.tertiary};
  border-radius: 10px;

  align-items: center;
  justify-content: center;

  margin-bottom: 60px;
  align-self: center;
`;

const MarketBannerButtonText = styled(Text)`
  color: ${COLORS.white};

  font-size: 16px;
  font-weight: 600;
`;

const MarketContentBoxContainer = styled(View)`
  width: 160px;
  height: 200px;
  background-color: white;
  border-radius: 10px;
`;
