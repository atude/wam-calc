import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default class TabBarIcon extends React.Component {
  render() {
    return (
      <MaterialCommunityIcons
        name={this.props.name}
        size={24}
        style={{ opacity: this.props.focused ? 1 : 0.7, }}
        color="#ffffff"
      />
    );
  }
}