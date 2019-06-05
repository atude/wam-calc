import React from 'react';
import { Icon } from 'expo';
import { List, Text, Button, IconButton, Menu, } from 'react-native-paper';
import { StyleSheet, } from 'react-native';

import Colors from '../constants/Colors.js';
import Layout from '../constants/Layout.js';
import { View } from 'native-base';

const iconSize = 25;

export default class ItemCourse extends React.Component {
  state = {
    menuOpen: false,
  }

  render() {
    const course = this.props.course;
    return (
      <View style={styles.listContainer}>
        <List.Accordion
          title={course.name}
          description={`${course.uoc} Units of Credit`}
          style={styles.listAccordion}
          left={props => 
          <View>
            <Icon.MaterialCommunityIcons size={26} {...props} name={'shape'} style={styles.listIcons}/>
          </View>}
        >


          {/* <List.Item title="Mid Exam" description="Mark of 67% | Weighted at 30%" style={styles.listMark}
            right={props => <Icon.MaterialCommunityIcons size={20} {...props} name={'shape'} style={styles.listSubIcons}/>}
          />
          <List.Item title="Finals" /> */}
        </List.Accordion>

        <Menu
          visible={this.state.menuOpen}
          onDismiss={() => this.setState({menuOpen: false})}
          anchor={
            <IconButton
              icon="more-vert"
              size={iconSize}
              onPress={() => this.setState({menuOpen: true})}
              style={styles.moreButton}
            />
          }
        >
          <Menu.Item onPress={() => {}} title="Delete Course" />
        </Menu>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listIcons: {
    marginHorizontal: 5,
  },
  listSubIcons: {
    marginVertical: 20,
    marginRight: 10,
  },
  listContainer: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    alignItems: "center",
    marginHorizontal: 0,
  },
  listMark: {
    marginLeft: 20,
    marginVertical: -5,
  },
  UOCText: {
    color: Colors.tintColor,
  },
  listAccordion: {
    flex: 1,
    width: (Layout.window.width * 0.95) - (iconSize * 2),
  },
  moreButton: {
    flex: 1,
  },
});
