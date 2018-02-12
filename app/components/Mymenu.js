// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
// import styles from './Mymenu.css';
import { LoginActions } from '../actions/defaultChecker';
import type{ defaultStateType } from '../reducers/defaultChecker';

type Props = {
  checker: defaultStateType
};

export class MyMenu extends Component {
  props: Props;
  render() {
    return (
      <div id="menu" style={{ position: 'absolute', bottom: '0.5em' }}>
        {
          !!this.props.checker.authed &&
          <div style={{ float: 'right' }}>
            <Link to="/">
              <button className="fa fa-home" />
            </Link>
            <Link to="/myfiles">
              <button className="fa fa-files-o" />
            </Link>
            <Link to="/mycamera">
              <button className="fa fa-camera" />
            </Link>
            <Link to="/settings">
              <button className="fa fa-cog" />
            </Link>
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
  return bindActionCreators(LoginActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MyMenu);
