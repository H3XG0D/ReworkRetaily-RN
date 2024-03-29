import React, {ReactElement} from 'react';

import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MarketRootParamList} from '../../../../../Navigation/routes';

import RetailyLayout from '../../../../layout/RetailyLayout';
import Products from './Products';

interface Props {}

const ProductsContainer = (props: Props): ReactElement => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MarketRootParamList>>();

  const route = useRoute();

  const {supplier}: any = route.params;
  const {shop}: any = route.params;
  const {category}: any = route.params;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: category.name,
      headerTitleStyle: {fontSize: 20},
      animation: 'fade',
    });
  }, [navigation]);

  return (
    <RetailyLayout>
      <Products supplier={supplier} shop={shop} category={category} />
    </RetailyLayout>
  );
};

export default ProductsContainer;
