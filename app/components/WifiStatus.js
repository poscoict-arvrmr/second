// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { router } from 'react-router-redux';
import { Button } from 'react-desktop/windows';
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
        <div style={{ float: 'left', color: '#78A1FF', paddingLeft: '0.8em' }}>
          {
            this.props.checker.status &&
            <i className="fa fa-wifi fa-3x" />
          }
          {
            !this.props.checker.status &&
            <i className="fa fa-ban fa-3x" />
          }
          <div style={{ float: 'right', marginLeft: '1.5em' }}>
            Current path : { this.props.router.location.pathname }
            <br />
            Camera : {cameraAddress}
            <br />
            Mqtt broker : {mqttBrokerAddress}
          </div>
        </div>
        {
          this.props.checker.authed &&
          <div style={{ position: 'absolute', top: '20px', right: '0px' }}>
            <Button push color="#78A1FF" onClick={this.singout}>LOG OUT</Button>
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
