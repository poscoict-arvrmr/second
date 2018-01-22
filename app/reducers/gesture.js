import {FLICK_UP, FLICK_DOWN, FLICK_LEFT, FLICK_RIGHT, TAP} from '../actions/gesture';
 

const defaultState = {
    msg : ""
}

export default function fakeGesture(state=defaultState, action){
    switch(action.type){
        case FLICK_UP :
            console.log('[gesture.js]','reducer','gesture', state, action);
            return {
                ...state,
                msg : "UP 체스처 발생"
            }
        case FLICK_DOWN :
            console.log('[gesture.js]','reducer','gesture', state, action);
            return {
                ...state,
                msg : "DOWN 체스처 발생"
            }
        case FLICK_LEFT :
            console.log('[gesture.js]','reducer','gesture', state, action);
            return {
                ...state,
                msg : "LEFT 체스처 발생"
            }
        case FLICK_RIGHT :
            console.log('[gesture.js]','reducer','gesture', state, action);
            return {
                ...state,
                msg : "RIGHT 체스처 발생"
            }
        case TAP :
            console.log('[gesture.js]','reducer','gesture', state, action);
            return {
                ...state,
                msg : "TAP 체스처 발생"
            }
        default :
            return state;
    }
}