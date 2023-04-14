import {View, Text, TextInput, TouchableOpacity} from 'react-native';
import React, {useRef, useState} from 'react';

import {useNavigation, useRoute} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {RetaiyRootTypeParamList} from '../../../../../Navigation/routes';

import RetailyLayout from '../../../../layout/RetailyLayout';
import {GetSms} from '../../../../../hooks/GetSms';
import {getPhoneVerify} from '../../../../../api/api';
import styled from 'styled-components';
import {COLORS} from '../../../../../constants';
import CodeField from '../../../../UI/CodeField';
import ButtonLoader from '../../../../UI/ButtonLoader';
import Button from '../../../../UI/Button';

const Code = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RetaiyRootTypeParamList>>();

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: 'Подтверждение',
      headerTitleStyle: {fontSize: 22},
    });
  }, [navigation]);

  const route = useRoute();
  const {realPhone}: any = route.params;

  const firstInput = useRef<any>();
  const secondInput = useRef<any>();
  const thirdInput = useRef<any>();
  const fourthInput = useRef<any>();

  const [otp, setOtp] = useState<any>({1: '', 2: '', 3: '', 4: ''});

  const [load, setLoad] = React.useState<boolean>(false);
  const [change, setChange] = React.useState<boolean>(false);

  const [error, setError] = React.useState<string>();
  const [counter, setCounter] = React.useState<number>(100);

  React.useEffect(() => {
    const timer: any =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const registerCode = async () => {
    setLoad(true);
    let result = await getPhoneVerify(
      realPhone,
      otp['1'] + otp['2'] + otp['3'] + otp['4'],
      'phone',
    );
    if (result && result.is_verify) {
      navigation.navigate('Details', {realPhone});
    } else {
      const err = 'Вы ввели неправильный код';
      setError(err);
    }
    setLoad(false);
  };

  const handleKeyDown = (e: any, cmd: string) => {
    if (e.nativeEvent.key === 'Backspace') {
      switch (cmd) {
        case '2':
          otp[cmd] === '' ? firstInput.current.focus() : null;
          break;
        case '3':
          otp[cmd] === '' ? secondInput.current.focus() : null;
          break;
        case '4':
          otp[cmd] === '' ? thirdInput.current.focus() : null;
          break;
      }
    }
  };

  return (
    <RetailyLayout>
      <CodeContainer>
        <CodeSubtitle>
          Пожалуйста введите код который отправлен на номер:{' '}
          <CodeNumber>{realPhone}</CodeNumber>
        </CodeSubtitle>

        <CodeContent>
          <CodeBox>
            <CodeField
              isNumeric="number-pad"
              maxLength={1}
              ref={firstInput}
              onChangeText={(text: any) => {
                setOtp({...otp, 1: text});
                text && secondInput?.current?.focus();
              }}
            />
          </CodeBox>

          <CodeBox>
            <CodeField
              isNumeric="number-pad"
              maxLength={1}
              ref={secondInput}
              onKeyPress={(e: any) => handleKeyDown(e, '2')}
              onChangeText={(text: any) => {
                setOtp({...otp, 2: text});
                text
                  ? thirdInput?.current?.focus()
                  : firstInput?.current?.focus();
              }}
            />
          </CodeBox>

          <CodeBox>
            <CodeField
              isNumeric="number-pad"
              maxLength={1}
              ref={thirdInput}
              onKeyPress={(e: string) => handleKeyDown(e, '3')}
              onChangeText={(text: any) => {
                setOtp({...otp, 3: text});
                text
                  ? fourthInput?.current?.focus()
                  : secondInput?.current?.focus();
              }}
            />
          </CodeBox>

          <CodeBox>
            <CodeField
              isNumeric="number-pad"
              maxLength={1}
              ref={fourthInput}
              onKeyPress={(e: any) => handleKeyDown(e, '4')}
              onChangeText={(text: any) => {
                setOtp({...otp, 4: text});
                !text && thirdInput?.current?.focus();
              }}
            />
          </CodeBox>
        </CodeContent>

        {counter == 0 ? (
          <TouchableOpacity onPress={() => GetSms(realPhone, 'phone')}>
            <CodeResend>Отправить код</CodeResend>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity disabled={true}>
            <CodeResendTimer>
              Переотправить код через: {counter}
            </CodeResendTimer>
          </TouchableOpacity>
        )}

        <CodeSubmitErrorCode>{error}</CodeSubmitErrorCode>

        {otp['1'] == '' ||
        otp['2'] == '' ||
        otp['3'] == '' ||
        otp['4'] == '' ? (
          <Button
            onPress={() => ''}
            title="Продолжить"
            disabled={true}
            style={{backgroundColor: COLORS.gray, marginTop: 20}}
          />
        ) : (
          <View>
            {load ? (
              <ButtonLoader
                style={{backgroundColor: COLORS.fifth, marginTop: 20}}
              />
            ) : (
              <Button
                onPress={() => registerCode()}
                title="Продолжить"
                style={{backgroundColor: COLORS.fifth, marginTop: 20}}
              />
            )}
          </View>
        )}
      </CodeContainer>
    </RetailyLayout>
  );
};

export default Code;

const CodeContainer = styled(View)`
  align-items: center;
  border-radius: 20px;

  align-self: center;
  margin-top: 20%;
`;

const CodeSubtitle = styled(Text)`
  width: 300px;
  color: ${COLORS.black};

  text-align: center;

  font-size: 20px;
  margin-top: 6px;
`;

const CodeNumber = styled(Text)`
  color: ${COLORS.black};

  font-size: 22px;
  font-weight: 600;
`;

const CodeContent = styled(View)`
  flex-direction: row;
  align-items: center;
  gap: 30px;

  margin-top: 50px;
  align-self: center;
`;

const CodeBox = styled(View)`
  border-color: ${COLORS.gray};
  border-radius: 3px;
  border-width: 1px;
`;

const CodeResendTimer = styled(Text)`
  font-size: 15px;
  padding-top: 6%;
`;

const CodeResend = styled(Text)`
  font-size: 15px;
  padding-top: 6%;
  text-decoration: underline;
`;

const CodeSubmit = styled(View)`
  width: 350px;
  height: 55px;

  align-items: center;
  justify-content: center;

  background-color: ${COLORS.fifth};
  border-radius: 10;

  margin-top: 20px;
  align-self: center;
`;

const CodeSubmitOff = styled(View)`
  width: 350px;
  height: 55px;

  align-items: center;
  justify-content: center;

  background-color: ${COLORS.gray};
  border-radius: 10;

  margin-top: 20px;
  align-self: center;
`;

const CodeSubmitText = styled(Text)`
  color: ${COLORS.white};
  font-size: 20px;
`;

const CodeSubmitErrorCode = styled(Text)`
  color: ${COLORS.red};
  font-size: 16px;
  margin-top: 15px;
`;
