// @flow
import * as React from 'react';
import WifiStatus from '../components/WifiStatus';
type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    console.log('[App.js]','render',this);
    return (
      <div id="app">
        <WifiStatus/>
        {this.props.children}
      </div>
    );
  }
}
