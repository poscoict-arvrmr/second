// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Mymenu.css';
//CameraPage에서 mapDispatchToProps로 Camera 컴포넌트랑 props를 바로 연결해줬기 때문에
//this.props로 액션 access 할 수 있음. 따로 import 할 필요 없음.
import mqtt from "mqtt";
import { history } from '../store/configureStore';
import { Window, View, Box, Text, Button } from 'react-desktop/macOs';


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

  handleImageLoaded() {
    this.refs.mjpeg_dest.src = 'http://192.168.246.244/html/cam_pic.php?time=' + new Date().getTime();
  }

  handleImageErrored() {
    setTimeout(() => {
      this.refs.mjpeg_dest.src = 'http://192.168.246.244/html/cam_pic.php?time=' + new Date().getTime();
    }, 100);
  }

  handleRecordVideoImage() {
    
  }

  handleRecordImage() {
    this.refs.mjpeg_dest.src = 'http://192.168.246.244/html/cmd_pipe.php?cmd=im';
  }

  handelTimelapseStart() {
  }

  handleMotionDetectionStart() {
  }

  handleStopCamera() {
  }

  render() {
    console.log("-----Mycamera component-------");
    return (
      <Window
      chrome
      height="600px"
      padding="10px"
      opacity="1"
      horizontalAlignment="center"
      verticalAlignment="center"
      >
        <View
          horizontalAlignment="center"
          verticalAlignment="center"
          layout="vertical"
          width="600px"
          height="800px"
          padding="10px"
          
          >

          <View
            layout="horizontal"
            height="100px"
          >
            <Link to="/">
              <i className="fa fa-arrow-left fa-3x" />
            </Link>
            &nbsp;
            <Link to="/images">
              <i className="fa fa-arrow-right fa-3x" />
            </Link>
          </View>

          <View
            height="380px"
          >
            <div>
              <img
                ref="mjpeg_dest"
                onLoad={this.handleImageLoaded.bind(this)}
                onError={this.handleImageErrored.bind(this)}
                src="http://192.168.246.244/html/loading.jpg"
                alt=""/>
            </div>
          </View>
          <View>
            <button onClick={this.handleRecordVideoImage.bind(this)}><i className="fa fa-play-circle fa-5x"></i></button>
            &nbsp;&nbsp;&nbsp;
            <button onClick={this.props.stopRec}><i className="fa fa-stop-circle fa-5x"></i></button>
          </View>

         </View>
      </Window>
      
    );
  }
  componentDidMount(){
    responsiveVoice.speak("음성명령을 통하여 사진을 찍을 수 있습니다", "Korean Female");
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

/**
 *   <div className={styles.content}>
          <p>Take a Photo</p>
          <p>Record a Video</p>
          <button onClick={this.props.startRec}>Start Recording</button>
          <button onClick={this.props.stopRec}>Stop Recording</button>
          <p>Motion Capture</p>
        </div>
 */