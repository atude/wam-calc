import React from 'react';
import { Portal, Dialog, TextInput, Button, Subheading, Headline, Caption, Checkbox, } from 'react-native-paper';
import { StyleSheet, View, Picker } from 'react-native';

import Colors from '../constants/Colors.js';

export default class DialogAddMark extends React.Component {
  state = {
    dialogMarkName: "",
    dialogMarkValue: "",
    dialogMarkWeight: "",
    dialogMarkCourse: "",
    dialogMarkCourseIndex: 0,
    isWeightedMark: false,
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

  render() {
    let { isDialog, currentCourses } = this.props;
    let { dialogMarkName, dialogMarkValue, dialogMarkWeight, 
      dialogMarkCourse, isWeightedMark } = this.state;


    return (
      <Portal>
        <Dialog visible={isDialog} onDismiss={this.resetDialog}>
          <Dialog.Title>Add Mark</Dialog.Title>
          <Dialog.Content style={styles.dialogContainer}>

            <View style={{flexDirection: 'row', marginBottom: 4}}>
              <Checkbox onPress={() => this.setState({isWeightedMark: !isWeightedMark})} 
                status={isWeightedMark ? 'checked' : 'unchecked'}>
              </Checkbox>
              <Subheading style={styles.checkboxText} 
                onPress={() => this.setState({isWeightedMark: !isWeightedMark})}>
                Pre-weighted
              </Subheading>
            </View>

            <TextInput 
              style={styles.textInputFull}
              label="Assessment Name" 
              value={dialogMarkName}
              onChangeText={dialogMarkName => {this.setState({dialogMarkName})}}
              mode="outlined"
            />           

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
    textAlign: 'right',
    textAlignVertical: 'center'
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
});
