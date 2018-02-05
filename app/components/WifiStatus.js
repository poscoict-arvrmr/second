// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { WifiCheckerActions } from '../actions/defaultChecker';
import { firebase } from '../utils/firebase';
import { history } from '../store/configureStore';
import { pi as cameraAddress, mqtt as mqttBrokerAddress } from '../containers/Root';

type Props = {
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
        <div>
          {
            this.props.checker.status &&
            <i className="fa fa-wifi fa-5x" />
          }
          {
            !this.props.checker.status &&
            <i className="fa fa-ban fa-5x" />
          }
          현재위치 : { this.props.router.location.pathname },
          camera : {cameraAddress},
          mqtt broker : {mqttBrokerAddress}
        </div>
        {
          this.props.checker.authed &&
          <div style={{ position: 'absolute', top: '20px', right: '0px' }}>
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
