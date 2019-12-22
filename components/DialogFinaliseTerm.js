import React from 'react';
import { Portal, Dialog, Subheading, Button, Caption } from 'react-native-paper';
import { StyleSheet, Picker } from 'react-native';

import Colors from '../constants/Colors.js';

const termValues = ["Term 1", "Term 2", "Term 3", "Semester 1", "Semester 2", "Summer Term"];

export default class DialogFinaliseTerm extends React.Component {
  state = {
    dialogTermPeriod: termValues[0],
    dialogTermYear: new Date().getFullYear().toString(),
  }

  setDialog = () => {
    const year = this.state.dialogTermYear;
    let name = `${year} | ${this.state.dialogTermPeriod}`.toString();
    this.props.action(name);
    this.resetDialog();
  }

  resetDialog = () => {
    this.props.resetDialogs();
  }

  render() {
    let { isDialog } = this.props;
    let { dialogTermPeriod, dialogTermYear } = this.state;
    const currYear = new Date().getFullYear();

    let years = [];
    for(let i = currYear - 3; i <= currYear; i++) {
      years.push(i);
    }

    return (
      <Portal>
        <Dialog visible={isDialog} onDismiss={this.resetDialog}>
          <Dialog.Title>Finalise Term</Dialog.Title>
          <Dialog.Content style={styles.dialogContainer}>
            <Subheading style={styles.pickerHeading}>Select Study Period</Subheading>
            <Picker
              mode="dropdown"
              prompt="Select Study Period"
              selectedValue={dialogTermPeriod}
              style={styles.periodPicker}
              onValueChange={(itemValue) => {setTimeout(() => {this.setState({dialogTermPeriod: itemValue})}, 0)}}>
              {termValues.map(period => (
                <Picker.Item key={period} label={period} value={period}/>
              ))}
            </Picker>

            <Subheading style={styles.pickerHeading}>Select Year</Subheading>
            <Picker
              mode="dropdown"
              prompt="Select Year"
              selectedValue={dialogTermYear}
              style={styles.periodPicker}
              onValueChange={(itemValue) => {setTimeout(() => {this.setState({dialogTermYear: itemValue})}, 0)}}>
              {years.reverse().map(period => (
                <Picker.Item key={period} label={period.toString()} value={period}/>
              ))}
            </Picker>

            <Caption>
              
              You will no longer be able to change courses or marks in this period once it is finalised. 
              Do this if you have completed the current course period. 
            </Caption>
          </Dialog.Content>

          <Dialog.Actions>
            <Button style={styles.actionButtons} onPress={this.resetDialog}>Cancel</Button>
            <Button style={styles.actionButtons} onPress={this.setDialog}>Save</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  dialogContainer: {

  }, 
  periodPicker: {
    width: "100%",
    height: 70,
  },
  pickerHeading: {
    color: Colors.tintColor,
  },
  pickerItem: {
    marginHorizontal: 20,
  },
  actionButtons: {
    margin: 12,
  },
});
