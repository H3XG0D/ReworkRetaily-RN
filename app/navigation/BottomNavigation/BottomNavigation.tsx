import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomRootTypeParamList} from '../routes';

import {RetailyBottomScreen} from './BottomStack';

import Request from '../../components/pages/Market/screens/Main/Request';
import MyRequest from '../../components/pages/Market/screens/Main/MyRequest';
import UserProfile from '../../components/pages/Market/screens/Main/UserProfile';

const Tab = createBottomTabNavigator<BottomRootTypeParamList>();

export const BottomNavigation: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MarketStack"
        component={RetailyBottomScreen}></Tab.Screen>
      <Tab.Screen name="Request" component={Request}></Tab.Screen>
      <Tab.Screen name="MyRequest" component={MyRequest}></Tab.Screen>
      <Tab.Screen name="UserProfile" component={UserProfile}></Tab.Screen>
    </Tab.Navigator>
  );
};
