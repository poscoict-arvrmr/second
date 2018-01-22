// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { firebase } from '../utils/firebase';

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
      <div>
        <h1> Login </h1>
        <form onSubmit={this.handleSubmit}>
          <div>
            <label>Email</label>
            <input ref={(email) => this.email = email} placeholder="Email"/>
          </div>
          <div>
            <label>Password</label>
            <input type="password" placeholder="Password" ref={(pw) => this.pw = pw} />
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    );
  }
}
