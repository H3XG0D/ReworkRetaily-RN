import {Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {COLORS} from '../../constants';

interface IButton {
  title: string;
  colors?: [string, string];
  onPress?: () => void;
}

const Button: React.FC<IButton> = ({title, onPress}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        backgroundColor: COLORS.primary,
        width: 260,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginTop: 20,
      }}>
      <Text
        style={{textAlign: 'center', color: COLORS.white, fontWeight: '600'}}>
        {title}
      </Text>
    </TouchableOpacity>
  );
};

export default Button;
