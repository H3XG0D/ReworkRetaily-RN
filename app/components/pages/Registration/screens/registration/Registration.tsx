import {View, Text} from 'react-native';
import React from 'react';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RetaiyRootTypeParamList} from '../../../../../navigation/routes';
import {loginCheck} from '../../../../../api/api';
import {PhoneEdit} from '../../../../../hooks/PhoneEdit';
import {GetSms} from '../../../../../hooks/GetSms';
import RetailyLayout from '../../../../layout/RetailyLayout';
import styled from 'styled-components';
import {COLORS} from '../../../../../constants';
import ImportantInfo from '../../../../UI/ImportantInfo';
import Field from '../../../../UI/Field';
import ButtonLoader from '../../../../UI/ButtonLoader';
import Button from '../../../../UI/Button';

const Registration = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RetaiyRootTypeParamList>>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Регистрация',
      headerTitleStyle: {fontSize: 22},
    });
  }, [navigation]);

  const [phone, onChangePhone] = React.useState<any>('');
  const [numberError, setNumberError] = React.useState<any>('');

  const [load, setLoad] = React.useState<boolean>(false);

  const checkLogin = async () => {
    setLoad(true);

    const userPhone = phone
      .replace(' ', '')
      .replace('-', '')
      .replace('-', '')
      .replace('(', '')
      .replace(')', '');

    const realPhone = 8 + String(userPhone);

    if (phone.length < 15) {
      setNumberError('Полностью впишите свой номер');
    } else {
      let result = await loginCheck(realPhone);
      if (!result) {
        setNumberError('Этот номер уже зарегестрирован');
      } else {
        setNumberError(true);
        // navigation.navigate('Code');
        GetSms(userPhone, 'phone');
      }
    }
    setLoad(false);
    console.log(userPhone);
  };

  const validateNumberElements = (number: string) => {
    let i = '(';
    if (!number.includes('(')) {
      number = '(' + number;
    }
    if (!number.includes(')') && number.length > 4) {
      let strBefore = number.slice(0, 4);
      let strAfter = number.slice(4);
      number = strBefore + ')' + strAfter;
    }
    if (!number.includes(' ') && number.length > 5) {
      let strBefore = number.slice(0, 5);
      let strAfter = number.slice(5);
      number = strBefore + ' ' + strAfter;
    }
    if (!number.includes('-') && number.length > 9) {
      let strBefore = number.slice(0, 9);
      let strAfter = number.slice(9);
      number = strBefore + '-' + strAfter;
    }
    if (number.length > 12 && (number.match(/-/g) || []).length < 2) {
      let strBefore = number.slice(0, 12);
      let strAfter = number.slice(12);
      number = strBefore + '-' + strAfter;
    }
    onChangePhone(number);
  };

  return (
    <RetailyLayout>
      <RegisterView>
        <RegisterSubtitle>
          Телефон <ImportantInfo />
        </RegisterSubtitle>

        <RegisterContainer>
          <RegisterNumber>8 </RegisterNumber>

          <Field
            onChangeText={(number: string) => validateNumberElements(number)}
            value={phone}
            placeholder="(___)-___-__-__"
            isNumeric="numeric"
            maxLength={15}
            numberOfLines={15}
            style={{
              width: 300,
              fontSize: 20,
            }}
          />
        </RegisterContainer>
        <RegisterErrorText>{numberError}</RegisterErrorText>

        <RegisterInfo>
          Ваш номер телефона будет использоваться в качестве логина для входа в
          Ритейли
        </RegisterInfo>

        {load ? (
          <ButtonLoader
            style={{marginTop: 10, marginLeft: 'auto', marginRight: 'auto'}}
          />
        ) : (
          <Button
            onPress={() => checkLogin()}
            title="Подтвердить"
            style={{marginTop: 10, marginLeft: 'auto', marginRight: 'auto'}}
          />
        )}
      </RegisterView>
    </RetailyLayout>
  );
};

export default Registration;

const RegisterView = styled(View)`
  margin-top: 30px;
`;

const RegisterSubtitle = styled(Text)`
  font-size: 18px;
  margin-left: 30px;
  margin-bottom: 5px;
`;

const RegisterContainer = styled(View)`
  width: 350px;
  height: 50px;

  flex-direction: row;
  border-radius: 10px;

  background-color: ${COLORS.milky};

  margin-left: auto;
  margin-right: auto;
  align-items: center;
`;

const RegisterNumber = styled(Text)`
  font-size: 20px;

  margin-left: 20px;
  margin-top: 1px;
`;

const RegisterInfo = styled(Text)`
  width: 300px;
  color: ${COLORS.gray};
  font-size: 14px;
  line-height: 18px;

  margin-left: 30px;
  margin-bottom: 10px;
`;

const RegisterErrorText = styled(Text)`
  color: ${COLORS.red};
  font-size: 12px;

  margin-top: 3px;
  margin-bottom: 3px;
  margin-left: 20px;
`;
