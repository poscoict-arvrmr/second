//reducer - default checker
//actions/defaultChecker.js에서 불러오지 않고 여기에 다 통합해서 시도.
//import {ONLINE_STATUS, OFFLINE_STATUS, LOGIN_OK, LOGIN_NEEDED} from '../actions/defaultChecker';

export type defaultStateType = {
    status : boolean,
    icon : string,
    authed : boolean,
    msg : string
}

//actions
const ONLINE_STATUS = 'ONLINE';
const OFFLINE_STATUS = 'OFFLINE';
const LOGIN_OK = 'LOGIN_OK';
const LOGIN_NEEDED = 'LOGIN_NEEDED';

//action Creators
//몇개만 export 했음. app/index.js 에서 개별적으로 import해서 쓰기때문에.
function online(){
    console.log('[reducer/checker.js]','action','online');
    return {
        type : ONLINE_STATUS
    }
}
function offline(){
    console.log('[reducer/checker.js]','action','offline');
    return {
        type : OFFLINE_STATUS    }
}
export function toggleImage(store, status){
    console.log('[reducer/checker.js]','action','toggleImage', store, status );

    if (status) {
        return store.dispatch(online());
    }else{
        return store.dispatch(offline());
    }
}
export function showHome(user){
    console.log('[reducer/checker.js]','action','login');
    return {
        type : LOGIN_OK
    }
}
export function showLogin(){
    console.log('[reducer/checker.js]','action','logout');
    return {
        type : LOGIN_NEEDED
    }
}

//reducer
const defaultState = {
    status: navigator.onLine,
    icon  : navigator.onLine ? "fa fa-wifi fa-5x" : "fa fa-ban fa-5x",
    authed : false,
    msg   : "Loading internet..."
}
console.log(defaultState);
console.log("------------REDUCER/defaultState---------------");

export default function checker(state=defaultState, action){
    switch(action.type){
        case ONLINE_STATUS :
            console.log('[reducer/checker.js]','reducer','checker', state, action);
            return {
                ...state,
                status:true,
                icon : "fa fa-wifi fa-5x"
            }
        case OFFLINE_STATUS :
            console.log('[reducer/checker.js]','reducer','checker', state, action);
            return {
                ...state,
                status:false,
                icon : "fa fa-ban fa-5x"
            }
        case LOGIN_OK :
            console.log('[reducer/checker.js]','reducer','checker', state, action);
            return {
                ...state,
                authed:true,
                msg : "사용가능합니다."
            }
        case LOGIN_NEEDED :
            console.log('[reducer/checker.js]','reducer','checker', state, action);
            return {
                ...state,
                authed:false,
                msg : "로그인이 필요합니다."
            }
        default :
            return state;
    }
}

//exports

const actionCreators = {
    online,
    offline,
    toggleImage,
    showHome,
    showLogin
}

export { actionCreators };