import React from 'react';

import {SafeAreaProvider} from 'react-native-safe-area-context';
import {LogBox} from 'react-native';

import Navigation from './app/Navigation/Navigation';
import {Provider} from 'react-redux';
import {store} from './redux/store/store';

const App = () => {
  LogBox.ignoreAllLogs();

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <Navigation />
      </SafeAreaProvider>
    </Provider>
  );
};

export default App;
