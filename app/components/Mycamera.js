// @flow
import React, { Component } from 'react';
import mqtt from 'mqtt';
// CameraPage에서 mapDispatchToProps로 Camera 컴포넌트랑 props를 바로 연결해줬기 때문에
// this.props로 액션 access 할 수 있음. 따로 import 할 필요 없음.
import { history } from '../store/configureStore';
import { pi as cameraAddress, mqtt as mqttBrokerAddress } from '../containers/Root';
import { firebase } from '../utils/firebase';


let client = null;

function callbackUnsubscribe(err) {
  console.log('[Mycamera.js]', 'unsubscribe callback', err);
}
function callbackSubscribe(err, granted) {
  console.log('[Mycamera.js]', 'subscribe callback', err, granted);
}

export default class Mycamera extends Component {
  componentWillMount() {
    if (client === null) {
      console.log('[Mycamera.js]', 'componentWillMount', 'client create');
      client = mqtt.connect(`mqtt://${mqttBrokerAddress}:1883`, { clientId: 'camera' });
      client.on('message', (topic, message) => {
        console.log('[Mycamera.js]', 'on', 'message', topic, message.toString());
        switch (topic) {
          case 'gesture/state':
            if (message.toString() === 'left') {
              window.responsiveVoice.speak('파일 페이지로 이동합니다.', 'Korean Female');
              console.log('파일 페이지로 이동합니다.');
              history.push('/myfiles');
            } else if (message.toString() === 'right') {
              window.responsiveVoice.speak('설정 페이지로 이동합니다.', 'Korean Female');
              console.log('설정 페이지로 이동합니다.');
              history.push('/settings');
            } else if (message.toString() === 'double tap') {
              window.responsiveVoice.speak('사진을 촬영합니다.', 'Korean Female');
              {this.handleTakePhoto()}
            } else if (message.toString() === 'up') {
              window.responsiveVoice.speak('영상을 촬영합니다.', 'Korean Female');
              {this.handleRecordStart()}
            } else if (message.toString() === 'down') {
              window.responsiveVoice.speak('영상을 촬영을 완료합니다.', 'Korean Female');
              {this.handleRecordStop()}
            } else {
              console.log('지원하지 않는 제스쳐입니다.');
            }
            return;
          case 'voice/command':
            if (message.toString() === '파일') {
              window.responsiveVoice.speak('파일 페이지로 이동합니다.', 'Korean Female');
              console.log('파일 페이지로 이동합니다.');
              history.push('/myfiles');
            } else if (message.toString() === '설정') {
              window.responsiveVoice.speak('설정 페이지로 이동합니다.', 'Korean Female');
              console.log('설정 페이지로 이동합니다.');
              history.push('/settings');
            } else if (message.toString() === '이전메뉴') {
              window.responsiveVoice.speak('파일 페이지로 이동합니다.', 'Korean Female');
              console.log('파일 페이지로 이동합니다.');
              history.push('/myfiles');
            } else if (message.toString() === '다음메뉴') {
              window.responsiveVoice.speak('설정 페이지로 이동합니다.', 'Korean Female');
              console.log('설정 페이지로 이동합니다.');
              history.push('/settings');
            } else if (message.toString() === '사진') {
              window.responsiveVoice.speak('사진을 촬영합니다.', 'Korean Female');
              {this.handleTakePhoto()}
            } else if (message.toString() === '영상시작') {
              window.responsiveVoice.speak('영상을 촬영합니다.', 'Korean Female');
              {this.handleRecordStart()}
            } else if (message.toString() === '영상스탑') {
              window.responsiveVoice.speak('영상을 촬영을 완료합니다.', 'Korean Female');
              {this.handleRecordStop()}
            } else {
              console.log('지원하지 않는 제스쳐입니다.');
            }
            return;
          default:
            console.log('[Mycamera.js]', 'No handler for topic ', topic);
        }
      });
    }
    if (!client.connected) {
      console.log('[Mycamera.js]', 'componentWillMount', 'reconnect');
      client.reconnect();
    }
    console.log('[Mycamera.js]', 'componentWillMount', 'subscribe');
    client.subscribe('gesture/state', { qos: 0 }, callbackSubscribe);
    client.subscribe('voice/command', { qos: 0 }, callbackSubscribe);
  }
  componentDidMount() {
    if (!client.connected) {
      console.log('[Mycamera.js]', 'componentDidMount', 'reconnect');
      client.reconnect();
    }
  }
  componentWillUpdate(nextProps, nextState) {
    if (!client.connected) {
      console.log('[Mycamera.js]', 'componentWillUpdate', 'reconnect', nextProps, nextState);
      client.reconnect();
    }
    console.log('[Mycamera.js]', 'componentWillUpdate', 'subscribe');
    client.subscribe('gesture/state', { qos: 0 }, callbackSubscribe);
    client.subscribe('voice/command', { qos: 0 }, callbackSubscribe);
  }
  componentDidUpdate(prevProps, prevState) {
    if (!client.connected) {
      console.log('[Mycamera.js]', 'componentDidUpdate', 'reconnect', prevProps, prevState);
      client.reconnect();
    }
  }
  componentWillUnmount() {
    console.log('[Mycamera.js]', 'componentWillUnmount', 'unsubscribe');
    client.unsubscribe('gesture/state', callbackUnsubscribe);
    client.unsubscribe('voice/command', callbackUnsubscribe);
    client.end();
    client = null;
  }

  // Handle raspberry pi videos and photos actions
  handleImageOnLoad = () => {
    // handleImageOnLoad = (e) => { e를 생략함.
    // console.log('[Mycamera.js]', 'handleImageOnLoad', e);
    this.image.src = `http://${cameraAddress}/html/cam_pic.php?time=${new Date().getTime()}`;
  }
  handleImageOnError = (e) => {
    console.log('[Mycamera.js]', 'handleImageErrored', e);
    setTimeout(() => {
      this.image.src = `http://${cameraAddress}/html/cam_pic.php?time=${new Date().getTime()}`;
    }, 100);
  }

  handleRecordStart = (e) => {
    console.log('[Mycamera.js]', 'handleRecordStart', e);
    const isRec = this.props.camera.isRecording;
    if (!isRec) {
      this.image.src = `http://${cameraAddress}/html/cmd_pipe.php?cmd=ca 1`;
      this.props.startRec();
    } else {
      console.log('Didn\'t stop previous recording');
    }
  }

  handleRecordStop = (e) => {
    console.log('[Mycamera.js]', 'handleRecordStop', e);
    const isRec = this.props.camera.isRecording;
    if (isRec) {
      this.image.src = `http://${cameraAddress}/html/cmd_pipe.php?cmd=ca 0`;
      this.props.stopRec();
    } else {
      console.log('Didn\'t start any recording yet');
    }
  }

  handleTakePhoto = (e) => {
    console.log('[Mycamera.js]', 'handleTakePhoto', e);
    this.image.src = `http://${cameraAddress}/html/cmd_pipe.php?cmd=im`;
  }

  // handelTimelapseStart() {
  // }

  // handleMotionDetectionStart() {
  // }

  // handleStopCamera() {
  // }

  render() {
    console.log('-----Mycamera component-------');
    const imaSrc = `http://${cameraAddress}/html/loading.jpg`;
    return (
      <div id="camera" className="child">
        <div>
          <img
            ref={(c) => { this.image = c; }}
            onLoad={this.handleImageOnLoad}
            onError={this.handleImageOnError}
            src={imaSrc}
            alt=""
            width="75%"
          />
        </div>
        <div style={{ position: 'absolute', right: '0em', top: '2em', fontSize: '0.7em' }}>
          <span>Video</span>
          <div style={{ margin: '0.5em', textAlign: 'right' }}>
            <button style={{ backgroundColor: 'Transparent', border: 'none', color: 'white' }} className="fa fa-play-circle fa-2x" onClick={this.handleRecordStart} />
            <br />
            <button style={{ backgroundColor: 'Transparent', border: 'none', color: 'white' }} className="fa fa-stop-circle fa-2x" onClick={this.handleRecordStop} />
          </div>
        </div>
        <div style={{ position: 'absolute', left: '0em', top: '2em', fontSize: '0.7em' }}>
          <span>Photo</span>
          <div style={{ margin: '0.5em', textAlign: 'left' }}>
            <button style={{ backgroundColor: 'Transparent', border: 'none', color: 'white' }} className="fa fa-dot-circle-o fa-2x" onClick={this.handleTakePhoto} />
          </div>
        </div>
      </div>
    );
  }
}
