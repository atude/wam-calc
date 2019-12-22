import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import HomeScreen from '../screens/HomeScreen';
import MetricsScreen from '../screens/MetricsScreen';
import SubjectsScreen from '../screens/SubjectsScreen';
import RequirementsScreen from '../screens/RequirementsScreen';

import TabBarIcon from '../components/TabBarIcon';
import Colors from '../constants/Colors.js';
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Headline } from 'react-native-paper';
import { View } from 'react-native';

const HomeStack = createStackNavigator({
  Home: {
    screen: screenProps => <HomeScreen data={screenProps}/>,
    navigationOptions: () => ({
      header: null,
    }),
  }
});

HomeStack.navigationOptions = {
  tabBarLabel: 'Dashboard',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'account-check'}/>
  ),
};

const MetricsStack = createStackNavigator({
  Metrics: {
    screen: screenProps => <MetricsScreen data={screenProps} style={{backgroundColor: Colors.tintColor}}/>,
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
      headerTitle: 
        <View style={{flexDirection: "row"}}>
          <MaterialCommunityIcons 
            size={30} 
            name={'chart-arc'} 
            color={"#fff"}
            style={{marginLeft: 14, alignSelf: "center"}}
          />
          <Headline style={{fontSize: 18, marginLeft: 10, color: "#fff"}}>
            Performance
          </Headline>
        </View>
    }),
  }
});

MetricsStack.navigationOptions = {
  tabBarLabel: 'Performance',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'chart-arc'} />
  ),
};

const SubjectsStack = createStackNavigator({
  Subjects: {
    screen: screenProps => <SubjectsScreen data={screenProps}/>,
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
      headerTitle: 
        <View style={{flexDirection: "row"}}>
          <MaterialCommunityIcons 
            size={30} 
            name={'book-open'} 
            color={"#fff"}
            style={{marginLeft: 14, alignSelf: "center"}}
          />
          <Headline style={{fontSize: 18, marginLeft: 10, color: "#fff"}}>
            Courses
          </Headline>
        </View>
    }),
  }
});

SubjectsStack.navigationOptions = {
  tabBarLabel: 'Courses',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'book-open'}/>
  ),
};

const RequirementsStack = createStackNavigator({
  Requirements: {
    screen: screenProps => <RequirementsScreen data={screenProps} style={{backgroundColor: Colors.tintColor}}/>,
    navigationOptions: () => ({
      headerStyle: {
        backgroundColor: Colors.tintColor,
      },
      headerTitle: 
        <View style={{flexDirection: "row"}}>
          <MaterialCommunityIcons 
            size={30} 
            name={'checkbox-multiple-marked-circle'} 
            color={"#fff"}
            style={{marginLeft: 14, alignSelf: "center"}}
          />
          <Headline style={{fontSize: 18, marginLeft: 10, color: "#fff"}}>
            Mark Requirements
          </Headline>
        </View>
    }),
  }
});

RequirementsStack.navigationOptions = {
  tabBarLabel: 'Requirements',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'checkbox-multiple-marked-circle'}/>
  ),
};

const MainTabNavigator = createMaterialBottomTabNavigator(
  {
    Home: HomeStack,
    Subjects: SubjectsStack,
    Metrics: MetricsStack,
    Requirements: RequirementsStack
  },
  {
    shifting: true,
    activeColor: "#ffffff",
    inactiveColor: Colors.tabIconDefault,
    barStyle: { paddingBottom: 3, paddingTop: 3, backgroundColor: Colors.tintColor },
  },
);

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
}));

  