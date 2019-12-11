import React from 'react';
import { List, Divider, } from 'react-native-paper';
import { StyleSheet, View} from 'react-native';

import ItemTerm from './ItemTerm.js';

export default class ItemPeriod extends React.Component {
  render() {
    const { terms, deleteHandler, calcWam } = this.props;

    return (
      <View style={styles.listContainer}>
        <List.Section title="Ongoing Courses">
          <Divider/>
          <ItemTerm calcWam={calcWam} key={`_currentterm_`} terms={terms} deleteHandler={deleteHandler} keyV={"CurrentTerm"}/>
        </List.Section>
        
        {/* Only show completed courses if they exist */}
        {Object.keys(terms).length > 1 &&
          <List.Section title="Completed Courses">
            <Divider/>
            {Object.keys(terms).filter(key => key !== "CurrentTerm").reverse().map((key, i) => (
              <ItemTerm calcWam={calcWam} key={`_${key}_${i}`} terms={terms} deleteHandler={deleteHandler} keyV={key}/>
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
