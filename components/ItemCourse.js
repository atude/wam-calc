import React from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { List, IconButton, Menu, Title, } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

import Colors from '../constants/Colors.js';
import Layout from '../constants/Layout.js';
import ItemMark from './ItemMark.js';

export default class ItemCourse extends React.Component {
  state = {
    menuOpen: false,
    accordionOpen: false,
  }

  deleteThis = () => {
    this.props.deleteHandler(this.props.path);
    this.setState({menuOpen: false})
  }

  getMarkRank = (val) => {
    if(val === 0) return ["--", Colors.na];
    if(val < 50) return ["FL", Colors.fl];
    if(val < 65) return ["PS", Colors.ps];
    if(val < 75) return ["CR", Colors.cr];
    if(val < 85) return ["DN", Colors.dn];
    return ["HD", Colors.hd];
  }

  getCourseMarkAv = () => {
    let marks = this.props.course.marks;
    let avTotal = 0;
    let weightTotal = 0;

    marks.map((mark) => (
      avTotal += parseFloat(mark.mark) * parseFloat(mark.weight)/100,
      weightTotal += parseFloat(mark.weight)
    ));

    return avTotal / weightTotal * 100;
  }

  getCourseCompletion = () => {
    return this.props.course.marks.reduce((a, b) => a + Number(b.weight), 0);
  }

  render() {
    let { course, path } = this.props;
    let { accordionOpen } = this.state;
    const noMarks = (course.marks === undefined || course.marks.length === 0) ? true : false;
    const courseCompletion = this.getCourseCompletion();
    let totalAv = noMarks ? 0 : this.getCourseMarkAv();
    let markRank = this.getMarkRank(totalAv);

    return (
      <View style={styles.listContainer}>
        <List.Accordion
          onPress={() => this.setState({accordionOpen: !accordionOpen})}
          title={course.name}
          description={`${courseCompletion}% Complete | ${course.uoc} Credits`}
          style={styles.listAccordion}
          left={props => 
          <View>
            <MaterialCommunityIcons size={26} {...props} name={course.icon}
              style={[styles.listIcons, {backgroundColor: accordionOpen ? Colors.tintColor : Colors.grey}]}/>
          </View>}
        >
          {course.marks === undefined || course.marks.length === 0 ?
            <List.Item 
              style={styles.listMark}
              title="No marks added"
              right={props => <List.Icon {...props} icon="info"/>}
            />
            :
            course.marks.map((mark, i) => (
              <ItemMark 
                key={`_mark-${course.name}_${i}`} 
                thisStyle={styles.listMark} 
                mark={mark} 
                deleteHandler={this.props.deleteHandler}
                path={path.concat(i)}
              />
            ))
          }
        </List.Accordion>

        <Menu
          visible={this.state.menuOpen}
          onDismiss={() => this.setState({menuOpen: false})}
          anchor={
            <View style={[styles.sideContent, {borderLeftColor: markRank[1]}]}>
              <Title style={[styles.markAverageText, {color: markRank[1]}]}>
                {totalAv.toFixed(1)}
              </Title>
              <Title style={[styles.markAverageText, {color: markRank[1]}]}>
                {markRank[0]}
              </Title>
              {path[0] === "CurrentTerm" ?
                <IconButton
                  icon="more-horiz"
                  size={Layout.iconSize}
                  onPress={() => this.setState({menuOpen: true})}
                  style={styles.moreButton}
                />
                :
                <IconButton
                  icon="remove"
                  disabled={true}
                  size={Layout.iconSize}
                  onPress={() => {}}
                  style={styles.moreButton}
                />
              } 
            </View>
          }
        >
          <Menu.Item onPress={this.deleteThis} title={`Remove ${course.name}`}/>
        </Menu>
        
      </View>
    );
  }
}

const styles = StyleSheet.create({
  listIcons: {
    marginHorizontal: 5,
    color: '#ffffff',
    borderRadius: 4,
    padding: 5,
  },
  listSubIcons: {
    marginVertical: 20,
    marginRight: 10,
  },
  listContainer: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
  },
  listMark: {
    marginHorizontal: 5,
    marginVertical: -7,
  },
  UOCText: {
    color: Colors.tintColor,
  },
  listAccordion: {
    flex: 1,
    width: (Layout.window.width * 0.95) - (Layout.iconSize * 2),
    marginRight: 5,
  },
  sideContent: {
    flexDirection: "column",
    borderLeftWidth: 1.5,
    height: '100%',
    justifyContent: "flex-start",
  },
  moreButton: {
    marginVertical: -3,
  },
  markAverageText: {
    marginVertical: -3,
    fontSize: 13,
    textAlign: "center",
  }
});
