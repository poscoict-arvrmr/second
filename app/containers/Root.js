// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { Switch, Route } from 'react-router';
import App from './App';
import HomePage from './HomePage';
import LoginPage from './LoginPage';
import MenuPage from './containers/MenuPage';
import FilesPage from './containers/FilesPage';
import CameraPage from './containers/CameraPage';
import SettingsPage from './containers/SettingsPage';

type RootType = {
  store: {},
  history: {}
};
export default function Root({ store, history }: RootType) {
  console.log('[Root.js]','render', store);
  return (
    <Provider store={store}>
      <ConnectedRouter history={history}>
        <App>
          <Switch>
            <Route path="/menu" component={MenuPage} />      
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
