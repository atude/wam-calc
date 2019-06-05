import React from 'react';
import { ScrollView, StyleSheet, AsyncStorage } from 'react-native';
import { Icon } from 'expo';
import Colors from '../constants/Colors';
import { View, } from 'native-base';
import { TitleText } from '../components/TitleText';
import { List, } from 'react-native-paper';

import ItemTerms from '../components/ItemTerm';


export default class SubjectsScreen extends React.Component {
  static navigationOptions = {
    headerTitle: 
      <View style={{flexDirection: "row"}}>
        <Icon.MaterialCommunityIcons 
          size={30} 
          name={'book-open'} 
          color={Colors.tintColor}
          style={{marginLeft: 12}}
          title="Courses"
        />
        <TitleText style={{fontSize: 20, marginLeft: 10, marginTop: 2, color: Colors.tintColor}}>
          Courses
        </TitleText>
      </View>
  };
  
  render() {
    let terms = this.props.data.screenProps.terms;
    return (
      <View style={styles.container}>
        <ScrollView style={styles.containerScroll}>
          {console.log(this.props.data.screenProps)}
          <ItemTerms terms={terms}/>
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
