// @flow
export const ONLINE_STATUS = 'ONLINE';
export const OFFLINE_STATUS = 'OFFLINE';
export const LOGIN_OK = 'LOGIN_OK';
export const LOGIN_NEEDED = 'LOGIN_NEEDED';

export function online() {
  console.log('[checker.js]', 'action', 'online');
  return {
    type: ONLINE_STATUS
  };
}
export function offline() {
  console.log('[checker.js]', 'action', 'offline');
  return {
    type: OFFLINE_STATUS
  };
}
export function showHome(user) {
  console.log('[checker.js]', 'action', 'login');
  return {
    type: LOGIN_OK,
    user
  };
}
export function showLogin() {
  console.log('[checker.js]', 'action', 'logout');
  return {
    type: LOGIN_NEEDED
  };
}

const WifiCheckerActions = {
  online,
  offline
};
const LoginActions = {
  showHome,
  showLogin
};
export { WifiCheckerActions, LoginActions };
