import {View, Text, ScrollView, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import styled from 'styled-components';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RetaiyRootTypeParamList} from '../../../../../Navigation/routes';

import RetailyLayout from '../../../../layout/RetailyLayout';
import {getClient} from '../../../../../api/api';
import {COLORS, siteUrl} from '../../../../../constants';

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

  const getBanners = async () => {
    setLoadSkeleton(true);
    const result = await getClient({cmd: 'getbanners'});
    setImage(result);
  };

  const getSuppliers = async () => {
    const result = await getClient({cmd: 'getsuppliers'});
    setSuppliers(result);
    setLoadSkeleton(false);
  };

  React.useEffect(() => {
    getBanners();
    getSuppliers();
  }, []);

  return (
    <RetailyLayout style={{backgroundColor: COLORS.milky}}>
      <MarketPaginationView>
        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
          <MarketPaginationSpace>
            <View style={{flexDirection: 'row'}}>
              {image?.standart && image.standart.length > 0
                ? image.standart.map((banner: any) => {
                    return (
                      <TouchableOpacity onPressIn={() => setContent(banner)}>
                        <MarketPaginationBox>
                          <Image
                            source={{
                              uri:
                                banner &&
                                banner.images &&
                                banner.images.length > 0
                                  ? siteUrl + '/api/repo/' + banner.images[0]
                                  : undefined,
                            }}
                            style={{
                              width: '100%',
                              height: '100%',
                            }}></Image>
                        </MarketPaginationBox>
                      </TouchableOpacity>
                    );
                  })
                : undefined}
            </View>
          </MarketPaginationSpace>
        </ScrollView>
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
