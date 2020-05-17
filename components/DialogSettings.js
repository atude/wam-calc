import React from 'react';
import { Portal, Dialog, TextInput, Button, Subheading, Caption, Text, IconButton } from 'react-native-paper';
import { StyleSheet, View, Linking, AsyncStorage } from 'react-native';
import Colors from '../constants/Colors.js';
import getFirebase from '../firebase/firebaseConfig.js';
import { signOut } from '../firebase/firebaseFunctions.js';

export default class DialogSettings extends React.Component {
  state = {
    dialogWam: "",
    dialogUoc: "",
    showHelpDialog: false,
  }

  enableLogin = async () => {
    await AsyncStorage.setItem("skipAccount", "false");
    this.props.handleSetSkipAccount("false");
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

  handleHelpDialog = () => {
    this.setState({showHelpDialog: !this.state.showHelpDialog})
  }

  render() {
    let { isDialog } = this.props;
    let { dialogWam, dialogUoc, showHelpDialog } = this.state;

    return (
      <Portal>
        <Dialog visible={isDialog} onDismiss={this.resetDialog}>
          <Dialog.Title>Settings</Dialog.Title>
          <Dialog.Content style={styles.dialogContainer}>
            <Caption style={{color: Colors.tintColor, textAlign: "right", marginTop: -50}}>
              Unicore For Android
            </Caption>
            <Caption style={{color: Colors.tintColor, textAlign: "right"}}>
              Atude (Mozamel Anwary) © {new Date().getFullYear()} {'\n\n'}
            </Caption>
            {getFirebase.auth().currentUser ? 
            <Button 
              mode="text"
              icon="exit-to-app"
              color={Colors.tintColor}
              onPress={signOut}
              compact
            >
              Sign out of {getFirebase.auth().currentUser.email.split("@")[0]}
            </Button>
            : 
            <Button 
              mode="text"
              icon="account-circle"
              color={Colors.tintColor}
              onPress={this.enableLogin}
              compact
            >
              Login/Signup to Unicore
            </Button>
            }
            <Button 
              mode="text"
              compact
              icon="rate-review"
              color={Colors.tintColor}
              onPress={() => Linking.openURL("https://play.google.com/store/apps/details?id=com.atude.mywam")}
            >
              Leave a review
            </Button>

            <View style={{marginTop: 20}}/>

            <View style={styles.existingWamContainer}>
              <Subheading>Use existing WAM</Subheading>
              <IconButton 
                icon="help"
                color={showHelpDialog ? Colors.tintColor : Colors.grey}
                onPress={() => this.handleHelpDialog()}
              />
            </View>

            {showHelpDialog && 
              <Caption>
                Already have a WAM? Use your previous WAM without needing to add back your past courses. {'\n\n'}
                This will delete your progress for this term.{'\n'}
              </Caption>
            }

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
                label="Total Units" 
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
  existingWamContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  }
});
