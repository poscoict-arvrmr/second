// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as WifiCheckerActions from '../actions/defaultChecker';
import { firebase } from '../utils/firebase';

type Props = {
};

export class WifiStatus extends Component<Props> {
  props: Props;
  singout = (e) =>{
    firebase.auth().signOut();
  }
  render() {
    // icon = status ? "fa fa-wifi fa-5x" : "fa fa-ban fa-5x";
    console.log('[WifiStatus.js]','render', this, this.props, this.props.checker);
    return (
      <div id="wifi-status">
        <div>
          <i className={this.props.checker.icon}></i>
        </div>
        {
          this.props.checker.authed &&
          <div style={{position:'absolute',top:20+'px',right:0+'px'}}>
            <button onClick={this.singout}>logout</button>
          </div>
        }
      </div>
    );
  }
}

function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(WifiCheckerActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(WifiStatus);