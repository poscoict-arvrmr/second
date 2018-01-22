// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import checker from './defaultChecker';
import gesture from './gesture'


const rootReducer = combineReducers({
  router,
  checker,
  gesture
});

export default rootReducer;
