// @flow
import React, { Component } from 'react';
import MyFiles from '../components/Myfiles';
import Mymenu from '../components/Mymenu';


export default class FilesPage extends Component {
  render() {
    return (
      <div>
      <Mymenu />
      <MyFiles />
      </div>
    );
  }
}
