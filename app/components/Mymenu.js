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
      <div id="menu" style={{ float: 'right' }}>
        {
          !!this.props.checker.authed &&
          <li>
            <ul>
              <Link to="/">
                <i className="fa fa-home fa-2x" />
              </Link>
            </ul>
            <ul>
              <Link to="/myfiles">
                <i className="fa fa-file fa-2x" />
              </Link>
            </ul>
            <ul>
              <Link to="/mycamera">
                <i className="fa fa-camera fa-2x" />
              </Link>
            </ul>
            <ul>
              <Link to="/settings">
                <i className="fa fa-cog fa-2x" />
              </Link>
            </ul>
          </li>
        }
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
