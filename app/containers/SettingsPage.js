// @flow
import React, { Component } from 'react';
import Settings from '../components/Settings';
import Mymenu from '../components/Mymenu';


export default class SettingsPage extends Component {
  render() {
    return (
      <div>
        <Mymenu />
        <Settings />
      </div>
    );
  }
}