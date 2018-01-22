// @flow
export const FLICK_UP = 'FLICK_UP';
export const FLICK_DOWN = 'FLICK_DOWN';
export const FLICK_LEFT = 'FLICK_LEFT';
export const FLICK_RIGHT = 'FLICK_RIGHT';
export const TAP = 'TAP';

export function flick_up(){
    console.log('[gesture.js]','action','flick_up');
    return {
        type : FLICK_UP
    }
}
export function flick_down(){
    console.log('[gesture.js]','action','flick_down');
    return {
        type : FLICK_DOWN
    }
}
export function flick_left(){
    console.log('[gesture.js]','action','flick_left');
    return {
        type : FLICK_LEFT
    }
}
export function flick_right(){
    console.log('[gesture.js]','action','flick_right');
    return {
        type : FLICK_RIGHT
    }
}
export function tap(){
    console.log('[gesture.js]','action','tap');
    return {
        type : TAP
    }
}