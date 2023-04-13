import React from 'react';
import {View, Text, Image} from 'react-native';

import {COLORS} from '../../../../../constants';

import Layout from '../../../../layout/Layout';
import styled from 'styled-components';

const LoginPage = () => {
  return (
    <Layout>
      <Logo>
        <LogoImage source={require('./logo/logo.png')} />
      </Logo>
    </Layout>
  );
};

export default LoginPage;

// * Logo Styles

const Logo = styled(View)`
  width: 100%;
  height: 210px;

  justify-content: center;
  align-items: center;

  background-color: ${COLORS.primary};
  border-bottom-right-radius: 10px;
  border-bottom-left-radius: 10px;
`;

const LogoImage = styled(Image)`
  width: 120px;
  height: 26px;
`;

// * Login Styles

const Login = styled(View)``;
