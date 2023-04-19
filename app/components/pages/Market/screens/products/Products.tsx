import React, {ReactElement} from 'react';
import {View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MarketRootParamList} from '../../../../../Navigation/routes';

import {getProductsInfo} from '../../../../../api/api';

import Modal from './productsUI/Modal';
import Items from './productsUI/Items';
import {getAppSelectore} from '../../../../../../redux/store/store.hooks';
import {getCartSelector} from '../../../../../../redux/Cart/Cart.slice';
import {IShop, ISupplier} from '../../../../../../redux/types';

interface Props {
  supplier: ISupplier;
  shop: IShop;
  category: any;
}

const Products = (props: Props): ReactElement => {
  const navigation =
    useNavigation<NativeStackNavigationProp<MarketRootParamList>>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: props.supplier.name,
      headerTitleStyle: {fontSize: 20},
      animation: 'fade',
    });
  }, [navigation]);

  const [products, setProducts] = React.useState<any>(undefined);

  const [info, setInfo] = React.useState<any>(undefined);
  const [buy, setBuy] = React.useState<boolean>(false);
  const [choosed, setChoosed] = React.useState<string | undefined>(undefined);

  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
  const [loadSkeleton, setLoadSkeleton] = React.useState<boolean>(true);

  const getProducts = async () => {
    const products = await getProductsInfo(
      'getProducts',
      props.category.code,
      props.shop.code,
      props.supplier.code,
    );
    setProducts(products);
    setLoadSkeleton(false);
  };

  const showModal = () => {
    setModalVisible(!isModalVisible);
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <View>
      <Items
        products={products}
        buy={buy}
        loadSkeleton={loadSkeleton}
        supplier={props.supplier}
        shop={props.shop}
        setInfo={setInfo}
        showModal={showModal}
      />

      <Modal
        isModalVisible={isModalVisible}
        info={info}
        supplier={props.supplier}
        shop={props.shop}
        setInfo={setInfo}
        showModal={showModal}
      />
    </View>
  );
};

export default Products;
