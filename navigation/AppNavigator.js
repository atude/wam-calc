import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SubjectsScreen from '../screens/SubjectsScreen';
import Colors from '../constants/Colors.js';

const HomeStack = createStackNavigator({
  Home: screenProps => <HomeScreen data={screenProps}/>
});

HomeStack.navigationOptions = {
  tabBarLabel: 'My WAM',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'account-check'}/>
  ),
};

const SubjectsStack = createStackNavigator({
  Subjects: screenProps => <SubjectsScreen data={screenProps}/>,
});

SubjectsStack.navigationOptions = {
  tabBarLabel: 'My Courses',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'book-open'}/>
  ),
};

const MainTabNavigator = createBottomTabNavigator(
  {
    Home: HomeStack,
    Subjects: SubjectsStack,
  },
  {
    tabBarOptions: {
      activeTintColor: Colors.tintColor,
      inactiveTintColor: Colors.tabIconDefault,
    },
  },
);

export default createAppContainer(createSwitchNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Main: MainTabNavigator,
}));

  