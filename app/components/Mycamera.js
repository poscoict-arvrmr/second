// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Mymenu.css';

export default class Mycamera extends Component {
  render() {
    return (
        <div className={styles.content}>
          <p>Take a Photo</p>
          <p>Record a Video</p>
          <p>Motion Capture</p>
        </div>
    );
  }
}