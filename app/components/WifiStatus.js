// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
// * ===> actionCreators 로 바꿈. actionCreators function들만 묶은 오브젝트.
import { actionCreators as WifiCheckerActions } from '../reducers/defaultChecker';
import { firebase } from '../utils/firebase';
import { Link } from 'react-router-dom';
import Mymenu from './Mymenu';
import styles from './Mymenu.css';

type Props = {
};

export class WifiStatus extends Component<Props> {
  props: Props;
  singout = (e) =>{
    firebase.auth().signOut();
  }
  render() {
    // icon = status ? "fa fa-wifi fa-5x" : "fa fa-ban fa-5x";
    console.log('[WifiStatus.js]','render', this.props, this.state, this, this.props.checker);
    return (
      <div id="wifi-status">
        <div>
          <i className={this.props.checker.icon}></i>
        </div>
        {
          this.props.checker.authed &&
          <div className={styles.topMenu}>
            <Mymenu />
            <button onClick={this.singout} style={{position:'absolute',top:20+'px',right:0+'px'}}>
              <Link exact to="/">logout</Link>
            </button>
          </div>
        }
      </div>
    );
  }
}
//로그인이 안된 상태면 메뉴가 안 뜨도록, 로그아웃 버튼 + 상단 메뉴 버튼 묶어줌. 

function mapStateToProps(state) {
  console.log('[WifiStatus.js]','mapStateToProps', state, state.checker);
  return state;
}
function mapDispatchToProps(dispatch) {
  console.log('[WifiStatus.js]','mapDispatchToProps', dispatch)
  return bindActionCreators(WifiCheckerActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(WifiStatus);