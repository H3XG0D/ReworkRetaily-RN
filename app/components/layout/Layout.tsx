import {View, Text} from 'react-native';
import React from 'react';

import styled from 'styled-components';

interface ILayout {
  children: React.ReactNode;
  isScrollView?: boolean;
}

export const Layout: React.FC<ILayout> = ({children, isScrollView = true}) => {
  return <View>{children}</View>;
};

export default Layout;
