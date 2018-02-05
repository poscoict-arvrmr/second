// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LoginActions } from '../actions/defaultChecker';
import Login from '../components/Login';

function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(LoginActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Login);
