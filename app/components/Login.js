// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebase } from '../utils/firebase';
import styles from './Mymenu.css';
import mqtt from "mqtt";
import { history } from '../store/configureStore';

//const client = mqtt.connect('mqtt://localhost');
const client = mqtt.connect('mqtt://localhost:1883',{clientId:'login'});
//const client = mqtt.connect('mqtt://test.mosquitto.org');
//const client = mqtt.connect('mqtt://broker.hivemq.com');
client.on('message', (topic, message) => {
  console.log('[Login.js]','on', 'message', topic, message.toString());
  switch (topic) {
    case 'gesture/connected':
      return ;
    case 'gesture/state':
      if(message.toString() === 'tap'){
        console.log('홈 페이지로 이동합니다.')
        firebase.auth().signInWithEmailAndPassword('fairies@poscoict.com', '123456').catch(error => {
//      firebase.auth().signInWithEmailAndPassword(this.email.value, this.pw.value).catch(error => {
          this.setState({loginMessage: 'Invalid username/password.'})
        })
        history.push("/");
      }else {
        console.log('지원하지 않는 제스쳐입니다.')
      }
      return ;
  }
  console.log('[Login.js]','No handler for topic ', topic);
  client.end();
});
client.on('connect', () => {
  console.log('[Login.js]','on', 'connect');
  client.subscribe('gesture/state', {qos:0}, cb_subscribe);
});    

function cb_unsubscribe(err){
  console.log('[Login.js]','unsubscribe callback', err);
}
function cb_subscribe(err,granted){
  console.log('[Login.js]','subscribe callback', err, granted);
}

type Props = {};

export default class Login extends Component<Props> {
  props: Props;
  componentWillUnmount(){
    console.log('[Login.js]','componentWillUnmount','unsubscribe');
    client.unsubscribe('gesture/state',cb_unsubscribe);
  }
  handleSubmit = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.email.value, this.pw.value).catch(error => {
      this.setState({loginMessage: 'Invalid username/password.'})
    })
  }
  render() {
    console.log('[Login.js]','render', this, this.props, client.options);
    return (
      <div className={styles.login}>
        <h1> Log-in </h1>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.login}>
            <label>ID &nbsp;&nbsp;&nbsp;</label>
            <input ref={(email) => this.email = email} placeholder="Email"/>
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
