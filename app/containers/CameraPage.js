// @flow
import React, { Component } from 'react';
import Camera from '../components/Mycamera';
import Mymenu from '../components/Mymenu';

//카메라 액션 추가
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { camActions } from '../reducers/camera';

//export가 하나밖에 안되서 export default class --> export class
export class CameraPage extends Component {
  render() {
    return (
      <div>
        <Camera />
      </div>
    );
  }
}

//카메라 액션 추가
function mapStateToProps(state) {
  console.log('[CameraPage.js]','mapStateToProps', state);
  return state
}

function mapDispatchToProps(dispatch) {
  console.log('[CameraPage.js]','mapDispatchToProps', dispatch);
  return {
    startRec: bindActionCreators(camActions.startRec, dispatch),
    stopRec: bindActionCreators(camActions.stopRec, dispatch),
  } 
}

//카메라 component랑 바로 연결시켜줌.
//이렇게 했더니 <Mymenu />가 안 떠버려서 그냥 메뉴를 와이파이처럼 상위에 올려버림.
export default connect(mapStateToProps, mapDispatchToProps)(Camera);