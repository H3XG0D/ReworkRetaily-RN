import React from 'react';
import {View, Text, Image} from 'react-native';

import styled from 'styled-components';

// * Import other components
import Layout from '../../../../layout/Layout';
import {SIZES, COLORS} from '../../../../../constants';
import Field from '../../../../UI/Field';
import Button from '../../../../UI/Button';

const LoginPage = () => {
  const [login, onChangeLogin] = React.useState<string>('');
  const [password, onChangePassword] = React.useState<string>('');

  const [error, setError] = React.useState<string | boolean>();
  const [loadError, setLoadError] = React.useState<boolean>();

  return (
    <Layout>
      <Logo>
        <LogoImage source={require('./logo/logo.png')} />
      </Logo>

      <LoginHeader>
        <LoginTitle>Вход</LoginTitle>
        <LoginSubTitle>Введите логин или номер телефона</LoginSubTitle>
      </LoginHeader>

      <Login>
        <Field
          onChangeText={onChangeLogin}
          value={login}
          placeholder="Введите логин"
        />

        <Field
          onChangeText={onChangePassword}
          value={password}
          placeholder="Пароль"
          isSecure={true}
        />

        <LoginForgetPassword>Забыли пароль?</LoginForgetPassword>
        <Button title="Войти" />

        <LoginSignUpView>
          <LoginSignUpText>
            Нет аккаунта? <LoginSignUp>Зарегистрироваться</LoginSignUp>
          </LoginSignUpText>
        </LoginSignUpView>
      </Login>
    </Layout>
  );
};

export default LoginPage;

// * Logo Styles

const Logo = styled(View)`
  width: 100%;
  height: 230px;

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

const Login = styled(View)`
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const LoginHeader = styled(View)`
  flex-direction: column;

  margin-left: 65px;
  margin-top: 35px;
`;

const LoginTitle = styled(Text)`
  font-size: 25px;
  font-weight: 700;

  padding-bottom: 20px;
`;

const LoginSubTitle = styled(Text)`
  color: ${COLORS.gray};
  font-size: 13px;
`;

const LoginForgetPassword = styled(Text)`
  color: ${COLORS.secondary};
  font-size: 13px;
  font-weight: ${SIZES.bold};

  margin-top: 12px;
  margin-right: 36%; // TODO: Доделать стили по-лучше для разных экранов

  text-decoration: underline;
  text-decoration-color: ${COLORS.secondary};
`;

const LoginSignInText = styled(Text)`
  color: ${COLORS.white};
  font-weight: ${SIZES.bold};
`;

const LoginSignUpView = styled(View)`
  margin-top: 30px;
`;

const LoginSignUpText = styled(Text)`
  font-size: 13px;
`;

const LoginSignUp = styled(Text)`
  color: ${COLORS.secondary};

  font-weight: ${SIZES.bold};
  text-decoration: underline;
  text-decoration-color: ${COLORS.secondary};
`;

const LoginErrorText = styled(Text)`
  color: ${COLORS.red};
  font-size: 16px;

  margin-top: 30px;
  margin-left: auto;
  margin-right: auto;
`;
