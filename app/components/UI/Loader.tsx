import React from 'react';
import {View, Image} from 'react-native';
import styled from 'styled-components';

import AsyncStorage from '@react-native-async-storage/async-storage';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RetaiyRootTypeParamList} from '../../Navigation/routes';

import {COLORS} from '../../constants';

const Loader = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RetaiyRootTypeParamList>>();

  React.useLayoutEffect(() => {
    navigation.setOptions({headerShown: false, animation: 'fade'});
  }, [navigation]);

  const [loading, setLoading] = React.useState<boolean>(true);

  const readData = async () => {
    const login = await AsyncStorage.getItem('login');
    const password = await AsyncStorage.getItem('password');

    if (login !== null && password !== null) {
      navigation.navigate('Market');
    } else {
      navigation.navigate('LoginPage');
      setLoading(false);
    }
  };

  React.useEffect(() => {
    setTimeout(() => setLoading(false), 3000);
  }, [readData()]);

  return (
    <>
      {loading === false ? undefined : (
        <LoadingContent>
          <LoadingLogo>
            <LogoImage
              source={require('../../components/pages/Login/screens/login/logo/logo.png')}
            />
          </LoadingLogo>
        </LoadingContent>
      )}
    </>
  );
};

export default Loader;

const LoadingContent = styled(View)`
  width: 100%;
  height: 100%;
  background-color: ${COLORS.primary};
`;

const LoadingLogo = styled(View)`
  justify-content: center;
  align-items: center;
  background-color: ${COLORS.primary};
  margin-top: 270px;
  height: 210px;
  width: 100%;
`;

const LogoImage = styled(Image)`
  width: 180px;
  height: 40px;
`;
