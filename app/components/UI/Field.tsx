import {StyleSheet, TextInput, TextStyle, ViewStyle} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';

interface IField {
  onChangeText: (val: string) => void;
  value: string;
  placeholder: string;
  isSecure?: boolean;
  isNumeric?: 'numeric';
  maxLength?: number;
  numberOfLines?: number;
  style?: TextStyle | TextStyle[] | ViewStyle | ViewStyle[];
}

const Field: React.FC<IField> = ({
  onChangeText,
  value,
  placeholder,
  isSecure,
  isNumeric,
  maxLength,
  numberOfLines,
  style = {},
}) => {
  return (
    <TextInput
      showSoftInputOnFocus={false}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      secureTextEntry={isSecure}
      autoCapitalize="none"
      keyboardType={isNumeric}
      maxLength={maxLength}
      numberOfLines={numberOfLines}
      style={StyleSheet.flatten([
        {
          width: 260,
          height: 45,
          backgroundColor: COLORS.milky,
          borderRadius: 8,
        },
        style,
      ])}
    />
  );
};

export default Field;
