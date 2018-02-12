// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import mqtt from 'mqtt';
import { history } from '../store/configureStore';
import { mqtt as mqttBrokerAddress } from '../containers/Root';

let client = null;

function callbackUnsubscribe(err) {
  console.log('[Home.js]', 'unsubscribe callback', err);
}
function callbackSubscribe(err, granted) {
  console.log('[Home.js]', 'subscribe callback', err, granted);
}

type Props = {
  authed: boolean,
  msg: string
};

export default class Home extends Component<Props> {
  props: Props;
  componentWillMount() {
    if (client === null) {
      console.log('[Home.js]', 'componentWillMount', 'client create');
      client = mqtt.connect(`mqtt://${mqttBrokerAddress}:1883`, { clientId: 'home' });
      client.on('message', (topic, message) => {
        console.log('[Home.js]', 'on', 'message', topic, message.toString(), this.props.authed);
        switch (topic) {
          case 'gesture/state':
            if (message.toString() === 'double tap' && !this.props.authed) {
              window.responsiveVoice.speak('로그인 페이지로 이동합니다.', 'Korean Female');
              console.log('로그인 페이지로 이동합니다.');
              history.push('/login');
            } else if (this.props.authed && message.toString() === 'left') {
              window.responsiveVoice.speak('설정 페이지로 이동합니다.', 'Korean Female');
              console.log('설정 페이지로 이동합니다.');
              history.push('/settings');
            } else if (this.props.authed && message.toString() === 'right') {
              window.responsiveVoice.speak('파일 페이지로 이동합니다.', 'Korean Female');
              console.log('파일 페이지로 이동합니다.');
              history.push('/myfiles');
            } else {
              console.log('지원하지 않는 제스쳐입니다.');
            }
            return;
          case 'voice/command':
            if (message.toString() === '로그인' && !this.props.authed) {
              window.responsiveVoice.speak('로그인 페이지로 이동합니다.', 'Korean Female');
              console.log('로그인 페이지로 이동합니다.');
              history.push('/login');
            } else if (this.props.authed && message.toString() === '이전 메뉴로') {
              window.responsiveVoice.speak('설정 페이지로 이동합니다.', 'Korean Female');
              console.log('설정 페이지로 이동합니다.');
              history.push('/settings');
            } else if (this.props.authed && message.toString() === '다음 메뉴로') {
              window.responsiveVoice.speak('파일 페이지로 이동합니다.', 'Korean Female');
              console.log('파일 페이지로 이동합니다.');
              history.push('/myfiles');
            } else {
              console.log('지원하지 않는 제스쳐입니다.');
            }
            return;
          default:
            console.log('[Home.js]', 'No handler for topic ', topic);
        }
      });
    }
    if (!client.connected) {
      console.log('[Home.js]', 'componentWillMount', 'reconnect');
      client.reconnect();
    }
    console.log('[Home.js]', 'componentWillMount', 'subscribe');
    client.subscribe('gesture/state', { qos: 0 }, callbackSubscribe);
    client.subscribe('voice/command', { qos: 0 }, callbackSubscribe);
  }
  componentDidMount() {
    if (!client.connected) {
      console.log('[Home.js]', 'componentDidMount', 'reconnect');
      client.reconnect();
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (!client.connected) {
      console.log('[Home.js]', 'componentWillUpdate', 'reconnect', nextProps, nextState);
      client.reconnect();
    }
    console.log('[Home.js]', 'componentWillUpdate', 'subscribe');
    client.subscribe('gesture/state', { qos: 0 }, callbackSubscribe);
    client.subscribe('voice/command', { qos: 0 }, callbackSubscribe);
  }
  componentDidUpdate(prevProps, prevState) {
    if (!client.connected) {
      console.log('[Home.js]', 'componentDidUpdate', 'reconnect', prevProps, prevState);
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
    console.log('[Home.js]', 'render', this, this.props, client.options, client.connected, client);
    window.responsiveVoice.speak(this.props.msg, 'Korean Female');
    return (
    // login하기 전에는 로딩 아이콘, 한 후에는 사용자 아이콘 띄우기
    // {} 안에서 && 이후의 render파트는 하나의 큰 <div> 로 묶어줘야 함.
      <div id="home" className="child" style={{ textAlign: 'center' }}>
        {
          this.props.authed &&
          <div>
            <div style={{ marginTop: '1em' }}>
              <i className="fa fa-user-circle fa-5x" />
            </div>
            <div style={{ marginTop: '0.5em' }}>
              {this.props.msg}
            </div>
          </div>
        }
        {
          !this.props.authed &&
          <div>
            <div style={{ marginTop: '1em' }}>
              <Link to="/login">
                <i className="fa fa-spinner fa-pulse fa-5x" />
              </Link>
            </div>
            <div style={{ marginTop: '0.5em' }}>
              {this.props.msg}
            </div>
          </div>
        }
      </div>
    );
  }
}
