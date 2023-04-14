import React from 'react';
import {ActivityIndicator, Text, TouchableOpacity} from 'react-native';

import {COLORS} from '../../constants';

const ButtonLoader = () => {
  return (
    <TouchableOpacity
      style={{
        backgroundColor: COLORS.primary,
        width: 260,
        height: 45,
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 8,
        marginTop: 20,
      }}>
      <ActivityIndicator size="large" color="white" />
    </TouchableOpacity>
  );
};

export default ButtonLoader;
