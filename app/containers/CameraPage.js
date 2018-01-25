// @flow
import React, { Component } from 'react';
import Camera from '../components/Mycamera';
import Mymenu from '../components/Mymenu';

export default class CameraPage extends Component {
  render() {
    return (
      <div>
        <Mymenu />
        <Camera />
      </div>
    );
  }
}