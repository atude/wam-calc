import React from 'react';
import { Icon } from 'expo';
import { List, Title, TouchableRipple, Menu, } from 'react-native-paper';
import { StyleSheet, } from 'react-native';

import Colors from '../constants/Colors.js';
import { View } from 'native-base';

export default class ItemMark extends React.Component {
  state = {
    menuOpen: false,
  }

  deleteThis = () => {
    this.props.deleteHandler(this.props.path);
    this.setState({menuOpen: false})
  }

  getMarkRank = () => {
    const intVal = parseInt(this.props.mark.mark);

    if(intVal < 50) return ["FL", Colors.fl];
    if(intVal < 65) return ["PS", Colors.ps];
    if(intVal < 75) return ["CR", Colors.cr];
    if(intVal < 85) return ["DN", Colors.dn];
    return ["HD", Colors.hd];
  }

  render() {
    let { mark, thisStyle } = this.props;
    const markRank = this.getMarkRank();

    return (
      <TouchableRipple onPress={()=>{}} onLongPress={() => this.props.path[0] === "CurrentTerm" && this.setState({menuOpen: true})}>
        <Menu
          visible={this.state.menuOpen}
          onDismiss={() => this.setState({menuOpen: false})}
          anchor={
            <List.Item 
              style={thisStyle}
              title={mark.name}
              description={`Weighted at ${mark.weight}%`}
              right={() => 
                <Title style={{color: markRank[1], marginTop: 13, marginRight: 5, fontSize: 16,}}>{mark.mark} {markRank[0]}</Title>
              }
            />
          }
        >
          <Menu.Item onPress={this.deleteThis} title={`Remove ${mark.name}`}/>
        </Menu>
        
      </TouchableRipple>
    );
  }
}

const styles = StyleSheet.create({

});
