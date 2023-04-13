import {TextInput} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';

interface IField {
  onChangeText: (val: string) => void;
  value: string;
  placeholder: string;
  isSecure?: boolean;
}

const Field: React.FC<IField> = ({
  onChangeText,
  value,
  placeholder,
  isSecure,
}) => {
  return (
    <TextInput
      showSoftInputOnFocus={false}
      placeholder={placeholder}
      onChangeText={onChangeText}
      value={value}
      secureTextEntry={isSecure}
      autoCapitalize="none"
      style={{
        width: 260,
        height: 45,
        backgroundColor: COLORS.milky,
        borderRadius: 8,
        marginTop: 10,
        padding: 10,
      }}
    />
  );
};

export default Field;
