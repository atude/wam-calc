import React from 'react';
import { StyleSheet, View, } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'

import Colors from '../constants/Colors';
import { Title, Text, ProgressBar, Divider, List, IconButton, Switch, Caption } from 'react-native-paper';
import { ScrollView } from 'react-native-gesture-handler';
import Layout from '../constants/Layout';
import { getMarkRanks } from '../utils';

export default class HomeScreen extends React.Component {
  handleRankTypeSwitch = () => {
    this.props.data.screenProps.setRankType();
  }

  render() {
    const getProps = this.props.data.screenProps;
    let { termWam, wam, bestWorst, stateSetter, isAuType } = getProps;

    const markRank = getMarkRanks(termWam, isAuType);
    if(bestWorst === undefined) bestWorst = [["--", 0], ["--", 0]];
    
    const bestMarkRank = getMarkRanks(bestWorst[0][1], isAuType);
    const worstMarkRank = getMarkRanks(bestWorst[1][1], isAuType);

    return (
      <View style={styles.container}>
        <View style={styles.wamContainer}>
          <IconButton
            style={styles.helpButton}
            icon="settings"
            color={Colors.tabIconDefault}
            size={30}
            onPress={() => stateSetter("isDialogSettings", true)}
          />
          <View style={styles.wamContentContainer}>
            <View style={styles.wamTextContainer}>
              <View style={styles.wamTextTopContainer}>
             
                <Text style={styles.wamTextLabel}>My WAM</Text>
                <MaterialCommunityIcons
                  name={'progress-check'}
                  size={22}
                  style={styles.wamLogo}
                  color="#fff"
                />
              </View>
              <Text style={styles.wamText}>{wam < 0.1 ? "--" : wam}</Text>
            </View>
            <View style={styles.wamProgressContainer}>
              {isAuType === true ?
                <ProgressBar color="#fff" progress={((wam / 100) - 0.5) * 2} style={styles.wamProgress} />
                :
                <ProgressBar color="#fff" progress={((wam / 100) - 0.6) * 2} style={styles.wamProgress} />
              }
            </View>
            <View style={styles.wamProgressLabelContainer}>
              {isAuType === true ?
                <>
                  <Text style={[styles.wamProgressLabelText, {opacity: wam >= 85 ? 1 : Colors.lightOpacity}]}>HD</Text>
                  <Text style={[styles.wamProgressLabelText, {opacity: wam >= 75 ? 1 : Colors.lightOpacity}]}>DN</Text>
                  <Text style={[styles.wamProgressLabelText, {opacity: wam >= 65 ? 1 : Colors.lightOpacity}]}>CR</Text>
                  <Text style={[styles.wamProgressLabelText, { opacity: wam >= 50 ? 1 : Colors.lightOpacity }]}>PS</Text>
                </>
                :
                <>
                  <Text style={[styles.wamProgressLabelText, {opacity: wam >= 90 ? 1 : Colors.lightOpacity}]}>A</Text>
                  <Text style={[styles.wamProgressLabelText, {opacity: wam >= 80 ? 1 : Colors.lightOpacity}]}>B</Text>
                  <Text style={[styles.wamProgressLabelText, {opacity: wam >= 70 ? 1 : Colors.lightOpacity}]}>C</Text>
                  <Text style={[styles.wamProgressLabelText, { opacity: wam >= 60 ? 1 : Colors.lightOpacity }]}>D</Text>
                </>
              }
              
            </View>
          </View>
          <View style={styles.switchTypeContainer}>
            <Caption style={styles.rankTypeText}>US</Caption>
            <Switch
              value={isAuType}
              color="#fff"
              onValueChange={() => {this.handleRankTypeSwitch()}}
            />
            <Caption style={styles.rankTypeText}>AU</Caption>
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
    paddingLeft: 5,
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
  },
  switchTypeContainer: {
    flexDirection: "row",
    position: "absolute",
    bottom: 0,
    left: 0,
    margin: 20,
  },
  rankTypeText: {
    color: "#fff",
    flex: 1,
    margin: 5,
  }
});
