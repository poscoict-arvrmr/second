// @flow
import React, { Component } from 'react';
import mqtt from 'mqtt';
// import { Window, View, Box, Text, Button } from 'react-desktop/macOs';
import styles from './Mymenu.css';
// CameraPage에서 mapDispatchToProps로 Camera 컴포넌트랑 props를 바로 연결해줬기 때문에
// this.props로 액션 access 할 수 있음. 따로 import 할 필요 없음.
import { history } from '../store/configureStore';
import { pi as cameraAddress, mqtt as mqttBrokerAddress } from '../containers/Root';

const client = mqtt.connect('mqtt://'+mqttBrokerAddress+':1883', { clientId: 'camera' });

client.on('message', (topic, message) => {
  console.log('[Mycamera.js]', 'on', 'message', topic, message.toString());
  switch (topic) {
    case 'gesture/state':
      if (message.toString() === 'left') {
        console.log('파일 페이지로 이동합니다.');
        history.push('/myfiles');
      } else if (message.toString() === 'right') {
        console.log('설정 페이지로 이동합니다.');
        history.push('/settings');
      } else {
        console.log('지원하지 않는 제스쳐입니다.');
      }
      return;
    default:
      console.log('[Mycamera.js]', 'No handler for topic ', topic);
  }
});
function callbackUnsubscribe(err) {
  console.log('[Mycamera.js]', 'unsubscribe callback', err);
}
function callbackSubscribe(err, granted) {
  console.log('[Mycamera.js]', 'subscribe callback', err, granted);
}

export default class Mycamera extends Component {
  componentWillMount() {
    if (!client.connected) {
      console.log('[Mycamera.js]', 'componentWillMount', 'reconnect');
      client.reconnect();
    }
    console.log('[Mycamera.js]', 'componentWillMount', 'subscribe');
    client.subscribe('gesture/state', { qos: 0 }, callbackSubscribe);
  }
  componentDidMount() {
    responsiveVoice.speak('음성명령을 통하여 사진을 찍을 수 있습니다', 'Korean Female');
    if (!client.connected) {
      console.log('[Mycamera.js]', 'componentDidMount', 'reconnect');
      client.reconnect();
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (!client.connected) {
      console.log('[Mycamera.js]', 'componentWillUpdate', 'reconnect', nextProps, nextProps);
      client.reconnect();
    }
    console.log('[Mycamera.js]', 'componentWillUpdate', 'subscribe');
    client.subscribe('gesture/state', { qos: 0 }, callbackSubscribe);
  }
  componentDidUpdate(prevProps, prevState) {
    if (!client.connected) {
      console.log('[Mycamera.js]', 'componentDidMount', 'reconnect', prevProps, prevState);
      client.reconnect();
    }
  }
  componentWillUnmount() {
    console.log('[Mycamera.js]', 'componentWillUnmount', 'unsubscribe');
    client.unsubscribe('gesture/state', callbackUnsubscribe);
    client.end();
  }

  // Handle raspberry pi videos and photos actions
  handleImageLoaded() {
    this.refs.mjpeg_dest.src = 'http://'+cameraAddress+'/html/cam_pic.php?time=' + new Date().getTime();
  }

  handleImageErrored() {
    setTimeout(() => {
      this.refs.mjpeg_dest.src = 'http://'+cameraAddress+'/html/cam_pic.php?time=' + new Date().getTime();
    }, 100);
  }

  handleRecordStart() {
    const isRec = this.props.camera.isRecording;
    if(!isRec){
      this.refs.mjpeg_dest.src = 'http://'+cameraAddress+'/html/cmd_pipe.php?cmd=ca%201';
      this.props.startRec();
    } 
    else {
      console.log("Didn't stop previous recording");
    }
  }

  handleRecordStop() {
    const isRec = this.props.camera.isRecording;
    if(isRec){
      this.refs.mjpeg_dest.src = 'http://'+cameraAddress+'/html/cmd_pipe.php?cmd=ca%200';
      this.props.stopRec();
    }
    else {
      console.log("Didn't start any recording yet");
    }
  }

  handleTakePhoto() {
    this.refs.mjpeg_dest.src = 'http://'+cameraAddress+'/html/cmd_pipe.php?cmd=im';
  }

  // handelTimelapseStart() {
  // }

  // handleMotionDetectionStart() {
  // }

  // handleStopCamera() {
  // }

  render() {
    console.log("-----Mycamera component-------");
    let imaSrc = 'http://'+cameraAddress+'/html/loading.jpg';
    return (
      <div className={styles.camScreen}>
        <div>
          <img
            ref="mjpeg_dest"
            onLoad={this.handleImageLoaded.bind(this)}
            onError={this.handleImageErrored.bind(this)}
            src={imaSrc}
            alt=""
            height="350px"
            />
        </div>
        <div>
          <button onClick={this.handleRecordStart.bind(this)} className={styles.camButton}><i className="fa fa-play-circle fa-3x"></i></button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={this.handleRecordStop.bind(this)} className={styles.camButton}><i className="fa fa-stop-circle fa-3x"></i></button>
          &nbsp;&nbsp;&nbsp;
          <button onClick={this.handleTakePhoto.bind(this)} className={styles.camButton}><i className="fa fa-camera fa-3x"></i></button>
        </div>
      </div>
    );
  }
}
