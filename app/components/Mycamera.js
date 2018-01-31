// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Mymenu.css';
//CameraPage에서 mapDispatchToProps로 Camera 컴포넌트랑 props를 바로 연결해줬기 때문에
//this.props로 액션 access 할 수 있음. 따로 import 할 필요 없음.
import mqtt from "mqtt";
import { history } from '../store/configureStore';

const client = mqtt.connect('mqtt://localhost:1883', {clientId:'camera'});
client.on('message', (topic, message) => {
  console.log('[Mycamera.js]','on', 'message', topic, message.toString());
  switch (topic) {
    case 'gesture/connected':
      return ;
    case 'gesture/state':
      if(message.toString() === 'left'){
        console.log('파일 페이지로 이동합니다.')
        history.push("/myfiles");
      }else if(message.toString() === 'right'){
        console.log('설정 페이지로 이동합니다.')
        history.push("/settings");
      }else {
        console.log('지원하지 않는 제스쳐입니다.')
      }
      return ;
  }
  console.log('[Mycamera.js]','No handler for topic ', topic);
  client.end()
});
function cb_unsubscribe(err){
  console.log('[Mycamera.js]','unsubscribe callback', err);
}
function cb_subscribe(err,granted){
  console.log('[Mycamera.js]','subscribe callback', err, granted);
}

export default class Mycamera extends Component {
  componentWillMount(){
    if(!client.connected){
      console.log('[Mycamera.js]','componentWillMount','reconnect');
      client.reconnect();
    }
    console.log('[Mycamera.js]','componentWillMount','subscribe');
    client.subscribe('gesture/state', {qos:0}, cb_subscribe);
  }
  componentWillUpdate(nextProps, nextState){
    if(!client.connected){
      console.log('[Mycamera.js]','componentWillUpdate','reconnect',nextProps,nextProps);
      client.reconnect();
    }
    console.log('[Mycamera.js]','componentWillUpdate','subscribe');
    client.subscribe('gesture/state', {qos:0}, cb_subscribe);
  }
  componentWillUnmount(){
    console.log('[Mycamera.js]','componentWillUnmount','unsubscribe');
    client.unsubscribe('gesture/state',cb_unsubscribe);
    client.end();
  }
  render() {
    console.log("-----Mycamera component-------");
    return (
        <div className={styles.content}>
          <p>Take a Photo</p>
          <p>Record a Video</p>
          <button onClick={this.props.startRec}>Start Recording</button>
          <button onClick={this.props.stopRec}>Stop Recording</button>
          <p>Motion Capture</p>
        </div>
    );
  }
  componentDidMount(){
    if(!client.connected){
      console.log('[Mycamera.js]','componentDidMount','reconnect');
      client.reconnect();
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(!client.connected){
      console.log('[Mycamera.js]','componentDidMount','reconnect',prevProps, prevState);
      client.reconnect();
    }
  }
}