import React from 'react';
import {StyleSheet, TextInput, TextStyle, ViewStyle} from 'react-native';

import {COLORS} from '../../constants';

interface IField {
  onChangeText?: (val: string) => void;
  value?: any;
  placeholder?: string;
  isSecure?: boolean;
  isNumeric?: 'numeric' | 'number-pad';
  maxLength?: number;
  numberOfLines?: number;
  style?: TextStyle | TextStyle[] | ViewStyle | ViewStyle[];
  ref?: React.Ref<TextInput> | undefined;
  children?: React.ReactNode;
}

const Field: React.FC<IField> = ({
  onChangeText,
  value,
  placeholder,
  isSecure,
  isNumeric,
  maxLength,
  numberOfLines,
  children,
  ref,
  style = {},
}) => {
  return (
    <TextInput
      onChangeText={onChangeText}
      showSoftInputOnFocus={false}
      placeholder={placeholder}
      value={value}
      secureTextEntry={isSecure}
      autoCapitalize="none"
      keyboardType={isNumeric}
      maxLength={maxLength}
      numberOfLines={numberOfLines}
      ref={ref}
      style={StyleSheet.flatten([
        {
          width: 260,
          height: 45,
          backgroundColor: COLORS.milky,
          borderRadius: 8,
        },
        style,
      ])}>
      {children}
    </TextInput>
  );
};

export default Field;
