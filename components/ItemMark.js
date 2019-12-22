import React from 'react';
import { List, Title, TouchableRipple, Menu, } from 'react-native-paper';
import { StyleSheet, } from 'react-native';

import Colors from '../constants/Colors.js';

export default class ItemMark extends React.Component {
  state = {
    menuOpen: false,
  }

  deleteThis = () => {
    this.props.deleteHandler(this.props.path);
    this.setState({menuOpen: false})
  }

  getMarkRank = () => {
    const val = parseFloat(this.props.mark.mark).toFixed(2);

    if(val < 50) return ["FL", Colors.fl];
    if(val < 65) return ["PS", Colors.ps];
    if(val < 75) return ["CR", Colors.cr];
    if(val < 85) return ["DN", Colors.dn];
    return ["HD", Colors.hd];
  }

  render() {
    let { mark, thisStyle, path } = this.props;
    const markRank = this.getMarkRank();

    return (
      <TouchableRipple 
        onPress={()=>{}} 
        onLongPress={() => path && path[0] === "CurrentTerm" && this.setState({menuOpen: true})}
      >
        <Menu
          visible={this.state.menuOpen}
          onDismiss={() => this.setState({menuOpen: false})}
          anchor={
            <List.Item 
              style={thisStyle}
              title={mark.name}
              description={`Weighted at ${mark.weight}%`}
              right={() => 
                <Title style={{color: markRank[1], marginTop: 13, marginRight: 5, fontSize: 16,}}>{Number(mark.mark).toFixed(2)} {markRank[0]}</Title>
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
