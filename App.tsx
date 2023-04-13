import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LogBox} from 'react-native';

import LoginPage from './app/components/pages/Login/screens/login/Login';

const App = () => {
  LogBox.ignoreAllLogs();

  return (
    <SafeAreaProvider>
      <LoginPage />
    </SafeAreaProvider>
  );
};

export default App;
