import React from 'react';
import styled from 'styled-components';
import {View} from 'react-native';
import {COLORS} from '../../constants';
import {useSafeAreaInsets} from 'react-native-safe-area-context';

interface IPadding {
  children: React.ReactNode;
}

const PaddingLayout: React.FC<IPadding> = ({children}) => {
  const insets = useSafeAreaInsets();

  return (
    <Padding
      style={{
        paddingTop: insets.top,
        paddingLeft: insets.left,
        paddingRight: insets.right,
      }}>
      {children}
    </Padding>
  );
};

export default PaddingLayout;

const Padding = styled(View)`
  width: 100%;
  height: 100%;

  background-color: ${COLORS.white};
  color: ${COLORS.black};
`;
