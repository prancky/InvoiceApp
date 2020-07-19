/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {Provider as PaperProvider} from 'react-native-paper';
import {View, Text, LogBox} from 'react-native';
import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {NavigationContainer} from '@react-navigation/native';

import FlashMessage from 'react-native-flash-message';

import AuthNavigation from './src/navigations/NavigationContainer';
import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';
import {store, persistor} from './src/redux/store/store';
import ignoreWarnings from 'react-native-ignore-warnings';
LogBox.ignoreAllLogs();
const App: () => React$Node = () => {
  return (
    <Provider store={store}>
      <PaperProvider>
        <PersistGate loading={null} persistor={persistor}>
          <NavigationContainer>
            <AuthNavigation />
          </NavigationContainer>
          <FlashMessage position="bottom" duration={4500} icon="auto" />
        </PersistGate>
      </PaperProvider>
    </Provider>
  );
};

export default App;
