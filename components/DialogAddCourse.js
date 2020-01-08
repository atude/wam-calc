import React from 'react';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Portal, Dialog, TextInput, RadioButton, Subheading, Button, IconButton, Caption } from 'react-native-paper';
import { StyleSheet, View, Picker, Text } from 'react-native';

import Colors from '../constants/Colors.js';

const uocValues = [2,3,4,5,6,12];
const iconValues = [
  "code-tags", "database", "dns", "chart-areaspline", "math-compass",
  "flask", "earth", "bank", "camera", "shape", "brush",
  "music-note", "basketball", "account-group", "worker",
];

export default class DialogAddCourse extends React.Component {
  state = {
    dialogCourseName: "",
    dialogCourseValue: 6,
    dialogCourseIcon: "shape",
    dialogTemplates: [],

    isIconDialog: false,
    isTemplateDialog: false,

    templateAssessment: "",
    templateWeight: "",
  }

  setDialog = () => {
    if(this.state.dialogCourseName === ""){
      this.props.setSnackbar("Please add a name for the course.", "", "");
      return;
    };

    this.props.action(
      this.state.dialogCourseName, 
      this.state.dialogCourseValue,
      this.state.dialogCourseIcon,
      this.state.dialogTemplates,
    );

    this.resetDialog();
  }

  resetDialog = () => {
    this.props.resetDialogs();
    this.setState({
      dialogCourseName: "",
      dialogCourseValue: 6,
      dialogCourseIcon: "shape",
    })
  }

  handleIconChange = (icon) => {
    this.setState({
      dialogCourseIcon: icon,
      isIconDialog: false,
    });
  }

  handleAddTemplate = () => {
    const { templateAssessment, templateWeight, dialogTemplates } = this.state;
    let templates = dialogTemplates;

    if (!templateAssessment || !templateWeight) return;

    templates.unshift({
      assessmentName: templateAssessment,
      weight: templateWeight
    });

    this.setState({
      dialogTemplates: templates,
      templateAssessment: "",
      templateWeight: "",
    });
  }

  render() {
    let { isDialog } = this.props;
    let {
      dialogCourseName, dialogCourseValue, dialogCourseIcon, dialogTemplates,
      isIconDialog, isTemplateDialog, templateAssessment, templateWeight,
    } = this.state;

    return (
      <Portal>
        <Dialog visible={isDialog} onDismiss={this.resetDialog}>
          <Dialog.Title>Add Course</Dialog.Title>
          <Dialog.Content style={styles.contentContainer}>
            <TextInput 
              label="Course Name" 
              value={dialogCourseName}
              onChangeText={dialogCourseName => {this.setState({dialogCourseName})}}
              mode="outlined"
            />

            <View style={styles.UOCContainer}>
              <Subheading style={styles.UOCHeading}>Units of Credit</Subheading>
              <Picker
                style={styles.UOCPicker}
                mode="dropdown"
                selectedValue={dialogCourseValue}
                onValueChange={(itemValue) => { this.setState({ dialogCourseValue: itemValue }) }}
              >
                {uocValues.map(uoc => (
                  <Picker.Item key={`uoc_${uoc}`} label={uoc.toString()} value={uoc}/>
                ))}
              </Picker>
            </View>         
            
            <View style={styles.chooseContainer}>
              <Subheading
                onPress={() => this.setState({ isIconDialog: true })}
                style={styles.iconHeading}
              >
                Icon
              </Subheading>
              <View style={{flexDirection: "row", alignItems: "center"}}>
                <MaterialCommunityIcons size={30} name={dialogCourseIcon}/>
                <IconButton
                  icon="more-vert"
                  onPress={() => this.setState({ isIconDialog: true })}
                  color={Colors.tintColor}
                />
              </View>
            </View>

            <Portal>
              <Dialog visible={isIconDialog} onDismiss={() => this.setState({isIconDialog: false})}>
                <Dialog.Title>Choose Icon</Dialog.Title>
                <Dialog.Content style={styles.iconRadioContainer}>
                  <RadioButton.Group 
                    onValueChange={dialogCourseIcon => this.handleIconChange(dialogCourseIcon)} 
                    value={dialogCourseIcon}
                  >
                    {iconValues.map(icon => (
                      <View key={`uoc_li_${icon}`} style={styles.iconRadioItem}>
                        <RadioButton value={icon}/>
                        <MaterialCommunityIcons size={20} name={icon}/>
                      </View>
                    ))}
                  </RadioButton.Group>
                </Dialog.Content>
              </Dialog>
            </Portal>

            <View style={styles.chooseContainer}>
              <Subheading
                onPress={() => this.setState({ isTemplateDialog: true })}
                style={styles.templatesHeading}
              >
                Add Assessment Templates
              </Subheading>
              <IconButton
                size={30}
                icon="add-box"
                onPress={() => this.setState({ isTemplateDialog: true })}
                color={Colors.tintColor}
              />
            </View>

            <Portal>
              <Dialog visible={isTemplateDialog} onDismiss={() => this.setState({ isTemplateDialog: false })}>
                <Dialog.Title>Preset Assessments</Dialog.Title>
                <Dialog.Content>
                <Caption style={{marginTop: -15, marginBottom: 10, }}>
                  Configure assessments now and add marks when you receive them later
                </Caption>
                  <View>
                    <TextInput 
                      label="Assessment Name" 
                      value={templateAssessment}
                      onChangeText={templateAssessment => this.setState({templateAssessment})}
                      mode="outlined"
                    /> 
                    <View style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "center",

                    }}>
                      <TextInput 
                        style={{flex: 2, marginRight: 6}}
                        label="Weighting (%)"
                        value={(Number(templateWeight) > 100 || templateWeight.length > 5) ? templateWeight.slice(0, 2) : templateWeight}
                        onChangeText={templateWeight => this.setState({templateWeight})}
                        mode="outlined"
                        keyboardType={'numeric'}
                      />
                      <Button
                        style={{ padding: 9, marginTop: 5, }}
                        mode="contained" icon="add"
                        onPress={() => this.handleAddTemplate()}
                      >
                        Add
                      </Button>
                    </View>
                  </View>
                  <View style={styles.templatesListContainer}>
                    <View style={styles.genericRow}>
                      <Subheading style={{color: Colors.tintColor}}>
                        Assessments
                      </Subheading>
                      <Subheading style={{color: Colors.tintColor}}>
                        Weightings
                      </Subheading>
                    </View> 
                    {dialogTemplates.length ? 
                      dialogTemplates.map((template, i) => (
                        <View style={styles.genericRow} key={template.assessmentName + i}>
                          <Subheading>
                            {template.assessmentName}
                          </Subheading>
                          <Subheading>
                            {template.weight}%
                          </Subheading>
                        </View>
                      ))
                    : 
                      <Button style={{marginTop: 10,}} disabled>
                        No Templates Added
                      </Button>
                    }
                  </View>
                </Dialog.Content>
                <Dialog.Actions>
                  <Button style={styles.actionButtons}
                    onPress={() => this.setState({dialogTemplates: []})}
                  >
                    Clear
                  </Button>
                  <Button style={styles.actionButtons}
                    onPress={() => this.setState({isTemplateDialog: false})}
                  >
                    Done
                  </Button>
                </Dialog.Actions>
              </Dialog>
            </Portal>

          </Dialog.Content>
          <Dialog.Actions>
            <Button style={styles.actionButtons} onPress={this.resetDialog}>Cancel</Button>
            <Button style={styles.actionButtons} onPress={this.setDialog}>Add</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    );
  }
}

const styles = StyleSheet.create({
  contentContainer: {
    margin: 5,
  },
  actionButtons: {
    margin: 12,
  },
  UOCContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 20,
  },
  UOCPicker: {
    flex: 1,
  },
  UOCHeading: {
    flex: 2,
    color: Colors.tintColor,
  },
  iconRadioContainer: {
    flexDirection: 'row',
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    marginTop: 10,
  },
  iconHeading: {
    color: Colors.tintColor,
  },
  iconRadioItem: {
    marginBottom: 15,
    flexDirection: "column",
    alignItems: "center",
  },
  chooseContainer: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  templatesHeading: {
    flex: 1,
    color: Colors.tintColor,
  },
  templatesListContainer: {
    marginTop: 15,
    padding: 5,
  },
  genericRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  }
});
