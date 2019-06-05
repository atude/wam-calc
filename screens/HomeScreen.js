import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, } from 'react-native';

import Colors from '../constants/Colors';
import { FAB, Portal, Modal, Dialog, Paragraph } from 'react-native-paper';

export default class HomeScreen extends React.Component {
  render() {
    return (
      <View style={styles.container}>
        
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
