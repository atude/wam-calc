import React from 'react';
import { StyleSheet } from 'react-native';
import { View, Picker, } from 'native-base';
import { Text, Subheading, TextInput, Caption } from 'react-native-paper';

import Colors from '../constants/Colors.js';

export default class RequirementsScreen extends React.Component {
  state = {
    course: "",
    courseIndex: 0,
    markWeight: "",
  } 

  getRequirements = (currentCourses) => {
    const course = currentCourses[this.state.courseIndex];
    let requirements = [50,65,75,85];
    let weightedTotal = 0;

    if (course !== undefined) {
      weightedTotal = course.marks.reduce((a, b) => a + (b.mark / 100 * b.weight), 0);
    } else {
      return [101,101,101,101];
    }

    requirements.forEach((requirement, i) => {
      requirements[i] = ((requirement - weightedTotal) / this.state.markWeight * 100).toFixed(2);
    });

    console.log("total: ", weightedTotal);
    console.log("requirements: ", requirements);
    return requirements;
  }

  render() {
    const getProps = this.props.data.screenProps;

    let { currentCourses  } = getProps
    let { course, markWeight } = this.state;
    let requirements = this.getRequirements(currentCourses);

    console.log(currentCourses);

    return (
      <View style={styles.container}>
        <View style={styles.viewContainer}>
          <Subheading style={styles.subheadingText}>
            {requirements[3] > 100 && "You cannot HD at this stage."}
            {requirements[3] <= 0 && "You have already HD'd this course"}
            {requirements[3] > 0 && requirements[3] <= 100 && 

            <Text style={{color: Colors.grey}}>You need 
              <Text style={[styles.levelText, {color: Colors.hd}]}> {requirements[3]}%</Text> to 
              <Text style={[styles.levelText, {color: Colors.hd}]}> HD (85+)</Text>
            </Text>
            }
          </Subheading>
          <Subheading style={styles.subheadingText}>
            {requirements[2] > 100 && "You cannot DN at this stage."}
            {requirements[2] <= 0 && "You have already DN'd this course"}
            {requirements[2] > 0 && requirements[2] <= 100 && 

            <Text style={{color: Colors.grey}}>You need 
              <Text style={[styles.levelText, {color: Colors.dn}]}> {requirements[2]}%</Text> to 
              <Text style={[styles.levelText, {color: Colors.dn}]}> DN (75+)</Text>
            </Text>
            }
          </Subheading>
          <Subheading style={styles.subheadingText}>
            {requirements[1] > 100 && "You cannot CR at this stage."}
            {requirements[1] <= 0 && "You have already CR'd this course"}
            {requirements[1] > 0 && requirements[1] <= 100 && 

            <Text style={{color: Colors.grey}}>You need 
              <Text style={[styles.levelText, {color: Colors.cr}]}> {requirements[1]}%</Text> to 
              <Text style={[styles.levelText, {color: Colors.cr}]}> CR (65+)</Text>
            </Text>
            }
          </Subheading>
          <Subheading style={styles.subheadingText}>
            {requirements[0] > 100 && "You cannot PS at this stage."}
            {requirements[0] <= 0 && "You have already PS'd this course"}
            {requirements[0] > 0 && requirements[0] <= 100 && 

            <Text style={{color: Colors.grey}}>You need 
              <Text style={[styles.levelText, {color: Colors.ps}]}> {requirements[0]}%</Text> to 
              <Text style={[styles.levelText, {color: Colors.ps}]}> PS (50+)</Text>
            </Text>
            }
          </Subheading>
        </View>

        <Caption style={styles.infoText}>Find out what you need to score on your next assessment to reach course milestones.</Caption>

        <View style={styles.inputParentContainer}>
          <Subheading style={styles.courseHeading}>Select Course</Subheading>
          <View style={styles.inputContainer}>
            <Picker
              style={{height: 65}}
              mode="dropdown"
              selectedValue={course}
              onValueChange={(itemValue, itemIndex) => {setTimeout(() => 
                {this.setState({course: itemValue, courseIndex: itemIndex})}, 0)}}
              >
              {currentCourses.map(course => (
                <Picker.Item key={course.name} label={course.name} value={course.name}/>
              ))}
            </Picker>

            <TextInput 
              style={styles.textInputWeight}
              label={"Assessment Weight"}
              value={(Number(markWeight) > 100 || markWeight.length > 5) ? markWeight.slice(0, 2) : markWeight}
              onChangeText={markWeight => {this.setState({markWeight: (Number(markWeight) > 100 || markWeight.length > 5) ? markWeight.slice(0, 2) : markWeight})}}
              mode="outlined"
              keyboardType={'numeric'}
            />
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    color: Colors.tintColor,
    width: "100%",
  },
  requirementsContainer: {
    padding: 10,
  },  
  viewContainer: {
    borderColor: Colors.tintColor,
    borderStyle: "solid",
    borderWidth: 4,
    borderRadius: 5,
    margin: 30,
    paddingBottom: 40,
  },
  subheadingText: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 40,
    color: Colors.grey
  },
  levelText: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  textInputWeight: {
    flex: 1,
    height: 65,
    marginLeft: 5,
  },
  courseHeading: {
    color: Colors.tintColor,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  inputParentContainer: {
    margin: 30
  },
  infoText: {
    marginTop: -10, 
    marginLeft: 40,
    marginRight: 40
  }
});
