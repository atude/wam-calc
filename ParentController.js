import React from 'react';
import AppNavigator from './navigation/AppNavigator';

import { Portal, FAB, } from 'react-native-paper';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import DialogAddCourse from './components/DialogAddCourse';
import DialogFinaliseTerm from './components/DialogFinaliseTerm';

export default class ParentController extends React.Component {
  state = {
    open: false,

    terms: {},
    currentCourses: [],
    
    isDialogAddCourse: false,
    isDialogAddMark: false,
    isDialogFinaliseTerm: false,
  }

  loadData = async () => {
    try {
      let get = await AsyncStorage.getItem('terms');
      if (get !== null) {
        console.log(get);
        get = JSON.parse(get);

        this.setState({
          terms: get,
          currentCourses: get.CurrentTerm
        })
      }
    } catch (error) {
      console.log("Bad/No Load");
    }
  }

  saveData = async () => {
    try {
      await AsyncStorage.setItem('terms', JSON.stringify(appState.terms));
    } catch (error) {
      console.log("Bad Save");
    }

    console.log("Saved.");
  }

  addMark = () => {

  }

  createCourse = (name, uoc) => {
    let currentCourses = this.state.currentCourses;
    let terms = this.state.terms;

    currentCourses.push({name: name, uoc: uoc});
    terms.CurrentTerm = currentCourses;

    this.setState({
      terms: terms,
      currentCourses: currentCourses
    })
    
    this.saveData();
  }

  finaliseTerm = (name) => {
    let currentCourses = this.state.currentCourses;
    let terms = this.state.terms;

    terms[[name]] = currentCourses;
    terms.CurrentTerm = [];    

    this.setState({
      terms: terms,
      currentCourses: []
    })
    
    this.saveData();
  }

  resetDialogs = () => {
    this.setState({
      isDialogAddCourse: false,
      isDialogAddMark: false,
      isDialogFinaliseTerm: false,
    })
  }

  componentDidMount = () => {
    this.loadData();
  }

  render() {
    let { isDialogAddCourse, isDialogAddMark, isDialogFinaliseTerm, 
      dialogCourseName, dialogCourseValue, terms, currentCourses } = this.state;

    return(
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}
        <AppNavigator screenProps={{terms: terms, currentCourses: currentCourses}}/>

        <Portal>
          <FAB.Group
            style={styles.fab}
            open={this.state.open}
            icon={this.state.open ? 'keyboard-arrow-down' : 'add'}
            actions={[
              {icon: 'spellcheck', label: 'Add Mark', onPress: () => this.setState({isDialogAddMark: true})},
              {icon: 'note-add', label: 'Create New Course', onPress: () => this.setState({isDialogAddCourse: true})},
              {icon: 'school', label: 'Finalise Current Term', onPress: () => this.setState({isDialogFinaliseTerm: true})},
            ]}
            onStateChange={({ open }) => this.setState({ open })}
          />
        </Portal>
        
        <DialogAddCourse 
          resetDialogs={this.resetDialogs} 
          createCourse={this.createCourse} 
          isDialogAddCourse={isDialogAddCourse}
        />
        <DialogFinaliseTerm 
          resetDialogs={this.resetDialogs} 
          finaliseTerm={this.finaliseTerm} 
          isDialogFinaliseTerm={isDialogFinaliseTerm}
        />
        
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    width: "100%",
  },
  fab: {
    paddingBottom: 50,
  },
  dialogContainer: {

  }, 
  UOCRadioContainer: {
    flexDirection: 'row',
    alignItems: "center",
    marginHorizontal: 5,
    marginTop: 20,
  } ,
  UOCRadioPicker: {
    flexDirection: 'row',
    alignItems: "center",
    flex: 1,
    marginLeft: 15,
  },
  UOCRadioLabel: {

  },  
  UOCHeading: {
    flex: 6,
  },
  UOCActionButtons: {
    margin: 12,
  },
});