// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Mymenu.css';

export default class Settings extends Component {
  render() {
    return (
      <div className={styles.content}>
         <p>Account</p>
         <p>Wi-fi</p>
         <p>Report</p>
      </div>
    );
  }
}