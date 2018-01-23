// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Mymenu.css';


export default class Home extends Component {
  render() {
    return (
        <div className={styles.content}>
          <p>Photos</p>
          <p>Videos</p>
          <p>Documents</p>
        </div>
    );
  }
}
