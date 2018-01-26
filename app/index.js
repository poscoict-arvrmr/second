import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';
import Root from './containers/Root';
import { configureStore, history } from './store/configureStore';
import './app.global.css';
import { firebase } from './utils/firebase';
import { showHome, showLogin, online, offline } from './actions/defaultChecker';

// 
// store는 createStore()를 호출해서 생성한다. 
// createStore()의 인자는 3가지가 가능하다. 
// 
// # createStore(reducer, [preloadedState], [enhancer]) 
//
// createStore()를 사용하기 위해서는 redux가 필요함. 함수를 가져올때는 import {function_name} 형태의 문법으로.
// import { createStore } from 'redux';
// - https://redux.js.org/docs/api/createStore.html
const store = configureStore();
window.addEventListener('online', (e) => {
  console.log('[index.js]','online 입니다.', store.getState().checker);
  store.dispatch(online());
  //store.dispatch(toggleImage(store,true));
});
window.addEventListener('offline', (e) => {
  console.log('[index.js]','offline 입니다.', store.getState().checker);
  store.dispatch(offline());
  //store.dispatch(toggleImage(store,false));
});
// configureStore.dev.js 와 configureStore.prod.js 에서는 첫번재 인자인 reducer를 넘길때 combineReducers() 가 사용함.
// - https://redux.js.org/docs/api/combineReducers.html

console.log('[index.js]', 'store', store);
console.log('[index.js]', 'store.getState()', store.getState());







// ReactDOM.render(element, container[, callback]) 형태로 사용함. 
// AppConainter 를 통해 application을 감싸야 한다. 
// - http://gaearon.github.io/react-hot-loader/getstarted/ 
// element는 Babel 를 통해 browser에서 인식 가능한 script로 변환해줘야 한다. 
// webpack.config.js 에 babel-loader가 있음. 
// presets 으로 react와 env 를 추가해야함. ( .babelrc 파일 참고 )
//
// import 문이 다음과 같을 경우 ReactDOM.render(element, container)로 코딩함. 
/*
import ReactDOM from 'react-dom';
ReactDOM.render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);
*/
// import 문이 import { render } from 'react-dom'; 이므로 다음과 같이 코딩함
render(
  <AppContainer>
    <Root store={store} history={history} />
  </AppContainer>,
  document.getElementById('root')
);
// Root 컴포넌트를 사용하고 있음. 이후 파일을 export 가 사용되고 있을 것임.
// Root 은 store와 histroy를 props 로 갖게 됨.


if (module.hot) {
  module.hot.accept('./containers/Root', () => {
    const NextRoot = require('./containers/Root'); // eslint-disable-line global-require
    render(
      <AppContainer>
        <NextRoot store={store} history={history} />
      </AppContainer>,
      document.getElementById('root')
    );
  });
}

firebase.auth().onAuthStateChanged( (user) => {
  if(user){
    console.log('[index.js]','log in');
    setTimeout(() => {
      history.push("/");
      store.dispatch(showHome(user));
    }, 1000);
  }else{
    console.log('[index.js]','log out');
    setTimeout(() => {
      store.dispatch(showLogin());
    }, 1000);
  }
});
