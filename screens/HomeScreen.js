import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

import Colors from '../constants/Colors';
import { FAB, Portal, Modal, Dialog, Paragraph } from 'react-native-paper';

export default class HomeScreen extends React.Component {
  state = {
    addDialogVisible: false,
    currentCourses: [],
  }

  static navigationOptions = {
    header: null,
  };

  addMarkDialog = (state) => {
    this.setState({addDialogVisible: state});
  }

  render() {
    return (
      <View style={styles.container}>
        <Portal>
          <Dialog visible={this.state.addDialogVisible} onDismiss={()=>this.addMarkDialog(false)}>
            <Dialog.Title>Add Mark</Dialog.Title>
            <Dialog.Content>
              <Paragraph>dab</Paragraph>
            </Dialog.Content>
          </Dialog>
       </Portal>
      </View>
    );
  }

 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fab: {
    position: 'absolute',
    margin: 18,
    right: 0,
    bottom: 0,
  },
});
