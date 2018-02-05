// @flow
import React, { Component } from 'react';
import mqtt from 'mqtt';
import { firebase } from '../utils/firebase';
import styles from './Mymenu.css';
import { history } from '../store/configureStore';

const client = mqtt.connect('mqtt://localhost:1883', { clientId: 'login' });
client.on('message', (topic, message) => {
  console.log('[Login.js]', 'on', 'message', topic, message.toString());
  switch (topic) {
    case 'gesture/state':
      if (message.toString() === 'double tap') {
        console.log('홈 페이지로 이동합니다.');
        firebase.auth().signInWithEmailAndPassword('fairies@poscoict.com', '123456').then(() => history.push('/')).catch(err => {
          // firebase.auth().signInWithEmailAndPassword(this.email.value, this.pw.value)
          console.log('로그인 오류입니다.', err);
        });
      } else {
        console.log('지원하지 않는 제스쳐입니다.');
      }
      return;
    default:
      console.log('[Login.js]', 'No handler for topic ', topic);
  }
});
function callbackUnsubscribe(err) {
  console.log('[Login.js]', 'unsubscribe callback', err);
}
function callbackSubscribe(err, granted) {
  console.log('[Login.js]', 'subscribe callback', err, granted);
}

type Props = {};
export default class Login extends Component<Props> {
  props: Props;
  componentWillMount() {
    if (!client.connected) {
      console.log('[Login.js]', 'componentWillMount', 'reconnect');
      client.reconnect();
    }
    console.log('[Login.js]', 'componentWillMount', 'subscribe');
    client.subscribe('gesture/state', { qos: 0 }, callbackSubscribe);
  }
  componentDidUpdate() {
    if (!client.connected) {
      console.log('[Login.js]', 'componentDidUpdate', 'reconnect');
      client.reconnect();
    }
    console.log('[Login.js]', 'componentDidUpdate', 'subscribe');
    client.subscribe('gesture/state', { qos: 0 }, callbackSubscribe);
  }
  componentWillUnmount() {
    console.log('[Login.js]', 'componentWillUnmount', 'unsubscribe');
    client.unsubscribe('gesture/state', callbackUnsubscribe);
    client.end();
  }
  handleSubmit = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.email.value, this.pw.value).then(() => history.push('/')).catch(error => {
      console.log('로그인 오류입니다.', error);
    });
  }
  render() {
    console.log('[Login.js]', 'render', this, this.props, client.options, client.connected);
    return (
      <div className={styles.login}>
        <h1> Log-in </h1>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.login}>
            <label>ID &nbsp;&nbsp;&nbsp;</label>
            <input ref={(email) => this.email = email} placeholder="Email" />
          </div>
          <div className={styles.login}>
            <label>PW &nbsp;&nbsp;</label>
            <input type="password" placeholder="Password" ref={(pw) => this.pw = pw} />
          </div>
          <button type="submit">Log-in</button>
        </form>
      </div>
    );
  }
}
