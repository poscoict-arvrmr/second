// @flow
import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'react-router-redux';

import { Switch, Route } from 'react-router';
import App from './App';
import HomePage from './HomePage';
import LoginPage from './LoginPage';

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
            <Route path="/login" component={LoginPage} />
            <Route path="/" component={HomePage} />
          </Switch>
        </App>        
      </ConnectedRouter>
    </Provider>
  );
}
