//reducer - default checker
//actions/defaultChecker.js에서 불러오지 않고 여기에 다 통합해서 시도.
//import {ONLINE_STATUS, OFFLINE_STATUS, LOGIN_OK, LOGIN_NEEDED} from '../actions/defaultChecker';

// export type defaultStateType = {
//     isRecording: boolean //카메라 액션추가
// }

//actions
//카메라 액션 추가
const START_REC = 'START_REC';
const STOP_REC = 'STOP_REC';

//action Creators
export function startRec(){
    console.log("Start Video Recording");
    return {
        type :  START_REC
    }
}
export function stopRec(){
    console.log("Stop Video Recording");
    return {
        type :  STOP_REC
    }
}

//reducer
const defaultState = {
    isRecording : false  //카메라 액션 추가
}
console.log(defaultState);
console.log("------------REDUCER/defaultState---------------");

export default function checker(state=defaultState, action){
    switch(action.type){
        
        //카메라 액션 추가
        case START_REC :
            console.log('[reducer/STARTREC]', 'reducer', 'checker',state,action);
            return {
                isRecording: true
            }
        
        case STOP_REC :
            console.log('[reducer/STOPREC]', 'reducer', 'checker',state,action);
            return {
                isRecording: false
            }
        default:
            return state;

    }
}

//exports

console.log("카메라 액션 추가");
const camActions = {
    startRec,
    stopRec
}

export { camActions };