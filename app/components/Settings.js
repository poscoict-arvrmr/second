// @flow
import React, { Component } from 'react';
import mqtt from 'mqtt';
// import styles from './Mymenu.css';
import { history } from '../store/configureStore';
import { mqtt as mqttBrokerAddress } from '../containers/Root';

let client = null;

function callbackUnsubscribe(err) {
  console.log('[Settings.js]', 'unsubscribe callback', err);
}
function callbackSubscribe(err, granted) {
  console.log('[Settings.js]', 'subscribe callback', err, granted);
}

export default class Settings extends Component {
  componentWillMount() {
    if (client === null) {
      console.log('[Settings.js]', 'componentWillMount', 'client create');
      client = mqtt.connect(`mqtt://${mqttBrokerAddress}:1883`, { clientId: 'settings' });
      client.on('message', (topic, message) => {
        console.log('[Settings.js]', 'on', 'message', topic, message.toString());
        switch (topic) {
          case 'gesture/state':
            if (message.toString() === 'left') {
              window.responsiveVoice.speak('카메라 페이지로 이동합니다.', 'Korean Female');
              console.log('카메라 페이지로 이동합니다.');
              history.push('/mycamera');
            } else if (message.toString() === 'right') {
              window.responsiveVoice.speak('시작 페이지로 이동합니다.', 'Korean Female');
              console.log('시작 페이지로 이동합니다.');
              history.push('/');
            } else {
              console.log('지원하지 않는 제스쳐입니다.');
            }
            return;
          case 'voice/command':
            if (message.toString() === '이전메뉴') {
              window.responsiveVoice.speak('카메라 페이지로 이동합니다.', 'Korean Female');
              console.log('카메라 페이지로 이동합니다.');
              history.push('/mycamera');
            } else if (message.toString() === '다음메뉴') {
              window.responsiveVoice.speak('시작 페이지로 이동합니다.', 'Korean Female');
              console.log('시작 페이지로 이동합니다.');
              history.push('/');
            } else if (message.toString() === '파일') {
              window.responsiveVoice.speak('파일 페이지로 이동합니다.', 'Korean Female');
              console.log('파일 페이지로 이동합니다.');
              history.push('/myfiles');
            } else if (message.toString() === '카메라') {
              window.responsiveVoice.speak('카메라 페이지로 이동합니다.', 'Korean Female');
              console.log('카메라 페이지로 이동합니다.');
              history.push('/mycamera');
            } else {
              console.log('지원하지 않는 제스쳐입니다.');
            }
            return;
          default:
            console.log('[Settings.js]', 'No handler for topic ', topic);
        }
      });
    }
    if (!client.connected) {
      console.log('[Settings.js]', 'componentWillMount', 'reconnect');
      client.reconnect();
    }
    console.log('[Settings.js]', 'componentWillMount', 'subscribe');
    client.subscribe('gesture/state', { qos: 0 }, callbackSubscribe);
    client.subscribe('voice/command', { qos: 0 }, callbackSubscribe);
  }
  componentDidMount() {
    if (!client.connected) {
      console.log('[Settings.js]', 'componentDidMount', 'reconnect');
      client.reconnect();
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (!client.connected) {
      console.log('[Settings.js]', 'componentWillUpdate', 'reconnect', nextProps, nextState);
      client.reconnect();
    }
    console.log('[Settings.js]', 'componentWillUpdate', 'subscribe');
    client.subscribe('gesture/state', { qos: 0 }, callbackSubscribe);
    client.subscribe('voice/command', { qos: 0 }, callbackSubscribe);
  }
  componentDidUpdate(prevProps, prevState) {
    if (!client.connected) {
      console.log('[Settings.js]', 'componentDidUpdate', 'reconnect', prevProps, prevState);
      client.reconnect();
    }
  }
  componentWillUnmount() {
    console.log('[Settings.js]', 'componentWillUnmount', 'unsubscribe');
    client.unsubscribe('gesture/state', callbackUnsubscribe);
    client.unsubscribe('voice/command', callbackUnsubscribe);
    client.end();
    client = null;
  }
  render() {
    return (
      <div id="settings" className="child">
        <div style={
          {
            marginTop: '1em', float: 'left', padding: '20px', marginLeft: '2em'
          }
        }
        >
          <i className="fa fa-cog fa-5x" />
        </div>
        <div style={
          {
            position: 'absolute', right: '2em', top: '0.5em', marginRight: '2em'
          }
        }
        >
          <p style={{ border: '2px solid #7aa2ff', borderRadius: '15px', margin: '20px', padding: '15px', backgroundColor: '#2b3b5f'}}>Account</p>
          <p style={{ border: '2px solid #7aa2ff', borderRadius: '15px', margin: '20px', padding: '15px', backgroundColor: '#2b3b5f'}}>Wi-fi</p>
          <p style={{ border: '2px solid #7aa2ff', borderRadius: '15px', margin: '20px', padding: '15px', backgroundColor: '#2b3b5f'}}>Report</p>
        </div>
      </div>
    );
  }
}
