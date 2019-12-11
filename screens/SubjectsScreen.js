import React from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';

import ItemPeriod from '../components/ItemPeriod';

export default class SubjectsScreen extends React.Component {
  render() {
    const getProps = this.props.data.screenProps;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.containerScroll}>
          <ItemPeriod calcWam={getProps.calcWam} terms={getProps.terms} deleteHandler={getProps.deleteHandler}/>
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
