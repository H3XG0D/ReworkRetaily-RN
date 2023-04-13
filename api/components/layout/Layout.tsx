import {View, Text} from 'react-native';
import React from 'react';

interface ILayout {
  children: React.ReactNode;
  isScrollView?: boolean;
}

const Layout = () => {
  return (
    <View>
      <Text>Layout</Text>
    </View>
  );
};

export default Layout;
