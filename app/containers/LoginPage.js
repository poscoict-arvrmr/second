import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../components/Login';
import * as LoginActions from '../actions/defaultChecker';

function mapStateToProps(state) {
  console.log('[LoginPage.js]','mapStateToProps', state);
  return state
}

function mapDispatchToProps(dispatch) {
  console.log('[LoginPage.js]','mapDispatchToProps', dispatch);
  return bindActionCreators(LoginActions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
  