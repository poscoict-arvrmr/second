// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-desktop/macOs';
import styles from './Home.css';
import mqtt from "mqtt";
import { history } from '../store/configureStore';

const client = mqtt.connect('mqtt://localhost:1883', {clientId:'home'});

client.on('message', (topic, message) => {
  console.log('[Home.js]','on', 'message', topic, message.toString());
  switch (topic) {
    case 'gesture/connected':
      return ;
    case 'gesture/state':
      if(message.toString() === 'tap'){
        console.log('로그인 페이지로 이동합니다.')
        history.push("/login");
      }else {
        console.log('지원하지 않는 제스쳐입니다.')
      }
      return ;
  }
  console.log('[Home.js]','No handler for topic ', topic);
  client.end()
});
client.on('connect', () => {
  console.log('[Home.js]','on', 'connect');
  client.subscribe('gesture/state', {qos:0}, cb_subscribe);
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
  componentWillUnmount(){
    console.log('[Home.js]','componentWillUnmount','unsubscribe');
    client.unsubscribe('gesture/state',cb_unsubscribe);
  }
  render() {
    console.log('[Home.js]','render', this, this.props, client.options);
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
}
