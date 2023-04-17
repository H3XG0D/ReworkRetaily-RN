import React, {ReactElement} from 'react';
import {View} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {MarketRootParamList} from '../../../../../Navigation/routes';

import {getProductsInfo} from '../../../../../api/api';

import Modal from './productsUI/Modal';
import Items from './productsUI/Items';

interface Props {
  supplier: any;
  selectShopCode: any;
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

  const [active, setActive] = React.useState<boolean>(false);
  const [info, setInfo] = React.useState<any>(undefined);
  const [buy, setBuy] = React.useState<boolean>(false);
  const [miniActive, setMiniActive] = React.useState<boolean>(false);
  const [choosed, setChoosed] = React.useState<string | undefined>(undefined);

  const [isModalVisible, setModalVisible] = React.useState<boolean>(false);
  const [loadSkeleton, setLoadSkeleton] = React.useState<boolean>(true);

  const getProducts = async () => {
    const products = await getProductsInfo(
      'getProducts',
      props.category.code,
      props.selectShopCode,
      props.supplier.code,
    );
    setProducts(products);
    setLoadSkeleton(false);
  };

  const showModal = () => {
    setModalVisible(!isModalVisible);
  };

  const AddProduct = (product: any) => {
    setActive(false);
    setBuy(false);

    let obj = {...info};
    obj.quantum = obj.step;
    setInfo(obj);
  };

  const incrementCounter = (product: any) => {
    let obj = {...info};
    obj.quantum = obj.quantum + obj.step;

    let newArray = [...products];
    let newRow = newArray.find((a: any) => a.code === obj.code);
    newRow.quantum = obj.quantum;

    setProducts(newArray);
    setInfo(obj);
  };

  const decrementCounter = (product: any) => {
    let obj = {...info};
    obj.quantum = obj.quantum - obj.step;

    let newArray = [...products];
    let newRow = newArray.find((a: any) => a.code === obj.code);
    newRow.quantum = obj.quantum;

    setProducts(newArray);
    setInfo(obj);
  };

  const makeActive = () => {
    setMiniActive(true);
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
        setInfo={setInfo}
        makeActive={makeActive}
        miniActive={miniActive}
        choosed={choosed}
        setChoosed={setChoosed}
        showModal={showModal}
        incrementCounter={incrementCounter}
        decrementCounter={decrementCounter}
      />

      <Modal
        isModalVisible={isModalVisible}
        info={info}
        active={active}
        showModal={showModal}
        AddProduct={AddProduct}
        incrementCounter={incrementCounter}
        decrementCounter={decrementCounter}
      />
    </View>
  );
};

export default Products;
