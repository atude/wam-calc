import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Portal, Dialog, TextInput, RadioButton, Subheading, Button } from 'react-native-paper';
import { StyleSheet, View, Picker } from 'react-native';

import Colors from '../constants/Colors.js';

const uocValues = [2,3,4,6,12];
const iconValuesA = ["code-tags", "database", "dns", "chart-areaspline", "math-compass"];
const iconValuesB = [ "flask", "earth", "bank", "camera", "shape"];
const iconValuesC = ["brush", "music-note", "basketball",  "account-group", "worker", ];


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
          <Dialog.Content>
            <TextInput 
              label="Course Name" 
              value={dialogCourseName}
              onChangeText={dialogCourseName => {this.setState({dialogCourseName})}}
              mode="outlined"
            />

            <View style={styles.UOCPickerContainer}>
              <Subheading style={styles.UOCHeading}>Units of Credit</Subheading>
              <Picker
                style={styles.UOCPicker}
                mode="dropdown"
                selectedValue={dialogCourseValue}
                onValueChange={(itemValue, itemIndex) => {setTimeout(() => 
                  {this.setState({dialogCourseValue: itemValue})}, 0)}}
                >

                {uocValues.map(uoc => (
                  <Picker.Item key={`uoc_${uoc}`} label={uoc.toString()} value={uoc}/>
                ))}
              </Picker>
            </View>           

            <RadioButton.Group 
              onValueChange={dialogCourseIcon => this.setState({dialogCourseIcon})} 
              value={dialogCourseIcon}
            >
              <View style={styles.IconRadioContainer}>
                <Subheading style={styles.IconHeading}>Icon</Subheading>
                {iconValuesA.map(icon => (
                  <View key={`uoc_li_${icon}`} style={styles.IconRadioPicker}>
                    <RadioButton value={icon}/>
                    <MaterialCommunityIcons size={20} name={icon}/>
                  </View>
                ))}
              </View>
              <View style={styles.IconRadioContainer}>
                <View style={styles.IconHeading}/>
                {iconValuesB.map(icon => (
                  <View key={`uoc_li_${icon}`} style={styles.IconRadioPicker}>
                    <RadioButton value={icon}/>
                    <MaterialCommunityIcons size={20} name={icon}/>
                  </View>
                ))}
              </View>
              <View style={styles.IconRadioContainer}>
                <View style={styles.IconHeading}/>
                {iconValuesC.map(icon => (
                  <View key={`uoc_li_${icon}`} style={styles.IconRadioPicker}>
                    <RadioButton value={icon}/>
                    <MaterialCommunityIcons size={20} name={icon}/>
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
  UOCPickerContainer: {
    flexDirection: 'row',
    alignItems: "center",
    marginHorizontal: 5,
    marginTop: 20,
  },
  UOCPicker: {
    flex: 1,
  },
  UOCHeading: {
    flex: 2,
    color: Colors.tintColor,
  },
  IconRadioContainer: {
    flexDirection: 'row',
    alignItems: "center",
    marginHorizontal: 5,
    marginTop: 20,
    flexWrap: 'wrap',
  },
  IconHeading: {
    flex: 6,
    color: Colors.tintColor,
  },
  IconRadioPicker: {
    flexDirection: 'column',
    alignItems: "center",
    marginLeft: 15,
    flex: 2,
  },
  actionButtons: {
    margin: 12,
  },
});
