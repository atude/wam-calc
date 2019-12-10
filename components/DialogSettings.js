import React from 'react';
import { Portal, Dialog, TextInput, Button, Subheading, Headline, Caption, } from 'react-native-paper';
import { StyleSheet, View, Linking } from 'react-native';
import Colors from '../constants/Colors.js';
import getFirebase from '../firebase/firebaseConfig.js';
import { signOut } from '../firebase/firebaseFunctions.js';

export default class DialogSettings extends React.Component {
  state = {
    dialogWam: "",
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
            <Button 
                mode="text"
                color={Colors.tintColor}
                onPress={signOut}
              >
              Sign out from {getFirebase.auth().currentUser.email}
            </Button>
            <Button 
                mode="text"
                icon="rate-review"
                color={Colors.tintColor}
                onPress={() => Linking.openURL("https://play.google.com/store/apps/details?id=com.atude.mywam")}
              >
              Leave a review!
            </Button>

            <Caption style={{color: Colors.tintColor}}>
              {'\n'}myWam For Android
            </Caption>
            <Caption style={{color: Colors.tintColor}}>
              Atude / Mozamel Anwary © {new Date().getFullYear()} {'\n'}
            </Caption>
          
            

            <Subheading>{'\n'}Use existing WAM</Subheading>
            <Caption>
              Already have a WAM? Use your previous WAM without needing to add back your past courses. {'\n\n'}
              This will delete your progress for this term.{'\n'}
            </Caption>
            <View style={styles.inputContainer}>
              <TextInput 
                style={styles.textInputL}
                label="Previous WAM" 
                keyboardType={'numeric'}
                value={(Number(dialogWam) > 100 || dialogWam.length > 5) ? dialogWam.slice(0, 2) : dialogWam}
                onChangeText={dialogWam => {this.setState({dialogWam})}}
                mode="flat"
              />

              <TextInput 
                style={styles.textInputR}
                label="Total Credits" 
                value={parseInt(dialogUoc)}
                onChangeText={dialogUoc => {this.setState({dialogUoc})}}
                mode="flat"
                keyboardType={'numeric'}
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
    height: 65,
    marginLeft: 5,
    marginVertical: 15,
  },
  textInputL: {
    flex: 1,
    height: 65,
    marginRight: 5,
    marginVertical: 15,
  },
});
