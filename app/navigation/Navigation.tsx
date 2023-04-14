import React from 'react';

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {NavigationContainer} from '@react-navigation/native';
import {RetaiyRootTypeParamList} from './routes';

// * Import screens from directories
import LoginPage from '../components/pages/Login/screens/login/Login';
import Forget from '../components/pages/Login/screens/Forget/forget/Forget';
import Registration from '../components/pages/Registration/screens/registration/Registration';
import Market from '../components/pages/Market/screens/Main/Market';
import ForgetCode from '../components/pages/Login/screens/Forget/forget-code/ForgetCode';
import Code from '../components/pages/Registration/screens/code/Code';

const Stack = createNativeStackNavigator<RetaiyRootTypeParamList>();

const Navigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="LoginPage">
        <Stack.Screen
          name="LoginPage"
          component={LoginPage}
          options={{headerShown: false}}></Stack.Screen>

        <Stack.Screen name="Forget" component={Forget}></Stack.Screen>
        <Stack.Screen name="ForgetCode" component={ForgetCode}></Stack.Screen>

        <Stack.Screen
          name="Registration"
          component={Registration}></Stack.Screen>
        <Stack.Screen name="Code" component={Code}></Stack.Screen>

        <Stack.Screen name="Market" component={Market}></Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
