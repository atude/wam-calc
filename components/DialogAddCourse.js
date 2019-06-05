import React from 'react';
import { Icon } from 'expo';
import { Portal, Dialog, TextInput, RadioButton, Subheading, Text, Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

import Colors from '../constants/Colors.js';

const uocValues = [2,3,6];

export default class DialogAddCourse extends React.Component {
  state = {
    dialogCourseName: "",
    dialogCourseValue: 6,
  }

  setDialog = () => {
    this.props.createCourse(this.state.dialogCourseName, this.state.dialogCourseValue);
    this.resetDialog();
  }

  resetDialog = () => {
    this.props.resetDialogs();
    this.setState({
      dialogCourseName: "",
      dialogCourseValue: 6,
    })
  }

  render() {
    let { isDialogAddCourse } = this.props;
    let { dialogCourseName, dialogCourseValue } = this.state;

    return (
      <Portal>
        <Dialog visible={isDialogAddCourse} onDismiss={this.resetDialog}>
          <Dialog.Title>Add Course</Dialog.Title>
          <Dialog.Content style={styles.dialogContainer}>
            <TextInput 
              label="Course Name" 
              value={dialogCourseName}
              onChangeText={dialogCourseName => {this.setState({dialogCourseName})}}
              mode="outlined"
            />

            <RadioButton.Group 
              onValueChange={dialogCourseValue => this.setState({dialogCourseValue})} 
              value={dialogCourseValue}
            >
              <View style={styles.UOCRadioContainer}>
                <Subheading style={styles.UOCHeading}>Units of Credit</Subheading>
                {uocValues.map(uoc => (
                  <View key={`uoc_li_${uoc}`} style={styles.UOCRadioPicker}>
                    <Text style={styles.UOCRadioLabel}>{uoc}</Text>
                    <RadioButton value={uoc}/>
                  </View>
                ))}
              </View>
            </RadioButton.Group>
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
  listIcons: {

  },
  UOCRadioContainer: {
    flexDirection: 'row',
    alignItems: "center",
    marginHorizontal: 5,
    marginTop: 20,
  } ,
  UOCRadioPicker: {
    flexDirection: 'row',
    alignItems: "center",
    flex: 1,
    marginLeft: 15,
  },
  UOCRadioLabel: {

  },  
  UOCHeading: {
    flex: 6,
  },
  actionButtons: {
    margin: 12,
  },
});
