// @flow
import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styles from './Mymenu.css';
import { LoginActions } from '../actions/defaultChecker';

type Props = {
};

export class MyMenu extends Component {
  props: Props;
  render() {
    return (
      <div>
        {
          !!this.props.checker.authed &&
          <div className={styles.content} data-tid="container">
            <Link to="/">
              <i className="fa fa-home fa-5x" />
            </Link>
            &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/myfiles">
              <i className="fa fa-file fa-4x" />
            </Link>
            &nbsp; &nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/mycamera">
              <i className="fa fa-camera fa-4x" />
            </Link>
            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            <Link to="/settings">
              <i className="fa fa-cog fa-5x" />
            </Link>
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
  return bindActionCreators(LoginActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MyMenu);
