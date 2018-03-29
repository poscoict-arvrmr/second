// @flow
import React, { Component } from 'react';
import mqtt from 'mqtt';
// import styles from './Mymenu.css';
import { history } from '../store/configureStore';
import { mqtt as mqttBrokerAddress } from '../containers/Root';

let client = null;

function callbackUnsubscribe(err) {
  console.log('[MyFiles.js]', 'unsubscribe callback', err);
}
function callbackSubscribe(err, granted) {
  console.log('[MyFiles.js]', 'subscribe callback', err, granted);
}

type Props = {
  menu: string
};

export default class MyFiles extends Component {
  props: Props;
  componentWillMount() {
    if (client === null) {
      console.log('[MyFiles.js]', 'componentWillMount', 'client create');
      client = mqtt.connect(`mqtt://${mqttBrokerAddress}:1883`, { clientId: 'files' });
      client.on('message', (topic, message) => {
        console.log('[MyFiles.js]', 'on', 'message', topic, message.toString());
        switch (topic) {
          case 'gesture/state':
            if (message.toString() === 'left') {
              window.responsiveVoice.speak('시작 페이지로 이동합니다.', 'Korean Female');
              console.log('시작 페이지로 이동합니다.');
              history.push('/');
            } else if (message.toString() === 'right') {
              window.responsiveVoice.speak('카메라 페이지로 이동합니다.', 'Korean Female');
              console.log('카메라 페이지로 이동합니다.');
              history.push('/mycamera');
            } else {
              console.log('지원하지 않는 제스쳐입니다.');
            }
            return;
          case 'voice/command':
            if (message.toString() === '이전 메뉴로') {
              window.responsiveVoice.speak('시작 페이지로 이동합니다.', 'Korean Female');
              console.log('시작 페이지로 이동합니다.');
              history.push('/');
            } else if (message.toString() === '다음 메뉴로') {
              window.responsiveVoice.speak('카메라 페이지로 이동합니다.', 'Korean Female');
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
    }
    if (!client.connected) {
      console.log('[MyFiles.js]', 'componentWillMount', 'reconnect');
      client.reconnect();
    }
    console.log('[MyFiles.js]', 'componentWillMount', 'subscribe');
    client.subscribe('gesture/state', { qos: 0 }, callbackSubscribe);
    client.subscribe('voice/command', { qos: 0 }, callbackSubscribe);
  }
  componentDidMount() {
    if (!client.connected) {
      console.log('[MyFiles.js]', 'componentDidMount', 'reconnect');
      client.reconnect();
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (!client.connected) {
      console.log('[MyFiles.js]', 'componentWillUpdate', 'reconnect', nextProps, nextState);
      client.reconnect();
    }
    console.log('[MyFiles.js]', 'componentWillUpdate', 'subscribe');
    client.subscribe('gesture/state', { qos: 0 }, callbackSubscribe);
    client.subscribe('voice/command', { qos: 0 }, callbackSubscribe);
  }
  componentDidUpdate(prevProps, prevState) {
    if (!client.connected) {
      console.log('[MyFiles.js]', 'componentDidUpdate', 'reconnect', prevProps, prevState);
      client.reconnect();
    }
  }
  componentWillUnmount() {
    console.log('[MyFiles.js]', 'componentWillUnmount', 'unsubscribe');
    client.unsubscribe('gesture/state', callbackUnsubscribe);
    client.unsubscribe('voice/command', callbackUnsubscribe);
    client.end();
    client = null;
  }
  render() {
    return (
      <div id="files" className="child">
        <div style={
          {
            marginTop: '1em', float: 'left', padding: '20px', marginLeft: '2em'
          }
        }
        >
          <i className="fa fa-files-o fa-5x" />
        </div>
        <div style={
          {
            position: 'absolute', right: '2em', top: '0.5em', marginRight: '2em'
          }
        }
        >
          {
            this.props.menu === 'photo' &&
            <p>
              <i className="fa fa-angle-double-right faa-passing animated" />
              <span style={{ width: '0.5em' }}>&nbsp;</span>
              Photos
              <span style={{ width: '0.5em' }}>&nbsp;</span>
              <i className="fa fa-angle-double-left faa-passing-reverse animated" />
            </p>
          }
          {
            !(this.props.menu === 'photo') &&
            <p>Photos</p>
          }
          {
            this.props.menu === 'video' &&
            <p>
              <i className="fa fa-angle-double-right faa-passing animated" />
              <span style={{ width: '0.5em' }}>&nbsp;</span>
              Videos
              <span style={{ width: '0.5em' }}>&nbsp;</span>
              <i className="fa fa-angle-double-left faa-passing-reverse animated" />
            </p>
          }
          {
            !(this.props.menu === 'video') &&
            <p>Videos</p>
          }
          {
            this.props.menu === 'document' &&
            <p>
              <i className="fa fa-angle-double-right faa-passing animated" />
              <span style={{ width: '0.5em' }}>&nbsp;</span>
              Documents
              <span style={{ width: '0.5em' }}>&nbsp;</span>
              <i className="fa fa-angle-double-left faa-passing-reverse animated" />
            </p>
          }
          {
            !(this.props.menu === 'document') &&
            <p>Documents</p>
          }
        </div>
      </div>
    );
  }
}
