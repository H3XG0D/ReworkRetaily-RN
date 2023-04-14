import React from 'react';
import styled from 'styled-components';
import {View, Text, ScrollView, Image, TouchableOpacity} from 'react-native';

import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MarketRootParamList} from '../../../../../Navigation/routes';
import {getCategoriesInfo} from '../../../../../api/api';
import RetailyLayout from '../../../../layout/RetailyLayout';
import {COLORS, siteUrl} from '../../../../../constants';

const Categories = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MarketRootParamList>>();

  const route = useRoute();
  const {supplier}: any = route.params;
  const {selectShopCode}: any = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: supplier.name,
      headerTitleStyle: {fontSize: 20},
      animation: 'fade',
    });
  }, [navigation]);

  const [categories, setCategories] = React.useState<any>(undefined);
  const [loadSkeleton, setLoadSkeleton] = React.useState<boolean>(true);

  const getCategories = async () => {
    setLoadSkeleton(true);
    const categories = await getCategoriesInfo(
      'getcategories',
      selectShopCode,
      supplier.code,
    );
    setCategories(categories);
    setLoadSkeleton(false);
  };

  React.useEffect(() => {
    getCategories();
  }, []);

  return (
    <RetailyLayout>
      <ScrollView>
        <CategoriesContentContainer>
          {categories && categories.length > 0
            ? categories.map((category: any) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('ProductsContainer', {
                        supplier,
                        selectShopCode,
                        category,
                      })
                    }>
                    <CategoriesContentBox>
                      <CategoriesContentImages
                        source={{
                          uri:
                            category &&
                            category.images &&
                            category.images.length > 0
                              ? siteUrl + '/api/repo/' + category.images[0]
                              : undefined,
                        }}
                      />
                      <CategoriesContentBoxTextContainer>
                        <CategoriesContentBoxText>
                          {category.name}
                        </CategoriesContentBoxText>
                      </CategoriesContentBoxTextContainer>
                    </CategoriesContentBox>
                  </TouchableOpacity>
                );
              })
            : undefined}
        </CategoriesContentContainer>
      </ScrollView>
    </RetailyLayout>
  );
};

export default Categories;

const CategoriesContentContainer = styled(View)`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 15px;

  padding: 30px 20px 20px 25px;
`;

const CategoriesContentBox = styled(View)`
  width: 165px;
  height: 120px;

  border-radius: 10px;
`;

const CategoriesContentImages = styled(Image)`
  position: absolute;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  border-radius: 10;
`;

const CategoriesContentBoxText = styled(Text)`
  color: ${COLORS.black};

  font-size: 15px;
  font-weight: 600;

  margin-left: 15px;
  margin-top: 5px;
`;

const CategoriesContentBoxTextContainer = styled(View)`
  background-color: ${COLORS.white};
  height: 40%;

  margin-top: auto;

  border-radius: 10px;
  opacity: 0.8;
`;
