// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Mymenu.css';
//CameraPage에서 mapDispatchToProps로 Camera 컴포넌트랑 props를 바로 연결해줬기 때문에
//this.props로 액션 access 할 수 있음. 따로 import 할 필요 없음.

export default class Mycamera extends Component {
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
}