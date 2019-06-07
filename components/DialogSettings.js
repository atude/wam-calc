import React from 'react';
import { Icon } from 'expo';
import { Portal, Dialog, TextInput, Button, Subheading, Headline, Caption, } from 'react-native-paper';
import { StyleSheet, View } from 'react-native';
import { TextInputMask } from 'react-native-masked-text';

import Colors from '../constants/Colors.js';
import { Picker } from 'native-base';

export default class DialogSettings extends React.Component {
  state = {
    dialogWam: "0.00",
    dialogUoc: "",
  }

  setDialog = () => { 
    if(this.state.dialogWam === ""){
      this.props.setSnackbar("Please add an existing WAM.", "", "");
      return;
    }

    if(this.state.dialogUoc === ""){
      this.props.setSnackbar("Please add previous units of credit for your courses.", "", "");
      return;
    }

    console.log("DIUALOF")
    console.log(this.state.dialogWam);

    this.props.action(
      this.state.dialogWam, 
      this.state.dialogUoc,
    );

    this.resetDialog();
  }

  resetDialog = () => {
    this.props.resetDialogs();
    this.setState({
      dialogWam: "",
      dialogUoc: "",
    })
  }

  render() {
    let { isDialog } = this.props;
    let { dialogWam, dialogUoc, } = this.state;


    return (
      <Portal>
        <Dialog visible={isDialog} onDismiss={this.resetDialog}>
          <Dialog.Title>About</Dialog.Title>
          <Dialog.Content style={styles.dialogContainer}>

            <Caption style={{color: Colors.tintColor}}>
              MyWam For Android
            </Caption>
            <Caption style={{color: Colors.tintColor}}>
              Atude / Mozamel Anwary © {new Date().getFullYear()} {'\n\n'}
            </Caption>

            <Subheading>Use existing WAM</Subheading>
            <Caption>
              Already have a WAM? Use your previous WAM without needing to add back your past courses. {'\n\n'}
              This will delete your progress for this term.{'\n'}
            </Caption>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.textInputL}
                label="Previous WAM" 
                value={Math.min(parseFloat(dialogWam), 100.00)}
                onChangeText={dialogWam => {this.setState({dialogWam})}}
                mode="flat"
                render={props =>
                  <TextInputMask {...props} type={'money'} 
                    options={{precision: 2, separator: '.', unit: '', suffixUnit: ''}}/>
                }
              />

              <TextInput 
                style={styles.textInputR}
                label="Total Credits" 
                value={parseInt(dialogUoc)}
                onChangeText={dialogUoc => {this.setState({dialogUoc})}}
                mode="flat"
                render={props =>
                  <TextInputMask {...props} type={'only-numbers'}/>
                }
              />
            </View>

          </Dialog.Content>
          <Dialog.Actions>
            <Button style={styles.actionButtons} onPress={this.resetDialog}>Back</Button>
            <Button style={styles.actionButtons} onPress={this.setDialog}>Add Wam</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  actionButtons: {
    margin: 12,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 70,
  },
  textInputR: {
    flex: 1,
    height: 90,
    marginLeft: 5,
    marginVertical: 15,
  },
  textInputL: {
    flex: 1,
    height: 90,
    marginRight: 5,
    marginVertical: 15,
  },
});
