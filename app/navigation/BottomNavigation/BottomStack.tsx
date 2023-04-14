import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MarketRootParamList} from '../routes';

import Market from '../../components/pages/Market/screens/Main/Market';
import ProductsContainer from '../../components/pages/Market/screens/products/ProductsContainer';
import Categories from '../../components/pages/Market/screens/categories/Categories';
import ParentMeat from '../../components/pages/Market/screens/Main/parentmeat/ParentMeat';
import Address from '../../components/pages/Market/screens/suppliers/Address';

const RetailyStack = createNativeStackNavigator<MarketRootParamList>();

export const RetailyBottomScreen = () => {
  return (
    <RetailyStack.Navigator>
      <RetailyStack.Screen
        name="Market"
        component={Market}></RetailyStack.Screen>
      <RetailyStack.Screen
        name="ProductsContainer"
        component={ProductsContainer}></RetailyStack.Screen>
      <RetailyStack.Screen
        name="Categories"
        component={Categories}></RetailyStack.Screen>
      <RetailyStack.Screen
        name="ParentMeat"
        component={ParentMeat}></RetailyStack.Screen>
      <RetailyStack.Screen
        name="Address"
        component={Address}></RetailyStack.Screen>
    </RetailyStack.Navigator>
  );
};
