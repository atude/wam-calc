import React from 'react';
import { ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import { Icon } from 'expo';
import Colors from '../constants/Colors';
import { View, } from 'native-base';
import { List, } from 'react-native-paper';

import ItemPeriod from '../components/ItemPeriod';


export default class SubjectsScreen extends React.Component {
  render() {
    const getProps = this.props.data.screenProps;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.containerScroll}>
          <ItemPeriod terms={getProps.terms} deleteHandler={getProps.deleteHandler}/>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: "100%",
  },
  containerScroll: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
    width: "100%",
  },
});
