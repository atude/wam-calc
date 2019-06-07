import React from 'react';
import { Icon } from 'expo';
import { Portal, Dialog, TextInput, Button, Subheading, Headline, Caption, } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import Colors from '../constants/Colors.js';
import { Picker } from 'native-base';

export default class DialogAddMark extends React.Component {
  state = {
    dialogMarkName: "",
    dialogMarkValue: "",
    dialogMarkWeight: "",
    dialogMarkCourse: "",
    dialogMarkCourseIndex: 0,
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

    this.props.action(
      this.state.dialogMarkName, 
      this.state.dialogMarkValue,
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
      dialogMarkCourse } = this.state;


    return (
      <Portal>
        <Dialog visible={isDialog} onDismiss={this.resetDialog}>
          <Dialog.Title>Add Mark</Dialog.Title>
          <Dialog.Content style={styles.dialogContainer}>

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
                label="Mark (%)" 
                value={Math.min(parseInt(dialogMarkValue), 100)}
                onChangeText={dialogMarkValue => {this.setState({dialogMarkValue})}}
                mode="outlined"
                render={props =>
                  <TextInputMask {...props} type={'only-numbers'} options={{mask: '999'}}/>
                }
              />

              <TextInput 
                style={styles.textInputR}
                label="Weighting (%)" 
                value={Math.min(parseInt(dialogMarkWeight), 100)}
                onChangeText={dialogMarkWeight => {this.setState({dialogMarkWeight})}}
                mode="outlined"
                render={props =>
                  <TextInputMask {...props} type={'only-numbers'} options={{mask: '999'}}/>
                }
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
