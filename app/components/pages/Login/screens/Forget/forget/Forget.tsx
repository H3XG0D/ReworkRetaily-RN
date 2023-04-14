import {View, Text} from 'react-native';
import React from 'react';
import styled from 'styled-components';

import {useNavigation} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RetaiyRootTypeParamList} from '../../../../../../navigation/routes';

import {COLORS} from '../../../../../../constants';
import {loginCheck} from '../../../../../../api/api';

import RetailyLayout from '../../../../../layout/RetailyLayout';
import ImportantInfo from '../../../../../UI/ImportantInfo';
import Field from '../../../../../UI/Field';
import ButtonLoader from '../../../../../UI/ButtonLoader';
import Button from '../../../../../UI/Button';
import {GetSms} from '../../../../../../hooks/GetSms';

const Forget = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RetaiyRootTypeParamList>>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Восстановление пароля',
      headerTitleStyle: {fontSize: 22},
    });
  }, [navigation]);

  const [phone, onChangePhone] = React.useState<string>('');
  const [numberError, setNumberError] = React.useState<any>('');

  const [load, setLoad] = React.useState<boolean>(false);

  const forgotUser = async () => {
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
      if (result) {
        setNumberError('Этого номера не существует!');
      } else {
        setNumberError(true);
        navigation.navigate('ForgetCode');
        GetSms(userPhone, 'phone');
      }
    }
    setLoad(false);
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
      <ForgetView>
        <ForgetSubtitle>
          Телефон <ImportantInfo />
        </ForgetSubtitle>

        <ForgetContainer>
          <ForgetNumber>8 </ForgetNumber>
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
        </ForgetContainer>
        <ForgetErrorText>{numberError}</ForgetErrorText>

        {load ? (
          <ButtonLoader
            style={{marginTop: 10, marginLeft: 'auto', marginRight: 'auto'}}
          />
        ) : (
          <Button
            onPress={() => forgotUser()}
            title="Подтвердить"
            style={{marginTop: 10, marginLeft: 'auto', marginRight: 'auto'}}
          />
        )}
      </ForgetView>
    </RetailyLayout>
  );
};

export default Forget;

const ForgetView = styled(View)`
  margin-top: 30px;
`;

const ForgetSubtitle = styled(Text)`
  font-size: 18px;
  margin-left: 30px;
  margin-bottom: 5px;
`;

const ForgetContainer = styled(View)`
  width: 350px;
  height: 50px;

  flex-direction: row;
  border-radius: 10px;

  background-color: ${COLORS.milky};

  margin-left: auto;
  margin-right: auto;
  align-items: center;
`;

const ForgetNumber = styled(Text)`
  font-size: 20px;

  margin-left: 20px;
  margin-top: 1px;
`;

const ForgetErrorText = styled(Text)`
  color: ${COLORS.red};
  font-size: 12px;

  margin-top: 3px;
  margin-left: 20px;
`;
