// @flow
import React, { Component } from 'react';
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

export let pi = process.env.NODE_ENV==='development' ? process.env.CAMERA : 'localhost';
export let mqtt = process.env.NODE_ENV==='development' ? process.env.MQTT : 'localhost';
console.log('찍혀라[index.js]', pi);

type Props = {
  store: {},
  history: {}
};
export default class Root extends Component<Props> {
  props: Props;
  render() {
    console.log('[Root.js]', 'render', this.props, this.props.store.getState());
    return (
      <Provider store={this.props.store}>
        <ConnectedRouter history={this.props.history}>
          <App>
            <WifiStatus />
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
}
