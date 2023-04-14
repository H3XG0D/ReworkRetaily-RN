import React from 'react';
import {Text} from 'react-native';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RetaiyRootTypeParamList} from '../../../../../Navigation/routes';

import AsyncStorage from '@react-native-async-storage/async-storage';
import Button from '../../../../UI/Button';
import PaddingLayout from '../../../../layout/PaddingLayout';

const UserProfile = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RetaiyRootTypeParamList>>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Профиль',
      headerTitleAlign: 'left',
      headerLeft: () => <Text></Text>,
      headerTitleStyle: {fontSize: 27, fontWeight: '700'},
      animation: 'none',
    });
  }, [navigation]);

  const logout = async () => {
    await AsyncStorage.removeItem('login');
    await AsyncStorage.removeItem('password');
    await AsyncStorage.removeItem('token');
    navigation.navigate('LoginPage');
  };

  return (
    <PaddingLayout>
      <Button
        onPress={() => logout()}
        title="Выйти"
        style={{alignSelf: 'center'}}
      />
    </PaddingLayout>
  );
};

export default UserProfile;
