import React from 'react';
import AppNavigator from './navigation/AppNavigator';

import { Portal, FAB, Snackbar, } from 'react-native-paper';
import { Platform, StatusBar, StyleSheet, View, AsyncStorage } from 'react-native';
import DialogAddCourse from './components/DialogAddCourse';
import DialogFinaliseTerm from './components/DialogFinaliseTerm';
import DialogAddMark from './components/DialogAddMark';
import DialogSettings from './components/DialogSettings';

import Colors from './constants/Colors';
import getFirebase from './firebase/firebaseConfig';
import Layout from './constants/Layout';

export default class ParentController extends React.Component {
  state = {
    open: false,

    terms: {},
    currentCourses: [],

    wam: 0,
    termWam: 0,
    bestCourse: "",
    worstCourse: "",
    
    isDialogAddCourse: false,
    isDialogAddMark: false,
    isDialogFinaliseTerm: false,
    isSnackbar: false,
    isDialogSettings: false,

    snackbarMsg: "",
    snackbarAction: "",
    snackbarActionLabel: "",
  }
  
  resetDialogs = () => {
    this.setState({
      isDialogAddCourse: false,
      isDialogAddMark: false,
      isDialogFinaliseTerm: false,
      isDialogSettings: false,
    })
  }

  loadData = async () => {
    let get = await AsyncStorage.getItem('terms');
    let timestamp = await AsyncStorage.getItem('timestamp');

    //Get firebase save
    let getOnline = null;
    if(this.props.email) {
      getOnline = await getFirebase.firestore()
      .collection("users")
      .doc(this.props.email)
      .get()
      .then((doc) => {
        if(doc.exists && 
            (!!doc.data().timestamp && !!timestamp &&
            Number(doc.data().timestamp) > Number(timestamp))
            ||
            (!timestamp))
          return doc.data().terms;
        else
          return null
      }).catch((error) => {
        console.log(error.message);
      });
    }
    
    //If online exists and is newer
    if(getOnline != null) {
      get = getOnline;
    } else {
      //Process local save
      get = JSON.parse(get);

      if(get === undefined || Object.keys(get).length === 0) {
        get = {"CurrentTerm": []};
      }

      console.log(get);
    }

    console.log("Loaded");

    //Dont save to file, but set state
    let wams = this.calcWam(get);
    let bestWorst = this.calcBestWorst(get.CurrentTerm);

    this.setState({
      terms: get,
      currentCourses: get.CurrentTerm,
      wam: wams[0],
      termWam: wams[1],
      bestWorst: bestWorst,
    });
  }

  setSave = async (terms, currentCourses) => {
    let wams = this.calcWam(terms);
    let bestWorst = this.calcBestWorst(currentCourses);

    this.setState({
      terms: terms,
      currentCourses: currentCourses,
      wam: wams[0],
      termWam: wams[1],
      bestWorst: bestWorst,
    })

    try {
      //Timestamp needed for data syncing
      const timestamp = new Date().valueOf().toString();

      await AsyncStorage.setItem('terms', JSON.stringify(terms));
      await AsyncStorage.setItem('timestamp', timestamp);
      if(this.props.email) {
        await getFirebase.firestore()
        .collection("users")
        .doc(this.props.email)
        .set({
          terms: terms,
          timestamp: timestamp
        });
        console.log("Saved to firebase");
      }
   
      console.log("Saved");
    } catch (error) {
      console.log("Bad Save");
      console.log(error);
    }
  }

  addMark = (name, mark, weight, courseIndex) => {
    let currentCourses = this.state.currentCourses;
    let terms = this.state.terms;

    currentCourses[courseIndex]["marks"].unshift({name: name, mark: mark, weight: weight});
    terms.CurrentTerm = currentCourses;

    this.setSave(terms, currentCourses);
  }

  createCourse = (name, uoc, icon) => {
    let currentCourses = this.state.currentCourses;
    let terms = this.state.terms;

    currentCourses.unshift({name: name, uoc: uoc, icon: icon, marks: []});
    terms.CurrentTerm = currentCourses;

    this.setSave(terms, currentCourses);
  }

  finaliseTerm = (name) => {
    let currentCourses = this.state.currentCourses;
    let terms = this.state.terms;

    terms[[name]] = currentCourses;
    terms.CurrentTerm = [];    

    this.setSave(terms, []);
  }

  deleteHandler = (path) => {
    let terms = this.state.terms;

    path.length === 3 && terms[[path[0]]][path[1]].marks.splice(path[2], 1)
      && this.setSnackbar(`Removed assessment.`, "", "");
    path.length === 2 && terms[[path[0]]].splice(path[1], 1)
      && this.setSnackbar(`Removed course.`, "", "");
    path.length === 1 && delete terms[[path[0]]]
      && this.setSnackbar(`Removed term.`, "", "");

    this.setSave(terms, terms.CurrentTerm);
  }

  setSnackbar = (msg, label, action) => {
    this.setState({
      snackbarMsg: msg,
      snackbarActionLabel: label,
      snackbarAction: action,
      isSnackbar: true,
    })
  }

  calcWam = (terms) => {
    let courseTotals = [];
    let currentCourseTotals = [];
    let avTotal = 0;
    let weightTotal = 0;
    let uocTotal = 0;
    let uocParentTotal = 0;

    let wam = 0;
    let termWam = 0;

    Object.keys(terms).map(termKey => (
      terms[termKey].map(course => course.marks.length !== 0 && (uocParentTotal += Number(course.uoc)))
    ));
    
    Object.keys(terms).map(termKey => {
      uocTotal = 0;
      terms[termKey].map(course => course.marks.length !== 0 && (uocTotal += Number(course.uoc)));
      
      currentCourseTotals = [],
      terms[termKey].map(course => {
        avTotal = 0,
        weightTotal = 0,
  
        course.marks.map(mark => {
          avTotal += Number(mark.mark) * Number(mark.weight)/100;
          weightTotal += Number(mark.weight);
        });
  
        if (course.marks.length !== 0) {
          //--> Round this value to get UNSW WAM
          const weightedMark = Math.round(avTotal / weightTotal * 100);

          courseTotals.push(weightedMark * course.uoc);
          currentCourseTotals.push(weightedMark * course.uoc / uocTotal);
        };
      });

      if (termKey === "CurrentTerm") {
        termWam = currentCourseTotals.reduce(((prev, curr) => prev + curr), 0).toFixed(2);
      };
    });

    wam = (courseTotals.reduce(((prev, curr) => prev + curr), 0) / uocParentTotal).toFixed(2);

    console.log("Term wam");
    console.log(termWam);
    console.log("Total wam");
    console.log(wam);

    return [isNaN(wam) ? 0 : wam, isNaN(termWam) ? 0 : termWam];
  }

  calcBestWorst = (currentCourses) => {
    const defState = [["--", 0], ["--", 0]];
    if(currentCourses.length === 0) return defState;

    let avTotal = 0;
    let weightTotal = 0;
    let currentCourseTotals = {};

    currentCourses.map(course => {
      avTotal = 0,
      weightTotal = 0,

      course.marks.map(mark => (
        avTotal += parseFloat(mark.mark) * parseFloat(mark.weight)/100,
        weightTotal += parseFloat(mark.weight)
      )),

      course.marks.length !== 0 && (
        currentCourseTotals[course.name] = avTotal / weightTotal * 100
      )
    })

    if(Object.values(currentCourseTotals).length === 0) return defState;

    const best = Object.keys(currentCourseTotals).reduce(function(a, b) { 
      return currentCourseTotals[a] > currentCourseTotals[b] ? a : b 
    }, 0);

    let worst = Object.keys(currentCourseTotals).reduce(function(a, b) { 
      return currentCourseTotals[a] < currentCourseTotals[b] ? a : b 
    }, 0);


    if(best === worst) {
      worst = "--";
      currentCourseTotals[[worst]] = 0;
    };

    return [[best, currentCourseTotals[[best]].toFixed(2)], [worst, currentCourseTotals[[worst]].toFixed(2)]];
  }

  addExistingWam = (wam, uoc) => {
    this.setState({currentCourses: []});
    setTimeout(() => {
      this.doOldWam(wam, uoc)
    }, 100);
  
  }

  doOldWam = (wam, uoc) => {
    this.createCourse("Existing Courses", uoc, "file");
    this.addMark("Existing Courses", wam, 100, 0);
    this.finaliseTerm("Existing WAM");

    let terms = this.state.terms;
    terms.CurrentTerm = [];
    this.setSave(terms, []);
  }

  componentDidMount = () => {
    this.loadData();
  }

  stateSetter = (state, value) => {
    this.setState({[state]: value});
  }

  render() {
    let { isDialogAddCourse, isDialogAddMark, isDialogFinaliseTerm, isDialogSettings,
      terms, currentCourses, isSnackbar, termWam, wam, bestWorst } = this.state;

    return(
      <View style={styles.container}>
        {Platform.OS === 'ios' && <StatusBar barStyle="default"/>}

        <AppNavigator screenProps={{
          terms: terms, 
          currentCourses: currentCourses,
          deleteHandler: this.deleteHandler,
          setSnackbar: this.setSnackbar,
          termWam: termWam,
          wam: wam,
          bestWorst: bestWorst,
          stateSetter: this.stateSetter,
          calcWam: this.calcWam,
        }}/>

        <Portal>
          <FAB.Group
            style={styles.fab}
            open={this.state.open}
            icon={this.state.open ? 'keyboard-arrow-down' : 'create'}
            actions={[
              {icon: 'spellcheck', label: 'Add Mark', 
                onPress: () => currentCourses.length === 0 ? 
                  this.setSnackbar("Please add a course first.", "Add Course", "isDialogAddCourse") 
                  : this.setState({isDialogAddMark: true})},
              {icon: 'note-add', label: 'Create New Course', 
                onPress: () => this.setState({isDialogAddCourse: true})},
              {icon: 'school', label: 'Finalise Current Term', 
                onPress: () => currentCourses.length === 0 ? 
                this.setSnackbar("Please add a course first.", "Add Course", "isDialogAddCourse") 
                : this.setState({isDialogFinaliseTerm: true})},
            ]}
            onStateChange={({ open }) => this.setState({ open })}
          />
        </Portal>

        
        <DialogAddCourse 
          resetDialogs={this.resetDialogs} 
          action={this.createCourse} 
          isDialog={isDialogAddCourse}
          setSnackbar={this.setSnackbar}
        />
        <DialogFinaliseTerm 
          resetDialogs={this.resetDialogs} 
          action={this.finaliseTerm} 
          isDialog={isDialogFinaliseTerm}
        />
        <DialogAddMark 
          resetDialogs={this.resetDialogs} 
          action={this.addMark} 
          isDialog={isDialogAddMark}
          currentCourses={currentCourses}
          setSnackbar={this.setSnackbar}
        />
        <DialogSettings
          resetDialogs={this.resetDialogs} 
          action={this.addExistingWam} 
          isDialog={isDialogSettings}
          setSnackbar={this.setSnackbar}
          handleSetSkipAccount={this.props.handleSetSkipAccount}
        />
        <Snackbar
          theme={{ colors: { accent: Colors.tintLight }}}
          style={styles.snackbar}
          duration={Snackbar.DURATION_SHORT}
          visible={isSnackbar}
          onDismiss={() => this.setState({ isSnackbar: false })}
          action={{
             label: this.state.snackbarActionLabel,
             onPress: () => this.setState({[this.state.snackbarAction]: true}),
           }}
        >
          {this.state.snackbarMsg}
        </Snackbar>
        
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
    paddingBottom: 55,
  },
  snackbar: {
    position: "absolute",
    bottom: Layout.window.height - Layout.window.height / 9,
  },
});