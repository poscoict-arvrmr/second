// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { router } from 'react-router-redux';
import { WifiCheckerActions } from '../actions/defaultChecker';
import { firebase } from '../utils/firebase';
import { history } from '../store/configureStore';
import { pi as cameraAddress, mqtt as mqttBrokerAddress } from '../containers/Root';
import type{ defaultStateType } from '../reducers/defaultChecker';

type Props = {
  checker: defaultStateType,
  router: router
};

class WifiStatus extends Component<Props> {
  props: Props;
  singout = (e) => {
    console.log('[WifiStatus.js]', 'singout', e, this, this.props, this.props.checker);
    firebase.auth().signOut().then(() => history.push('/')).catch((err) => console.log('[WifiStatus.js]', 'singout', err));
  }
  render() {
    console.log('[WifiStatus.js]', 'render', this, this.props, this.props.checker, this.props.checker.state);
    return (
      <div id="wifi-status">
        <div style={{ float: 'left' }}>
          {
            this.props.checker.status &&
            <i className="fa fa-wifi fa-4x" />
          }
          {
            !this.props.checker.status &&
            <i className="fa fa-ban fa-4x" />
          }
          <div style={{ float: 'right' }}>
            현재위치 : { this.props.router.location.pathname }
            <br />
            camera : {cameraAddress},
            <br />
            mqtt broker : {mqttBrokerAddress}
          </div>
        </div>
        {
          this.props.checker.authed &&
          <div style={{ position: 'absolute', top: '20px', right: '0px' }}>
            <button onClick={this.singout}>logout</button>
          </div>
        }
        <div style={{ clear: 'both' }} />
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
