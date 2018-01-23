// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebase } from '../utils/firebase';
import styles from './Mymenu.css';

type Props = {};

export default class Login extends Component<Props> {
  props: Props;
  handleSubmit = (e) => {
    e.preventDefault();
    firebase.auth().signInWithEmailAndPassword(this.email.value, this.pw.value).catch(error => {
      this.setState({loginMessage: 'Invalid username/password.'})
    })
  }
  render() {
    console.log('[Login.js]','render', this, this.props);
    return (
      <div className={styles.login}>
        <h1> Log-in </h1>
        <form onSubmit={this.handleSubmit}>
          <div className={styles.login}>
            <label>ID &nbsp;&nbsp;&nbsp;</label>
            <input ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div className={styles.login}>
            <label>PW &nbsp;&nbsp;</label>
            <input type="password" placeholder="Password" ref={(pw) => this.pw = pw} />
          </div>
          <button type="submit">Log-in</button>
        </form>
      </div>
    );
  }
}
