import React from 'react';
import { Provider } from 'react-redux';

import store from './src/redux/storeConfig';
import Navigator from './src/Navigator';
import NavigationService from './src/NavigationService';

export default function App() {
  return (
    <Provider store={store}>
      <Navigator
        ref={navigatorRef => {
          NavigationService.setTopLevelNavigator(navigatorRef);
        }}
      />
    </Provider>
  );
}
