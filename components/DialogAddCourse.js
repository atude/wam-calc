import React from 'react';
import { Icon } from 'expo';
import { Portal, Dialog, TextInput, RadioButton, Subheading, Text, Button } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';

import Colors from '../constants/Colors.js';

const uocValues = [2,3,6];
const iconValuesA = ["shape", "code-tags", "finance", "math-compass"];
const iconValuesB = ["brush", "music-note", "basketball", "flask"];

export default class DialogAddCourse extends React.Component {
  state = {
    dialogCourseName: "",
    dialogCourseValue: 6,
    dialogCourseIcon: "shape",
  }

  setDialog = () => {
    if(this.state.dialogCourseName === ""){
      this.props.setSnackbar("Please add a name for the course.", "", "");
      return;
    }

    this.props.action(
      this.state.dialogCourseName, 
      this.state.dialogCourseValue,
      this.state.dialogCourseIcon,
    );
    this.resetDialog();
  }

  resetDialog = () => {
    this.props.resetDialogs();
    this.setState({
      dialogCourseName: "",
      dialogCourseValue: 6,
      dialogCourseIcon: "shape",
    })
  }

  render() {
    let { isDialog } = this.props;
    let { dialogCourseName, dialogCourseValue, dialogCourseIcon } = this.state;

    return (
      <Portal>
        <Dialog visible={isDialog} onDismiss={this.resetDialog}>
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
                    <RadioButton value={uoc}/>
                    <Text style={styles.UOCRadioLabel}>{uoc}</Text>
                  </View>
                ))}
              </View>
            </RadioButton.Group>

            <RadioButton.Group 
              onValueChange={dialogCourseIcon => this.setState({dialogCourseIcon})} 
              value={dialogCourseIcon}
            >
              <View style={styles.IconRadioContainer}>
                <Subheading style={styles.IconHeading}>Icon</Subheading>
                {iconValuesA.map(icon => (
                  <View key={`uoc_li_${icon}`} style={styles.IconRadioPicker}>
                    <RadioButton value={icon}/>
                    <Icon.MaterialCommunityIcons size={20} name={icon} style={styles.radioIcons}/>
                  </View>
                ))}
              </View>
              <View style={styles.IconRadioContainer}>
                <View style={styles.IconHeading}/>
                {iconValuesB.map(icon => (
                  <View key={`uoc_li_${icon}`} style={styles.IconRadioPicker}>
                    <RadioButton value={icon}/>
                    <Icon.MaterialCommunityIcons size={20} name={icon} style={styles.radioIcons}/>
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
  radioIcons: {

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
    marginRight: 15,
  },
  UOCRadioLabel: {

  },  
  UOCHeading: {
    flex: 6,
    color: Colors.tintColor,
  },
  IconRadioContainer: {
    flexDirection: 'row',
    alignItems: "center",
    marginHorizontal: 5,
    marginTop: 20,
    flexWrap: 'wrap',
  } ,
  IconRadioPicker: {
    flexDirection: 'column',
    alignItems: "center",
    marginLeft: 15,
    flex: 2,
  },
  IconHeading: {
    flex: 6,
    color: Colors.tintColor,
  },
  actionButtons: {
    margin: 12,
  },
});
