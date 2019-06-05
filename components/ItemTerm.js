import React from 'react';
import { Icon } from 'expo';
import { List, Menu, } from 'react-native-paper';
import { StyleSheet, } from 'react-native';

import Colors from '../constants/Colors.js';
import { View } from 'native-base';
import ItemCourse from './ItemCourse.js';

export default class ItemTerm extends React.Component {
  state= {
    menuOpen: false,
  }

  deleteThis = () => {
    this.props.deleteHandler([this.props.keyV]);
    this.setState({menuOpen: false})
  }

  render() {
    const { keyV, terms, deleteHandler } = this.props;

    return (
      <View> 
        <Menu
          visible={this.state.menuOpen}
          onDismiss={() => this.setState({menuOpen: false})}
          anchor={
            <List.Subheader 
              onLongPress={() => keyV !== "CurrentTerm" && this.setState({menuOpen: true})} 
              style={{color: Colors.tintColor}}>
              {keyV === "CurrentTerm" ? "Current Term" : keyV}
            </List.Subheader>
          }
        >
          <Menu.Item onPress={this.deleteThis} title="Remove Term"/>
        </Menu>

        {(keyV === "CurrentTerm" && (terms.CurrentTerm === undefined || terms.CurrentTerm.length === 0)) 
          ?
          <List.Item 
            title="No courses added"
            left={props => <List.Icon {...props} icon="info"/>}
          />
          :
          Object.values(terms[keyV]).map((course, i) => (
            <ItemCourse
              key={`_${course}_${i}`} 
              course={course}
              deleteHandler={deleteHandler}
              path={[keyV, i]}
            />
          ))          
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  
});
