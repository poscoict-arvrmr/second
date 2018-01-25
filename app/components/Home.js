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
    //login하기 전에는 로딩 아이콘, 한 후에는 사용자 아이콘 띄우기
    //{ } 안에서 && 이후의 render파트는 하나의 큰 <div> 로 묶어줘야 함. 
    <div className={styles.home}>
      {
        this.props.authed && 
        <div>
          <div>
            <i class="fa fa-user-circle fa-3x"></i>
          </div>
          <div>
            {this.props.msg}
          </div>
          <Link to="/menu">
            <Button color="gray" onClick={() => console.log('Clicked!')} size="30" paddingLeft="20px" paddingRight="20px" margin="20px">
            Start
            </Button>
          </Link>
        </div>
      }
      {
        !this.props.authed && 
        <div>
          <div>
            <i class="fa fa-spinner fa-pulse fa-3x"></i>
          </div>
          <div>
          {this.props.msg}
          </div>
          <Link to="/login">
          <Button color="gray" size="30" paddingLeft="20px" paddingRight="20px" margin="20px">
          Log in
          </Button>
          </Link>
        </div>
      }
    </div>
    );
  }
}