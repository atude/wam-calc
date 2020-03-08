import React from 'react';
import { List, Title, TouchableRipple, Menu, } from 'react-native-paper';
import { StyleSheet, } from 'react-native';
import { getMarkRanks } from '../utils/index.js';

export default class ItemMark extends React.Component {
  state = {
    menuOpen: false,
  }

  deleteThis = () => {
    this.props.deleteHandler(this.props.path);
    this.setState({menuOpen: false})
  }

  render() {
    let { mark, thisStyle, path, isAuType } = this.props;
    const markRank = getMarkRanks(parseFloat(this.props.mark.mark).toFixed(2), isAuType);

    return (
      <TouchableRipple 
        onPress={()=>{}} 
        onLongPress={() => path && path[0] === "CurrentTerm" && this.setState({menuOpen: true})}
        delayLongPress={10}
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
