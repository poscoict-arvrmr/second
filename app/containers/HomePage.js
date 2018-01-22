// @flow
import React, { Component } from 'react';
import Home from '../components/Home';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as ShowMessageActions from '../actions/defaultChecker';

type Props = {
  authed:boolean,
  msg:string,
};

export class HomePage extends Component<Props> {
  props: Props;
  render() {
    console.log('[HomePage.js]','render', this, this.props);
    return (
      <Home authed={this.props.authed} msg={this.props.msg}></Home>
    );
  }
}

function mapStateToProps(state) {
  console.log('[HomePage.js]','mapStateToProps', state);
  return {
    authed:state.checker.authed,
    msg:state.checker.msg
  }
}
function mapDispatchToProps(dispatch) {
  console.log('[HomePage.js]','mapDispatchToProps', dispatch);
  return bindActionCreators(ShowMessageActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
