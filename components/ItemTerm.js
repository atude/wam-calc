import React from 'react';
import { List, Menu, TouchableRipple, } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

import Colors from '../constants/Colors.js';
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
    const { keyV, terms, deleteHandler, calcWam } = this.props;

    return (
      <View> 
        <TouchableRipple onPress={()=>{}} onLongPress={() => keyV !== "CurrentTerm" && this.setState({menuOpen: true})}>
          <Menu
            visible={this.state.menuOpen}
            onDismiss={() => this.setState({menuOpen: false})}
            anchor={
              <List.Subheader 
                style={{color: Colors.tintColor}}>
                {keyV === "CurrentTerm" ? "Current Term" : `${keyV} | ${calcWam({keyV: terms[keyV]})[0]} Term WAM`}  
              </List.Subheader>
            }
          >
            <Menu.Item onPress={this.deleteThis} title={`Remove ${keyV}`}/>
          </Menu>
        </TouchableRipple>


        {(keyV === "CurrentTerm" && (terms.CurrentTerm === undefined || terms.CurrentTerm.length === 0)) 
          ?
          <List.Item 
            title="No courses added"
            left={props => <List.Icon {...props} icon="info"/>}
          />
          :
          //Reverse so its in order with newest at top
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
