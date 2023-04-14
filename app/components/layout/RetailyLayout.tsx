import {View, ViewStyle, StyleSheet} from 'react-native';
import React from 'react';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../../constants';

import styled from 'styled-components';

interface ILayout {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export const RetailyLayout: React.FC<ILayout> = ({children, style = {}}) => {
  const insets = useSafeAreaInsets();

  return (
    <LayoutMain
      style={StyleSheet.flatten([
        {
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        style,
      ])}>
      {children}
    </LayoutMain>
  );
};

export default RetailyLayout;

const LayoutMain = styled(View)`
  width: 100%;
  height: 100%;

  background-color: ${COLORS.white};
  color: ${COLORS.black};
`;
