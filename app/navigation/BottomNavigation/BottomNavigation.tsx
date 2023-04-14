import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {BottomRootTypeParamList} from '../routes';
import {RetailyBottomScreen} from './BottomStack';
import {COLORS} from '../../constants';

// import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import Request from '../../components/pages/Market/screens/Main/Request';
import MyRequest from '../../components/pages/Market/screens/Main/MyRequest';
import UserProfile from '../../components/pages/Market/screens/Main/UserProfile';

const Tab = createBottomTabNavigator<BottomRootTypeParamList>();

export const BottomNavigation: React.FC = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="MarketStack"
        component={RetailyBottomScreen}
        options={{
          headerShown: false,
          tabBarLabel: 'Главная',
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: tabinfo => {
            return (
              <MaterialCommunityIcons
                name="home"
                size={34}
                color={
                  tabinfo.focused ? COLORS.primary : COLORS.gray
                }></MaterialCommunityIcons>
            );
          },
        }}></Tab.Screen>
      <Tab.Screen
        name="Request"
        component={Request}
        options={{
          headerShown: false,
          tabBarLabel: 'Корзина',
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: tabinfo => {
            return (
              <MaterialCommunityIcons
                name="basket"
                size={30}
                color={
                  tabinfo.focused ? COLORS.primary : COLORS.gray
                }></MaterialCommunityIcons>
            );
          },
        }}></Tab.Screen>
      <Tab.Screen
        name="MyRequest"
        component={MyRequest}
        options={{
          headerShown: false,
          tabBarLabel: 'Мои заявки',
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: tabinfo => {
            return (
              <MaterialCommunityIcons
                name="format-list-bulleted"
                size={30}
                color={
                  tabinfo.focused ? COLORS.primary : COLORS.gray
                }></MaterialCommunityIcons>
            );
          },
        }}></Tab.Screen>
      <Tab.Screen
        name="UserProfile"
        component={UserProfile}
        options={{
          headerShown: false,
          tabBarLabel: 'Профиль',
          tabBarActiveTintColor: COLORS.primary,
          tabBarIcon: tabinfo => {
            return (
              <MaterialCommunityIcons
                name="account"
                size={30}
                color={
                  tabinfo.focused ? COLORS.primary : COLORS.gray
                }></MaterialCommunityIcons>
            );
          },
        }}></Tab.Screen>
    </Tab.Navigator>
  );
};
