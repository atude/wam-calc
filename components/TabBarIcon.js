import React from 'react';
import { Icon } from 'expo';

import Colors from '../constants/Colors.js';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.MaterialCommunityIcons
        name={this.props.name}
        size={24}
        style={{ opacity: this.props.focused ? 1 : 0.7, }}
        color="#ffffff"
      />
    );
  }
}