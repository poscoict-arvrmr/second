// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import styles from './Mymenu.css';

export default class MyMenu extends Component {
  render() {
    return (
        <div className={styles.content} data-tid="container">
          <Link exact to="/"><i class="fa fa-home fa-5x"></i></Link>
          &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/myfiles"><i class="fa fa-file fa-4x"></i></Link>
          &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/mycamera"><i class="fa fa-camera fa-4x"></i></Link>
          &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          <Link to="/settings"><i class="fa fa-cog fa-5x"></i></Link>
        </div>
    );
  }
}