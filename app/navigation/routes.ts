import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export type RetaiyRootTypeParamList = {
  // * Main StackNavigation Retaily Screens:
  LoginPage: any;
  Forget: any;
  ForgetCode: any;
  ResetPassword: any;
  Code: any;
  Details: any;
  Registration: any;
  Market: any;

  // * Loader screen:
  Loader: any;
};

export type BottomRootTypeParamList = {
  // * Main BottomNavigator Retaily Screens
  MarketStack: MarketRootParamList;
  Request: any;
  MyRequest: any;
  UserProfile: any;
};

export type MarketRootParamList = {
  // * Screens that are inside the market
  Market: any;
  Suppliers: any;
  ParentMeat: any;
  Categories: any;
  ProductsContainer: any;
};
