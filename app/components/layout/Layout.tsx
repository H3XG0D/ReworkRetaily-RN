import {View, NativeModules, ViewStyle} from 'react-native';
import React from 'react';

import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {COLORS} from '../../constants';

import styled from 'styled-components';

interface ILayout {
  children: React.ReactNode;
  style?: ViewStyle | ViewStyle[];
}

export const {StatusBarManager} = NativeModules;

export const Layout: React.FC<ILayout> = ({children}) => {
  const insets = useSafeAreaInsets();

  return (
    <LayoutStatusBar>
      <LayoutMain
        style={{
          paddingBottom: insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        }}>
        {children}
      </LayoutMain>
    </LayoutStatusBar>
  );
};

export default Layout;

const LayoutMain = styled(View)`
  width: 100%;
  height: 100%;

  background-color: ${COLORS.white};
  color: ${COLORS.black};
`;

const LayoutStatusBar = styled(View)`
  padding-top: ${StatusBarManager.HEIGHT};
  background-color: ${COLORS.primary};
`;
