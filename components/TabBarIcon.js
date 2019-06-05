import React from 'react';
import { Icon } from 'expo';

import Colors from '../constants/Colors.js';

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <Icon.MaterialCommunityIcons
        name={this.props.name}
        size={22}
        style={{ marginBottom: -3, padding: 2 }}
        color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
    );
  }
}