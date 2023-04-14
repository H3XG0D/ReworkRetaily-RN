import {View} from 'react-native';
import React from 'react';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../../constants';

import styled from 'styled-components';

interface ILayout {
  children: React.ReactNode;
  isScrollView?: boolean;
}

export const RetailyLayout: React.FC<ILayout> = ({
  children,
  isScrollView = true,
}) => {
  const insets = useSafeAreaInsets();

  return (
    <LayoutMain
      style={{
        paddingBottom: insets.bottom,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
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
