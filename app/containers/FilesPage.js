// @flow
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { GestureActions } from '../actions/gesture';
import MyFiles from '../components/Myfiles';

function mapStateToProps(state) {
  return state;
}
function mapDispatchToProps(dispatch) {
  return bindActionCreators(GestureActions, dispatch);
}
export default connect(mapStateToProps, mapDispatchToProps)(MyFiles);
