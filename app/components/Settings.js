// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Mymenu.css';
import mqtt from "mqtt";
import { history } from '../store/configureStore';

const client = mqtt.connect('mqtt://localhost:1883', {clientId:'settings'});
client.on('message', (topic, message) => {
  console.log('[Settings.js]','on', 'message', topic, message.toString());
  switch (topic) {
    case 'gesture/connected':
      return ;
    case 'gesture/state':
      if(message.toString() === 'left'){
        console.log('카메라 페이지로 이동합니다.')
        history.push("/mycamera");
      }else if(message.toString() === 'right'){
        console.log('시작 페이지로 이동합니다.')
        history.push("/");
      }else {
        console.log('지원하지 않는 제스쳐입니다.')
      }
      return ;
  }
  console.log('[Settings.js]','No handler for topic ', topic);
  client.end()
});
function cb_unsubscribe(err){
  console.log('[Settings.js]','unsubscribe callback', err);
}
function cb_subscribe(err,granted){
  console.log('[Settings.js]','subscribe callback', err, granted);
}

export default class Settings extends Component {
  componentWillMount(){
    if(!client.connected){
      console.log('[Settings.js]','componentWillMount','reconnect');
      client.reconnect();
    }
    console.log('[Settings.js]','componentWillMount','subscribe');
    client.subscribe('gesture/state', {qos:0}, cb_subscribe);
  }
  componentWillUpdate(nextProps, nextState){
    if(!client.connected){
      console.log('[Settings.js]','componentWillUpdate','reconnect',nextProps,nextProps);
      client.reconnect();
    }
    console.log('[Settings.js]','componentWillUpdate','subscribe');
    client.subscribe('gesture/state', {qos:0}, cb_subscribe);
  }
  componentWillUnmount(){
    console.log('[Settings.js]','componentWillUnmount','unsubscribe');
    client.unsubscribe('gesture/state',cb_unsubscribe);
    client.end();
  }
  render() {
    return (
      <div className={styles.content}>
         <p>Account</p>
         <p>Wi-fi</p>
         <p>Report</p>
      </div>
    );
  }
  componentDidMount(){
    if(!client.connected){
      console.log('[Settings.js]','componentDidMount','reconnect');
      client.reconnect();
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(!client.connected){
      console.log('[Settings.js]','componentDidMount','reconnect',prevProps, prevState);
      client.reconnect();
    }
  }
}