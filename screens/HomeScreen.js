import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Colors from '../constants/Colors';
import { Paragraph, Title, Text, ProgressBar, Divider, List, IconButton } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Layout from '../constants/Layout';

export default class HomeScreen extends React.Component {
  state = {

  }

  getMarkRank = (val) => {
    if(val < 0.1) return ["--", Colors.na];
    if(val < 50) return ["FL", Colors.fl];
    if(val < 65) return ["PS", Colors.ps];
    if(val < 75) return ["CR", Colors.cr];
    if(val < 85) return ["DN", Colors.dn];
    return ["HD", Colors.hd];
  }

  render() {
    const getProps = this.props.data.screenProps;
    let { termWam, wam, bestWorst, stateSetter } = getProps;
    const markRank = this.getMarkRank(termWam);
    if(bestWorst === undefined) bestWorst = [["--", 0], ["--", 0]];
    
    const bestMarkRank = this.getMarkRank(bestWorst[0][1]);
    const worstMarkRank =this.getMarkRank(bestWorst[1][1]);

    return (
      <View style={styles.container}>
        <View style={styles.wamContainer}>
          <IconButton
            style={styles.helpButton}
            icon="help-outline"
            color={Colors.tabIconDefault}
            size={25}
            onPress={() => stateSetter("isDialogSettings", true)}
          />
          <View style={styles.wamContentContainer}>
            <View style={styles.wamTextContainer}>
              <View style={styles.wamTextTopContainer}>
                <MaterialCommunityIcons
                  name={'progress-check'}
                  size={22}
                  style={styles.wamLogo}
                  color="#fff"
                />
                <Text style={styles.wamTextLabel}>My WAM</Text>
               
              </View>
              <Text style={styles.wamText}>{wam < 0.1 ? "--" : wam}</Text>
            </View>
            <View style={styles.wamProgressContainer}>
              <ProgressBar color="#fff" progress={((wam / 100) - 0.5) * 2} style={styles.wamProgress}/>
            </View>
            <View style={styles.wamProgressLabelContainer}>
              <Text style={[styles.wamProgressLabelText, {opacity: wam >= 85 ? 1 : Colors.lightOpacity}]}>HD</Text>
              <Text style={[styles.wamProgressLabelText, {opacity: wam >= 75 ? 1 : Colors.lightOpacity}]}>DN</Text>
              <Text style={[styles.wamProgressLabelText, {opacity: wam >= 65 ? 1 : Colors.lightOpacity}]}>CR</Text>
              <Text style={[styles.wamProgressLabelText, {opacity: wam >= 50 ? 1 : Colors.lightOpacity}]}>PS</Text>
            </View>
          </View>
        </View>
        <View style={styles.statsContainer}>
          <ScrollView>
            <List.Section>
            <List.Subheader style={{color: Colors.tintColor}}>Current Term Performance</List.Subheader>
            <Divider/>
              <List.Item
                title="Term WAM"
                right={() => <Title style={[styles.markText, {color: markRank[1]}]}>{termWam} {markRank[0]}</Title>}
                left={(props) => <List.Icon {...props} size={Layout.iconSize} icon="assessment" />}
              />
              <List.Item
                title={bestWorst[0][0]}
                description="Greatest Performing Course"
                right={() => <Title style={[styles.markText, {color: bestMarkRank[1]}]}>{Number(bestWorst[0][1])} {bestMarkRank[0]}</Title>}
                left={(props) => <List.Icon {...props} size={Layout.iconSize} icon="assignment-turned-in" />}
              />
              <List.Item
                title={bestWorst[1][0]}
                description="Poorest Performing Course"
                right={() => <Title style={[styles.markText, {color: worstMarkRank[1]}]}>{Number(bestWorst[1][1])} {worstMarkRank[0]}</Title>}
                left={(props) => <List.Icon {...props} size={Layout.iconSize} icon="assignment-returned" />}
              />
            </List.Section>
          </ScrollView>
        </View>
      </View>
    );
  }

 
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
  },
  wamContainer: {
    flex: 45,
    backgroundColor: Colors.tintColor,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  wamContentContainer: {
    flex: 1, 
    marginTop: '5%',
    flexDirection: 'row',
  },
  statsContainer: {
    flex: 55,
    marginHorizontal: 14,
  },
  wamTextContainer: {
    flex: 3,
    justifyContent: "center",
  },
  wamText: {
    color: "#fff",
    fontSize: 40,
    textAlign: 'right',
  },
  wamTextTopContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    alignSelf: 'flex-end',
    width: '50%',
    flexWrap: 'nowrap',
  },
  wamTextLabel: {
    flex: 4,
    color: "#fff",
    opacity: Colors.lightOpacity,
    fontSize: 18,
    textAlign: 'right',
    flexWrap: 'nowrap',
  },
  wamLogo:{
    flex: 1,
    opacity: Colors.lightOpacity,
    flexWrap: 'nowrap',
  },
  wamProgressContainer: {
    flex: 1,
  },
  wamProgress: {
    transform: [{ rotate: '-90deg'}],
    marginHorizontal: -70,
    flexGrow: 1,
  },
  wamProgressLabelContainer: {
    flex: 2,
    flexDirection: "column",
    alignItems: "stretch",
    height: 205,
    marginLeft: -10,
    marginTop: 24,
  },
  wamProgressLabelText: {
    flex: 1,
    textAlign: "left",
    color: "#fff",
    fontSize: 20,
  },
  markText: {
    marginTop: 13, 
    marginRight: 5, 
    fontSize: 16,
  },
  helpButton: {
    position: 'absolute',
    left: 20,
    zIndex: 999999999,
  }
});
