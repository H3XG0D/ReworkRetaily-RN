import {RetaiyRootTypeParamList} from './app/navigation/routes';

declare global {
  namespace RetailyNavigation {
    interface RetaiyRootParamList extends RetaiyRootTypeParamList {}
  }
}
