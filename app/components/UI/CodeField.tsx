import React from 'react';
import {TextInput, TextStyle, ViewStyle} from 'react-native';
import {COLORS} from '../../constants';

export interface ICodeField {
  onChangeText: (val: string) => void;
  isNumeric?: 'numeric' | 'number-pad';
  maxLength?: number;
  onKeyPress?: any;
  ref?: React.Ref<TextInput> | undefined;
  style?: TextStyle | TextStyle[] | ViewStyle | ViewStyle[];
}

const CodeField: React.FC<ICodeField> = ({
  isNumeric,
  maxLength,
  onKeyPress,
  onChangeText,
  ref,
  style = {},
}) => {
  return (
    <TextInput
      onChangeText={onChangeText}
      showSoftInputOnFocus={false}
      autoCapitalize="none"
      keyboardType={isNumeric}
      maxLength={maxLength}
      onKeyPress={onKeyPress}
      ref={ref}
      style={{
        paddingHorizontal: 18,
        paddingVertical: 10,
        fontSize: 30,
        backgroundColor: '#fbfbfe',
        color: COLORS.black,
      }}
    />
  );
};

export default CodeField;
