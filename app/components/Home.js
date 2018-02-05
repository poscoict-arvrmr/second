// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-desktop/macOs';
import mqtt from 'mqtt';
import { history } from '../store/configureStore';
import { mqtt as mqttBrokerAddress } from '../containers/Root';

let client = null;
let authed = false;

function callbackUnsubscribe(err) {
  console.log('[Home.js]', 'unsubscribe callback', err);
}
function callbackSubscribe(err, granted) {
  console.log('[Home.js]', 'subscribe callback', err, granted);
}

type Props = {
};

export default class Home extends Component<Props> {
  props: Props;
  componentWillMount() {
    if ( client === null ){
      console.log('[Home.js]', 'componentWillMount', 'client create');
      client = mqtt.connect('mqtt://'+mqttBrokerAddress+':1883', { clientId: 'home' });
      client.on('message', (topic, message) => {
        console.log('[Home.js]', 'on', 'message', topic, message.toString(), authed);
        switch (topic) {
          case 'gesture/state':
            if (message.toString() === 'double tap' && !authed) {
              console.log('로그인 페이지로 이동합니다.');
              history.push('/login');
            } else if (authed && message.toString() === 'left') {
              console.log('설정 페이지로 이동합니다.');
              history.push('/settings');
            } else if (authed && message.toString() === 'right') {
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
  }
  componentDidMount() {
    if (!client.connected) {
      console.log('[Home.js]', 'componentDidMount', 'reconnect');
      client.reconnect();
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (!client.connected) {
      console.log('[Home.js]', 'componentWillUpdate', 'reconnect', nextProps, nextProps);
      client.reconnect();
    }
    console.log('[Home.js]', 'componentWillUpdate', 'subscribe');
    client.subscribe('gesture/state', { qos: 0 }, callbackSubscribe);
  }
  componentDidUpdate(prevProps, prevState) {
    if (!client.connected) {
      console.log('[Home.js]', 'componentDidMount', 'reconnect', prevProps, prevState);
      client.reconnect();
    }
  }
  componentWillUnmount() {
    console.log('[Settings.js]', 'componentWillUnmount', 'unsubscribe');
    client.unsubscribe('gesture/state', callbackUnsubscribe);
    client.end();
    client = null;
  }
  render() {
    console.log('[Home.js]', 'render', this, this.props, client.options, client.connected, client);
    authed = this.props.authed;
    return (
    // login하기 전에는 로딩 아이콘, 한 후에는 사용자 아이콘 띄우기
    // {} 안에서 && 이후의 render파트는 하나의 큰 <div> 로 묶어줘야 함.
      <div id="home" style={{ textAlign: 'center' }}>
        {
          this.props.authed &&
          <div>
            <div style={{ fontSize: '2em', marginTop: '1em' }}>
              <i className="fa fa-user-circle fa-5x" />
            </div>
            <div style={{ fontSize: '4em', marginTop: '0.5em' }}>
              {this.props.msg}
            </div>
            <Link to="/">
              <Button color="gray" onClick={() => console.log('Clicked!')} size="30" paddingLeft="20px" paddingRight="20px" margin="20px">
                Start
              </Button>
            </Link>
          </div>
        }
        {
          !this.props.authed &&
          <div>
            <div style={{ fontSize: '2em', marginTop: '1em' }}>
              <i className="fa fa-spinner fa-pulse fa-5x" />
            </div>
            <div style={{ fontSize: '4em', marginTop: '0.5em' }}>
              {this.props.msg}
            </div>
            <Link to="/login">
              <Button color="gray" size="30" paddingLeft="20px" paddingRight="20px" margin="20px">
                Log in
              </Button>
            </Link>
          </div>
        }
      </div>
    );
  }
}
