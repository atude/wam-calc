import React from 'react';
import { List, Divider, Subheading, IconButton, } from 'react-native-paper';
import { StyleSheet, View, Picker } from 'react-native';

import ItemTerm from './ItemTerm.js';
import Colors from '../constants/Colors.js';
import ItemCourse from './ItemCourse.js';

export default class ItemPeriod extends React.Component {
  state = {
    filterMethod: "term",
  };

  handleFilter = (filterType) => {
    this.setState({
      filterMethod: filterType,
    });
  };

  getCourseMarkAv = (marks) => {
    if(marks === undefined || marks.length === 0) return 0;

    let avTotal = 0;
    let weightTotal = 0;

    marks.map((mark) => (
      avTotal += parseFloat(mark.mark) * parseFloat(mark.weight)/100,
      weightTotal += parseFloat(mark.weight)
    ));

    return avTotal / weightTotal * 100;
  }

  getWeightedMark = (mark, weight) => {
    return Number(mark) * Number(weight) / 100;
  } 

  getAllCoursesByFilter = (terms, filterMethod) => {
    let allCourses = [];
    const getCourseMarkAv = this.getCourseMarkAv;

    Object.values(terms).map((courses) => {
      courses.map(course => {
        allCourses.push(course);
      })
    });

    //Default to by name (between name and mark)
    switch(filterMethod) {
      case "mark": 
        return allCourses.sort((a, b) => getCourseMarkAv(b.marks) - getCourseMarkAv(a.marks));
      default:
        return allCourses.sort((a,b) => 
          (a.name.toLowerCase() > b.name.toLowerCase()) ? 1 
          : 
          ((b.name.toLowerCase() > a.name.toLowerCase()) ? -1 : 0)
      );
    }
  }

  render() {
    const { terms, deleteHandler, calcWam, isAuType } = this.props;
    const totalUoc = Object.values(terms).reduce((total, currTerm) => total + Object.values(currTerm).reduce((uocTotal, subject) => uocTotal + subject.uoc, 0), 0)
    let { filterMethod } = this.state;

    return (
      <View style={styles.listContainer}>
        <View style={styles.filterButtons}>
          <View style={styles.filterTextContainer}>
            <IconButton
              icon="filter-list"
              color="#fff"
            />
            <Subheading style={styles.filterText}>Filter by</Subheading>
          </View>
          <Picker 
            style={styles.filterPicker} 
            mode="dropdown"
            selectedValue={filterMethod}
            onValueChange={(value) => this.handleFilter(value)}
          >
            <Picker.Item label="Term" value="term"/>
            <Picker.Item label="Mark" value="mark"/>
            <Picker.Item label="Name" value="name"/>
          </Picker>
        </View>
        <View style={styles.completedUnitsView}>
          <Subheading style={styles.completedUnitsText}>
            {totalUoc} Units
          </Subheading>
        </View>

        {filterMethod === "term" ?
          <View>
            <List.Section title="Ongoing Courses">
              <Divider/>
              <ItemTerm
                calcWam={calcWam}
                key={`_currentterm_`}
                terms={terms}
                deleteHandler={deleteHandler}
                keyV={"CurrentTerm"}
                isAuType={isAuType}
              />
            </List.Section>
            
            {/* Only show completed courses if they exist */}
            {Object.keys(terms).length > 1 &&
              <List.Section title="Completed Courses">
                <Divider/>
                {Object.keys(terms).filter(key => key !== "CurrentTerm").sort().reverse().map((key, i) => (
                  <ItemTerm
                    calcWam={calcWam}
                    key={`_${key}_`}
                    terms={terms}
                    deleteHandler={deleteHandler}
                    keyV={key}
                    isAuType={isAuType}
                  />
                ))} 
              </List.Section>
            }
          </View>
          :
          <View>
            {this.getAllCoursesByFilter(terms, filterMethod).map((course, i) => (
              <ItemCourse
                key={course + i}
                course={course}
                deleteHandler={deleteHandler}
                path={null}
                isAuType={isAuType}
              />
            ))} 
          </View>
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
  filterButtons: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    marginRight: 10,
    backgroundColor: Colors.tintColor,
    borderRadius: 20,
  },
  filterTextContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },  
  filterTextIcon: {
    color: "#fff",
  },
  filterText: {
    color: "#fff",
  },
  filterPicker: {
    flex: 0.5,
    color: "#fff",
  },
  completedUnitsView: {
    marginTop: 10,
    marginBottom: -8,
    paddingHorizontal: 16,
  },  
  completedUnitsText: {
    color: Colors.tintColor,
    fontSize: 14,
  }
});
