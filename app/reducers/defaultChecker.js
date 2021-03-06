import { ONLINE_STATUS, OFFLINE_STATUS, LOGIN_OK, LOGIN_NEEDED } from '../actions/defaultChecker';

export type defaultStateType = {
  status: boolean,
  authed: boolean,
  msg: string
};
const defaultState = {
  status: navigator.onLine,
  authed: false,
  msg: 'Loading...'
};

export default function checker(state = defaultState, action) {
  switch (action.type) {
    case ONLINE_STATUS:
      console.log('[checker.js]', 'reducer', 'checker', state, action);
      return {
        ...state,
        status: true
      };
    case OFFLINE_STATUS:
      console.log('[checker.js]', 'reducer', 'checker', state, action);
      return {
        ...state,
        status: false
      };
    case LOGIN_OK:
      console.log('[checker.js]', 'reducer', 'checker', state, action);
      return {
        ...state,
        authed: true,
        msg: '사용가능합니다.'
      };
    case LOGIN_NEEDED:
      console.log('[checker.js]', 'reducer', 'checker', state, action);
      return {
        ...state,
        authed: false,
        msg: '로그인이 필요합니다.'
      };
    default:
      return state;
  }
}
