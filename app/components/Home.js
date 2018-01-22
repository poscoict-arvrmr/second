// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

type Props = {
  msg:string,
  authed:boolean
};

export default class Home extends Component<Props> {
  props: Props;
  render() {
    console.log('[Home.js]','render', this, this.props);
    return (
      <div id="home" style={{textAlign:'center'}}>
        <div style={{fontSize:2+'em',marginTop:1+'em'}}>
          <i className="fa fa-eercast fa-spin fa-5x"></i>
        </div>
        <div style={{fontSize:4+'em',marginTop:0.5+'em'}}>
          {this.props.msg}
        </div>
        {
          this.props.authed && 
          <Link to="/counter">to Biz</Link>
        }
        {
          !this.props.authed && 
          <Link to="/login">to Login</Link>
        }
      </div>
    );
  }
}
