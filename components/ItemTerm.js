import React from 'react';
import { Icon } from 'expo';
import { List, Divider, Text, Caption, } from 'react-native-paper';
import { StyleSheet, } from 'react-native';

import Colors from '../constants/Colors.js';
import { View } from 'native-base';
import ItemCourse from './ItemCourse.js';

export default class ItemTerms extends React.Component {
  state= {
    menuOpen: false,
  }
  
  render() {
    let { terms } = this.props;

    return (
      <View style={styles.listContainer}>
        <List.Section title="Ongoing Courses">
          <Divider/>
            <View> 
              <List.Subheader style={{color: Colors.tintColor}}>Current Term</List.Subheader>
              {terms.CurrentTerm !== undefined ? 
                Object.values(terms.CurrentTerm).map((course, i) => (
                  <ItemCourse key={`_${course}_${i}`} course={course}/>
                ))
                :
                  <List.Item 
                    title="No courses added"
                    left={props => <List.Icon {...props} icon="info"/>}
                  />
            }
            </View>
        </List.Section>
        <List.Section title="Completed Courses">
          <Divider/>
          {Object.keys(terms).filter(key => key !== "CurrentTerm").map((key, i) => (
            <View key={`_${key}_${i}`}> 
              <List.Subheader style={{color: Colors.tintColor}}>{key}</List.Subheader>
              {Object.values(terms[key]).map((course, i) => (
                <ItemCourse key={`_${course}_${i}`} course={course}/>
              ))}
            </View>
          ))} 
        </List.Section>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listContainer: {
    marginHorizontal: 10,
    width: "95%",
    alignSelf: "center",
  },
  listMark: {
    marginHorizontal: 20,
    marginVertical: -5,
  },
  UOCText: {
    color: Colors.tintColor,
  },
});
