import React, {Component} from 'react';

import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/es/integration/react';
import {store, persistor} from '../ReduxRealmExample/src/store/index';
import HomeScreen from '../ReduxRealmExample/src/screens/HomeScreen';

console.disableYellowBox = true;

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <HomeScreen />
        </PersistGate>
      </Provider>
    );
  }
}

export default App;
