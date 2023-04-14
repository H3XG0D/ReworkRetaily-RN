import {
  Text,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';

interface IButton {
  title: any;
  colors?: [string, string];
  onPress?: () => void;
  disabled?: boolean;
  style?: TextStyle | TextStyle[] | ViewStyle | ViewStyle[];
}

const Button: React.FC<IButton> = ({title, onPress, disabled, style = {}}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      disabled={disabled}
      style={StyleSheet.flatten([
        {
          backgroundColor: COLORS.primary,
          width: 260,
          height: 45,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: 8,
          marginTop: 20,
        },
        style,
      ])}>
      <Text
        style={{textAlign: 'center', color: COLORS.white, fontWeight: '600'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
