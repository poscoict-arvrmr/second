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
import WifiStatus from '../components/WifiStatus';
import Mymenu from '../components/Mymenu';

type RootType = {
  store: {},
  history: {}
};
export default function Root({ store, history }: RootType) {
  console.log('[Root.js]','render', '[store.getState()]', store.getState(), '[history]', history);
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App>
          <WifiStatus/>
          <Mymenu />
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
