// @flow
import { showHome, showLogin } from './defaultChecker';

export const FLICK_UP = 'FLICK_UP';
export const FLICK_DOWN = 'FLICK_DOWN';
export const FLICK_LEFT = 'FLICK_LEFT';
export const FLICK_RIGHT = 'FLICK_RIGHT';
export const TAP = 'TAP';

export function flickUp() {
  console.log('[gesture.js]', 'action', 'flickUp');
  return {
    type: FLICK_UP
  };
}
export function flickDown() {
  console.log('[gesture.js]', 'action', 'flickDown');
  return {
    type: FLICK_DOWN
  };
}
export function flickLeft() {
  console.log('[gesture.js]', 'action', 'flickLeft');
  return {
    type: FLICK_LEFT
  };
}
export function flickRight() {
  console.log('[gesture.js]', 'action', 'flickRight');
  return {
    type: FLICK_RIGHT
  };
}
export function tap(authed) {
  console.log('[gesture.js]', 'action', 'double tap');
  return {
    type: TAP,
    authed
  };
}

const LoginActions = {
  showHome,
  showLogin,
  tap,
  flickLeft,
  flickRight
};
const GestureActions = {
  tap,
  flickUp,
  flickDown,
  flickLeft,
  flickRight
};
export { LoginActions, GestureActions };
