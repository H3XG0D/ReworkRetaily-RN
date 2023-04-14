import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RetaiyRootTypeParamList = {
  // * Main StackNavigation Retaily Screens:
  LoginPage: undefined;
  Forget: undefined;
  ForgetCode: undefined;
  ResetPassword: undefined;
  Code: undefined;
  Details: undefined;
  Registration: undefined;
  Market: undefined;

  // * Loader screen:
  Loader: undefined;
};

export type BottomRootTypeParamList = {
  // * Main BottomNavigator Retaily Screens
  MarketStack: MarketRootParamList;

  Suppliers: undefined;
  ParentMeat: undefined;
  Categories: undefined;
  ProductsContainer: undefined;
};

export type MarketRootParamList = {
  // * Screens that are inside the market
  Market: undefined;
  Request: undefined;
  MyRequest: undefined;
  UserProfile: undefined;
};
