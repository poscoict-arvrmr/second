// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GestureActions } from '../actions/gesture';
import Settings from '../components/Settings';

function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(GestureActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(Settings);
