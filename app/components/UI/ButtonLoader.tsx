import React from 'react';
import {
  ActivityIndicator,
  TouchableOpacity,
  TextStyle,
  ViewStyle,
  StyleSheet,
} from 'react-native';

import {COLORS} from '../../constants';

interface IButtonLoader {
  style?: TextStyle | TextStyle[] | ViewStyle | ViewStyle[];
}

const ButtonLoader: React.FC<IButtonLoader> = ({style = {}}) => {
  return (
    <TouchableOpacity
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
      <ActivityIndicator size="large" color="white" />
    </TouchableOpacity>
  );
};

export default ButtonLoader;
