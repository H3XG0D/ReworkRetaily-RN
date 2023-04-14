import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LogBox} from 'react-native';

import Navigation from './app/navigation/Navigation';

const App = () => {
  LogBox.ignoreAllLogs();

  return (
    <SafeAreaProvider>
      <Navigation />
    </SafeAreaProvider>
  );
};

export default App;
