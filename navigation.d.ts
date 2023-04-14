import {RetaiyRootTypeParamList} from './app/Navigation/routes';

declare global {
  namespace RetailyNavigation {
    interface RetaiyRootParamList extends RetaiyRootTypeParamList {}
  }
}
