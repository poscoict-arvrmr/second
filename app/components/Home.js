// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-desktop/macOs';
import styles from './Home.css';
import mqtt from "mqtt";
import { history } from '../store/configureStore';

const client = mqtt.connect('mqtt://localhost:1883', {clientId:'home'});
let authed = false;

//client.on('connect', () => {
//  console.log('[Home.js]','on', 'connect');
//});
client.on('message', (topic, message) => {
  console.log('[Home.js]','on', 'message', topic, message.toString(), authed);
  switch (topic) {
    case 'gesture/connected':
      return ;
    case 'gesture/state':
      if(message.toString() === 'tap' && !authed){
        console.log('로그인 페이지로 이동합니다.')
        history.push("/login");
      }else if(authed && message.toString() === 'left'){
        console.log('설정 페이지로 이동합니다.')
        history.push("/settings");
      }else if(authed && message.toString() === 'right'){
        console.log('파일 페이지로 이동합니다.')
        history.push("/myfiles");
      }else {
        console.log('지원하지 않는 제스쳐입니다.')
      }
      return ;
  }
  console.log('[Home.js]','No handler for topic ', topic);
  client.end()
});
function cb_unsubscribe(err){
  console.log('[Home.js]','unsubscribe callback', err);
}
function cb_subscribe(err,granted){
  console.log('[Home.js]','subscribe callback', err, granted);
}

type Props = {
};

export default class Home extends Component<Props> {
  props: Props;
  componentWillMount(){
    if(!client.connected){
      console.log('[Home.js]','componentWillMount','reconnect');
      client.reconnect();
    }
    console.log('[Home.js]','componentWillMount','subscribe');
    client.subscribe('gesture/state', {qos:0}, cb_subscribe);
  }
  componentWillUpdate(nextProps, nextState){
    if(!client.connected){
      console.log('[Home.js]','componentWillUpdate','reconnect',nextProps,nextProps);
      client.reconnect();
    }
    console.log('[Home.js]','componentWillUpdate','subscribe');
    client.subscribe('gesture/state', {qos:0}, cb_subscribe);
  }
  componentWillUnmount(){
    console.log('[Home.js]','componentWillUnmount','unsubscribe');
    client.unsubscribe('gesture/state',cb_unsubscribe);
    client.end();
  }
  render() {
    console.log('[Home.js]','render', this, this.props, client.options, client.connected);
    authed = this.props.authed;
    return (
    //login하기 전에는 로딩 아이콘, 한 후에는 사용자 아이콘 띄우기
    //{ } 안에서 && 이후의 render파트는 하나의 큰 <div> 로 묶어줘야 함. 
      <div id="home" style={{textAlign:'center'}}>
        {
          this.props.authed && 
          <div>
            <div style={{fontSize:2+'em',marginTop:1+'em'}}>
              <i className="fa fa-user-circle fa-5x"></i>
            </div>
            <div style={{fontSize:4+'em', marginTop:0.5+'em'}}>
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
            <div style={{fontSize:2+'em',marginTop:1+'em'}}>
              <i className="fa fa-spinner fa-pulse fa-5x"></i>
            </div>
            <div style={{fontSize:4+'em',marginTop:0.5+'em'}}>
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
  componentDidMount(){
    if(!client.connected){
      console.log('[Home.js]','componentDidMount','reconnect');
      client.reconnect();
    }
  }
  componentDidUpdate(prevProps, prevState){
    if(!client.connected){
      console.log('[Home.js]','componentDidMount','reconnect',prevProps, prevState);
      client.reconnect();
    }
  }
}
