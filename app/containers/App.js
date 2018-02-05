// @flow
import * as React from 'react';

type Props = {
  children: React.Node
};

export default class App extends React.Component<Props> {
  props: Props;

  render() {
    console.log('[App.js]', 'render', this, this.context, this.props);
    return (
      <div id="app">
        {this.props.children}
      </div>
    );
  }
}
