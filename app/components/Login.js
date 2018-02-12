// @flow
import React, { Component } from 'react';
import mqtt from 'mqtt';
import { firebase } from '../utils/firebase';
// import styles from './Mymenu.css';
import { history } from '../store/configureStore';
import { mqtt as mqttBrokerAddress } from '../containers/Root';
import { Button } from 'react-desktop/windows';

let client = null;

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
    if (client === null) {
      console.log('[Login.js]', 'componentWillMount', 'client create');
      client = mqtt.connect(`mqtt://${mqttBrokerAddress}:1883`, { clientId: 'login' });
      client.on('message', (topic, message) => {
        console.log('[Login.js]', 'on', 'message', topic, message.toString());
        switch (topic) {
          case 'gesture/state':
            if (message.toString() === 'double tap') {
              firebase.auth().signInWithEmailAndPassword('fairies@poscoict.com', '123456').then(() => {
                console.log('홈 페이지로 이동합니다.');
                history.push('/');
                return 0;
              }).catch(err => {
                // firebase.auth().signInWithEmailAndPassword(this.email.value, this.pw.value)
                console.log('로그인 오류입니다.', err);
              });
            } else {
              console.log('지원하지 않는 제스쳐입니다.');
            }
            return;
          case 'voice/command':
            if (message.toString() === '로그인') {
              firebase.auth().signInWithEmailAndPassword('fairies@poscoict.com', '123456').then(() => {
                console.log('홈 페이지로 이동합니다.');
                history.push('/');
                return 0;
              }).catch(err => {
                window.responsiveVoice.speak('로그인 오류입니다.', 'Korean Female');
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
    }
    if (!client.connected) {
      console.log('[Login.js]', 'componentWillMount', 'reconnect');
      client.reconnect();
    }
    console.log('[Login.js]', 'componentWillMount', 'subscribe');
    client.subscribe('gesture/state', { qos: 0 }, callbackSubscribe);
    client.subscribe('voice/command', { qos: 0 }, callbackSubscribe);
  }
  componentDidMount() {
    if (!client.connected) {
      console.log('[Login.js]', 'componentDidMount', 'reconnect');
      client.reconnect();
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (!client.connected) {
      console.log('[Login.js]', 'componentWillUpdate', 'reconnect', nextProps, nextState);
      client.reconnect();
    }
    console.log('[Login.js]', 'componentWillUpdate', 'subscribe');
    client.subscribe('gesture/state', { qos: 0 }, callbackSubscribe);
    client.subscribe('voice/command', { qos: 0 }, callbackSubscribe);
  }
  componentDidUpdate(prevProps, prevState) {
    if (!client.connected) {
      console.log('[Login.js]', 'componentDidUpdate', 'reconnect', prevProps, prevState);
      client.reconnect();
    }
    console.log('[Login.js]', 'componentDidUpdate', 'subscribe');
  }
  componentWillUnmount() {
    console.log('[Login.js]', 'componentWillUnmount', 'unsubscribe');
    client.unsubscribe('gesture/state', callbackUnsubscribe);
    client.unsubscribe('voice/command', callbackUnsubscribe);
    client.end();
    client = null;
  }
  handleSubmit = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.email.value, this.pw.value).then(() => {
      console.log('홈 페이지로 이동합니다.');
      history.push('/');
      return 0;
    }).catch(error => {
      console.log('로그인 오류입니다.', error);
    });
  }
  render() {
    console.log('[Login.js]', 'render', this, this.props, client.options, client.connected);
    return (
      <div id="login" className="child" style={{ clear: 'both', textAlign: 'center', marginTop: '70px' }}>
        <form onSubmit={this.handleSubmit}>
          <div style={{ margin: '10px'}}>
            <label style={{ verticalAlign: 'middle' }}>ID : </label>
            <input style={{ verticalAlign: 'middle', width: '10em', fontSize: '1em' }} ref={(email) => this.email = email} placeholder="Email" />
          </div>
          <div style={{ margin: '10px' }}>
            <label style={{ verticalAlign: 'middle' }}>PW : </label>
            <input style={{ verticalAlign: 'middle', width: '10em', fontSize: '1em' }} type="password" placeholder="Password" ref={(pw) => this.pw = pw} />
          </div>
          <div style={{ margin: '10px' }}>
            <Button push color="#78A1FF" type="submit">LOG IN</Button>
          </div>
        </form>
      </div>
    );
  }
}
