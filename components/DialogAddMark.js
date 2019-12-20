import React from 'react';
import { Portal, Dialog, TextInput, Button, Subheading, Headline, Caption, Checkbox, IconButton, Text, } from 'react-native-paper';
import { StyleSheet, View, Picker } from 'react-native';

import Colors from '../constants/Colors.js';

export default class DialogAddMark extends React.Component {
  state = {
    dialogMarkName: "",
    dialogMarkValue: "",
    dialogMarkWeight: "",
    dialogMarkCourse: "",
    dialogMarkCourseTotal: "",
    dialogMarkCourseIndex: 0,
    isWeightedMark: false,
    determineFromCourse: false,
    showHelpDialog: false,
  }

  setDialog = () => { 
    if(this.state.dialogMarkName === ""){
      this.props.setSnackbar("Please add a name for the assessment.", "", "");
      return;
    }

    if(this.state.dialogMarkValue === ""){
      this.props.setSnackbar("Please add a mark for the assessment.", "", "");
      return;
    }

    if(this.state.dialogMarkWeight === ""){
      this.props.setSnackbar("Please add a weighting for the assessment.", "", "");
      return;
    }

    const normalisedMark = !this.state.isWeightedMark ? this.state.dialogMarkValue : (this.state.dialogMarkValue / (this.state.dialogMarkWeight / 100));
    this.props.action(
      this.state.dialogMarkName, 
      normalisedMark,
      this.state.dialogMarkWeight,
      this.state.dialogMarkCourseIndex,
    );
    this.resetDialog();
  }

  resetDialog = () => {
    this.props.resetDialogs();
    this.setState({
      dialogMarkName: "",
      dialogMarkValue: "",
      dialogMarkWeight: "",
      dialogMarkCourse: "",
      dialogMarkCourseIndex: 0,
    })
  }

  handleWeightedMarkSwitch = () => {
    this.setState({
      isWeightedMark: !this.state.isWeightedMark,
      determineFromCourse: false,
    });
  }

  handleDetermineMarkSwitch = () => {
    this.setState({
      isWeightedMark: false,
      determineFromCourse: !this.state.determineFromCourse,
    });
  }

  handleHelpDialog = () => {
    this.setState({showHelpDialog: !this.state.showHelpDialog})
  }

  setDeterminedMark = (courseTotal) => {
    const { dialogMarkCourseIndex, } = this.state;
    const { currentCourses, } = this.props;

    const marks = currentCourses[dialogMarkCourseIndex].marks ?? [];
    let remainingWeight = 100 - marks.reduce((a, b) => a + Number(b.weight), 0);
    let finalAssessmentMark = courseTotal - marks.reduce((a, b) => a + (Number(b.weight) / 100) * Number(b.mark), 0);
    finalAssessmentMark = finalAssessmentMark / remainingWeight * 100;

    console.log(remainingWeight);
    console.log(finalAssessmentMark);

    if(marks.length) {
      
    }

    if(finalAssessmentMark < 0) finalAssessmentMark = 0;
    if(finalAssessmentMark > 100) finalAssessmentMark = 100;

    this.setState({
      dialogMarkValue: finalAssessmentMark.toString(),
      dialogMarkWeight: remainingWeight,

      dialogMarkCourseTotal: courseTotal,
    });
  };

  render() {
    let { isDialog, currentCourses } = this.props;
    let { dialogMarkName, dialogMarkValue, dialogMarkWeight, dialogMarkCourseTotal,
      dialogMarkCourse, showHelpDialog, isWeightedMark, determineFromCourse } = this.state;

    return (
      <Portal>
        <Dialog visible={isDialog} onDismiss={this.resetDialog}>
          <Dialog.Title>Add Mark</Dialog.Title>
          <Dialog.Content style={styles.dialogContainer}>

            <View style={{flexDirection: 'row', marginBottom: 4}}>
              <Checkbox onPress={() => this.handleWeightedMarkSwitch()} 
                status={isWeightedMark ? 'checked' : 'unchecked'}>
              </Checkbox>
              <Subheading style={styles.checkboxText} 
                onPress={() => this.handleWeightedMarkSwitch()}>
                Pre-weighted
              </Subheading>
            </View>

            <View style={{flexDirection: 'row', marginBottom: 18, alignItems: "center"}}>
              <Checkbox onPress={() => this.handleDetermineMarkSwitch()} 
                status={determineFromCourse ? 'checked' : 'unchecked'}>
              </Checkbox>
              <Subheading style={styles.checkboxText} 
                onPress={() => this.handleDetermineMarkSwitch()}>
                Determine last assessment mark from course total
              </Subheading>
              <IconButton
                icon="help"
                color={showHelpDialog ? Colors.tintColor : Colors.grey}
                onPress={() => this.handleHelpDialog()}
              />
            </View>

            {showHelpDialog && 
              <Text style={styles.helpDialogText}>
                Use this option when you have the total course mark for a course, but have 
                not been given the mark for the final assessment (usually for final exams).
              </Text>
            }

            <TextInput 
              style={styles.textInputFull}
              label="Assessment Name" 
              value={dialogMarkName}
              onChangeText={dialogMarkName => {this.setState({dialogMarkName})}}
              mode="outlined"
            />           

            {determineFromCourse ? 
              <View style={styles.inputContainer}>
                <TextInput 
                  disabled
                  style={styles.textInputL}
                  label={"Determined Mark (%)"} 
                  keyboardType={'numeric'}
                  value={(Number(dialogMarkValue) > 100 || dialogMarkValue.length > 5) ? dialogMarkValue.slice(0, 2) : dialogMarkValue}
                  onChangeText={dialogMarkValue => {this.setState({dialogMarkValue})}}
                  mode="outlined"
                />

                <TextInput 
                  style={styles.textInputR}
                  label={"Course Total"}
                  value={(Number(dialogMarkCourseTotal) > 100 || dialogMarkCourseTotal.length > 5) ? dialogMarkCourseTotal.slice(0, 2) : dialogMarkCourseTotal}
                  onChangeText={courseTotal => this.setDeterminedMark(courseTotal)}
                  mode="outlined"
                  keyboardType={'numeric'}
                />
              </View>
            :
              <View style={styles.inputContainer}>
                <TextInput 
                  style={styles.textInputL}
                  label={!isWeightedMark ? "Mark (%)" : "Weighted Mark"} 
                  keyboardType={'numeric'}
                  value={(Number(dialogMarkValue) > 100 || dialogMarkValue.length > 5) ? dialogMarkValue.slice(0, 2) : dialogMarkValue}
                  onChangeText={dialogMarkValue => {this.setState({dialogMarkValue})}}
                  mode="outlined"
                />

                <TextInput 
                  style={styles.textInputR}
                  label={!isWeightedMark ? "Weighting (%)" : "Weight Total"}
                  value={(Number(dialogMarkWeight) > 100 || dialogMarkWeight.length > 5) ? dialogMarkWeight.slice(0, 2) : dialogMarkWeight}
                  onChangeText={dialogMarkWeight => {this.setState({dialogMarkWeight})}}
                  mode="outlined"
                  keyboardType={'numeric'}
                />
              </View>
            }
         
          
            <Subheading style={styles.courseHeading}>Select Course</Subheading>
            <Picker
              mode="dropdown"
              selectedValue={dialogMarkCourse}
              onValueChange={(itemValue, itemIndex) => {setTimeout(() => 
                {this.setState({dialogMarkCourse: itemValue, dialogMarkCourseIndex: itemIndex})}, 0)}}
              >
              {currentCourses.map(course => (
                <Picker.Item key={course.name} label={course.name} value={course.name}/>
              ))}
            </Picker>

          </Dialog.Content>
          <Dialog.Actions>
            <Button style={styles.actionButtons} onPress={this.resetDialog}>Cancel</Button>
            <Button style={styles.actionButtons} onPress={this.setDialog}>Add</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  checkboxText: {
    textAlign: 'left',
    textAlignVertical: 'center',
    flex: 1,
    marginLeft: 5,
    fontSize: 15,
  },
  dialogContainer: {

  }, 
  actionButtons: {
    margin: 12,
  },
  textInputFull: {

  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 40,
  },
  textInputR: {
    flex: 1,
    height: 65,
    marginLeft: 5,
  },
  textInputL: {
    flex: 1,
    height: 65,
    marginRight: 5,
  },
  courseHeading: {
    marginTop: 45,
    marginLeft: 5,
    color: Colors.tintColor,
  },
  helpDialogText: {
    paddingBottom: 30,
    paddingLeft: 30,
    paddingRight: 30,

    color: Colors.grey,
  }
});
