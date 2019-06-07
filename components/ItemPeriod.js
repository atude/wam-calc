import React from 'react';
import { Icon } from 'expo';
import { List, Divider, Text, Caption, Menu, } from 'react-native-paper';
import { StyleSheet, } from 'react-native';

import Colors from '../constants/Colors.js';
import { View } from 'native-base';
import ItemTerm from './ItemTerm.js';

export default class ItemPeriod extends React.Component {
  render() {
    const { terms, deleteHandler } = this.props;

    return (
      <View style={styles.listContainer}>
        <List.Section title="Ongoing Courses">
          <Divider/>
          <ItemTerm key={`_currentterm_`} terms={terms} deleteHandler={deleteHandler} keyV={"CurrentTerm"}/>
        </List.Section>
        
        {/* Only show completed courses if they exist */}
        {Object.keys(terms).length > 1 &&
          <List.Section title="Completed Courses">
            <Divider/>
            {Object.keys(terms).filter(key => key !== "CurrentTerm").reverse().map((key, i) => (
              <ItemTerm key={`_${key}_${i}`} terms={terms} deleteHandler={deleteHandler} keyV={key}/>
            ))} 
          </List.Section>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: 10,
    width: "95%",
    alignSelf: "center",
    paddingBottom: 90,
  },
});
