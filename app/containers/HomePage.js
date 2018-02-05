// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { LoginActions } from '../actions/gesture';
import Home from '../components/Home';

function mapStateToProps(state) {
  return {
    authed: state.checker.authed,
    msg: state.checker.msg
  };
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(LoginActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);
