import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import Login from '../components/Login';
// * ===> actionCreators 로 바꿈. actionCreators function들만 묶은 오브젝트.
import { actionCreators as LoginActions } from '../reducers/defaultChecker';

function mapStateToProps(state) {
    console.log('[LoginPage.js]','mapStateToProps', state);
    return state
  }
  
  function mapDispatchToProps(dispatch) {
    console.log('[LoginPage.js]','mapDispatchToProps', dispatch);
    return bindActionCreators(LoginActions, dispatch);
  }
  
  export default connect(mapStateToProps, mapDispatchToProps)(Login);
  