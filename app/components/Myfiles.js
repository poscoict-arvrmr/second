// @flow
import React, { Component } from 'react';
import mqtt from 'mqtt';
import styles from './Mymenu.css';
import { history } from '../store/configureStore';
import { mqtt as mqttBrokerAddress } from '../containers/Root';

const client = mqtt.connect('mqtt://'+mqttBrokerAddress+':1883', { clientId: 'files' });
client.on('message', (topic, message) => {
  console.log('[MyFiles.js]', 'on', 'message', topic, message.toString());
  switch (topic) {
    case 'gesture/state':
      if (message.toString() === 'left') {
        console.log('시작 페이지로 이동합니다.');
        history.push('/');
      } else if (message.toString() === 'right') {
        console.log('카메라 페이지로 이동합니다.');
        history.push('/mycamera');
      } else {
        console.log('지원하지 않는 제스쳐입니다.');
      }
      return;
    default:
      console.log('[MyFiles.js]', 'No handler for topic ', topic);
  }
});
function callbackUnsubscribe(err) {
  console.log('[MyFiles.js]', 'unsubscribe callback', err);
}
function callbackSubscribe(err, granted) {
  console.log('[MyFiles.js]', 'subscribe callback', err, granted);
}

export default class MyFiles extends Component {
  componentWillMount() {
    if (!client.connected) {
      console.log('[MyFiles.js]', 'componentWillMount', 'reconnect');
      client.reconnect();
    }
    console.log('[MyFiles.js]', 'componentWillMount', 'subscribe');
    client.subscribe('gesture/state', { qos: 0 }, callbackSubscribe);
  }
  componentDidMount() {
    if (!client.connected) {
      console.log('[MyFiles.js]', 'componentDidMount', 'reconnect');
      client.reconnect();
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (!client.connected) {
      console.log('[MyFiles.js]', 'componentWillUpdate', 'reconnect', nextProps, nextProps);
      client.reconnect();
    }
    console.log('[MyFiles.js]', 'componentWillUpdate', 'subscribe');
    client.subscribe('gesture/state', { qos: 0 }, callbackSubscribe);
  }
  componentDidUpdate(prevProps, prevState) {
    if (!client.connected) {
      console.log('[MyFiles.js]', 'componentDidMount', 'reconnect', prevProps, prevState);
      client.reconnect();
    }
  }
  componentWillUnmount() {
    console.log('[MyFiles.js]', 'componentWillUnmount', 'unsubscribe');
    client.unsubscribe('gesture/state', callbackUnsubscribe);
    client.end();
  }
  render() {
    return (
      <div className={styles.content}>
        <p>Photos</p>
        <p>Videos</p>
        <p>Documents</p>
      </div>
    );
  }
}
