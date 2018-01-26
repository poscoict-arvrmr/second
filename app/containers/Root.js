// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { Switch, Route } from 'react-router';
import App from './App';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import FilesPage from './FilesPage';
import CameraPage from './CameraPage';
import SettingsPage from './SettingsPage';

import { createStore } from 'redux';
import reducer from '../reducers/defaultChecker';

type RootType = {
  //store : {},
  history: {}
};

//redux에서 보통 쓰는 방식으로 reducer 함수를 import 해서 사용해봄.
let store = createStore(reducer);

export default function Root({ store, history }: RootType) {
  console.log('[Root.js]','render', store);
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App>
          <Switch>
            <Route path="/myfiles" component={FilesPage} />
            <Route path="/mycamera" component={CameraPage} />
            <Route path="/settings" component={SettingsPage} />
            <Route path="/login" component={LoginPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </App>        
      </ConnectedRouter>
    </Provider>
  );
}
