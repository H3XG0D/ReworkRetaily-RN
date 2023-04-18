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
import {IOrderProduct, IShop, ISupplier} from '../../../../../../redux/types';

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

  const cartProduct = getAppSelectore(getCartSelector);

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

  const AddProduct = (product: any) => {
    setBuy(false);

    let obj = {...info};
    let arrayProduct = [...cartProduct];

    // arrayProduct.find((i: IOrderProduct) => (i.quantum = i.step));
    // obj.quantum = obj.step;
    // setInfo(obj);
  };

  const incrementCounter = (product: any) => {
    let obj = {...info};
    let arrayIncrement = [...cartProduct];

    // arrayIncrement.find((i: IOrderProduct) => (i.quantum += i.step));
    // obj.quantum = obj.quantum + obj.step;

    // let newArray = [...products];
    // let newRow = newArray.find((a: any) => a.code === obj.code);
    // newRow.quantum = obj.quantum;

    // setProducts(newArray);
    // setInfo(obj);
  };

  const decrementCounter = (product: any) => {
    let obj = {...info};
    let arrayIncrement = [...cartProduct];

    // arrayIncrement.find((i: IOrderProduct) => (i.quantum -= i.step));
    // obj.quantum = obj.quantum - obj.step;

    // let newArray = [...products];
    // let newRow = newArray.find((a: any) => a.code === obj.code);
    // newRow.quantum = obj.quantum;

    // setProducts(newArray);
    // setInfo(obj);
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
