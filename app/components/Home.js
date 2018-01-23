// @flow
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button } from 'react-desktop/macOs';
import styles from './Home.css';

type Props = {
  msg:string,
  authed:boolean
};

export default class Home extends Component<Props> {
  props: Props;
  render() {
    console.log('[Home.js]','render', this, this.props);
    return (
      <div className={styles.home}>
      <div>
        <i class="fa fa-spinner fa-pulse fa-3x fa-fw"></i>
      </div>
      <div>
        {this.props.msg}
      </div>
      {
        this.props.authed && 
        <Link to="/menu">
          <Button color="gray" onClick={() => console.log('Clicked!')} size="30" paddingLeft="20px" paddingRight="20px" margin="20px">
          Start
          </Button>
        </Link>
      }
      {
        !this.props.authed && 
        <Link to="/login">
        <Button color="gray" size="30" paddingLeft="20px" paddingRight="20px" margin="20px">
        Log in
        </Button>
        </Link>
      }
    </div>
    );
  }
}
