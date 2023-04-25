import React, {ReactElement} from 'react';
import {View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MarketRootParamList} from '../../../../../Navigation/routes';

import {getProductPrice, getProductsInfo} from '../../../../../api/api';

import Modal from './productsUI/Modal';
import Items from './productsUI/Items';
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

  const [category, setCategory] = React.useState<any>(undefined);

  const getProductCategory = async () => {
    const productCategory = await getProductPrice(
      'getProductPrice',
      String(info?.code),
      String(props.shop?.code),
      String(props.supplier?.code),
      productData,
    );
    setCategory(productCategory);
  };

  const getProductSecondCategory = async () => {
    const productCategory = await getProductPrice(
      'getProductPrice',
      String(info?.code),
      String(props.shop?.code),
      String(props.supplier?.code),
      secondProductData,
    );
    setCategory(productCategory);
  };

  const map_product_properties = info?.properties2.map(
    ({name, ...data}: any) => data,
  );

  const values = map_product_properties?.find((i: any) => i?.values)?.values;
  const code_product = map_product_properties?.find((i: any) => i?.code)?.code;

  const code_values = values?.find((i: any) => i?.code)?.code;
  const allCode_values = values?.map((i: any) => i?.code);

  const productData = [
    {
      property: code_product,
      code: allCode_values[0],
    },
  ];

  const secondProductData = [
    {
      property: code_product,
      code: allCode_values[1],
    },
  ];

  const showModal = () => {
    setModalVisible(!isModalVisible);
  };

  React.useEffect(() => {
    getProducts();
  }, []);

  return (
    <View>
      <Items
        info={info}
        products={products}
        buy={buy}
        loadSkeleton={loadSkeleton}
        supplier={props.supplier}
        shop={props.shop}
        setInfo={setInfo}
        showModal={showModal}
        getProductCategory={getProductCategory}
        category={category}
        setCategory={setCategory}
      />

      <Modal
        isModalVisible={isModalVisible}
        getProductCategory={getProductCategory}
        getProductSecondCategory={getProductSecondCategory}
        supplier={props.supplier}
        shop={props.shop}
        info={info}
        setInfo={setInfo}
        showModal={showModal}
        category={category}
        setCategory={setCategory}
      />
    </View>
  );
};

export default Products;
