import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import Navigation from './navigation';
import {AppContextProvider} from './contexts/AppContext';
import * as Sentry from '@sentry/react-native';

Sentry.init({
  dsn: 'https://7e05f9f6db676f57c7aa4851234ac018@o4506733350092800.ingest.sentry.io/4506733351731200',
});

const App = () => {
  return (
    <AppContextProvider>
      <NavigationContainer>
        <Navigation />
      </NavigationContainer>
    </AppContextProvider>
  );
};

export default App;
