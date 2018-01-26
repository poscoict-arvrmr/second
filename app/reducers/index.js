// @flow
import { combineReducers } from 'redux';
import { routerReducer as router } from 'react-router-redux';
import checker from './defaultChecker';
import gesture from './gesture';
import camera from './camera';


const rootReducer = combineReducers({
  router,
  checker,
  gesture,
  camera
});

export default rootReducer;
