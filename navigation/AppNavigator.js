import React from 'react';
import { createAppContainer, createSwitchNavigator, createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from "react-navigation-material-bottom-tabs";

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import SubjectsScreen from '../screens/SubjectsScreen';
import Colors from '../constants/Colors.js';
import { View } from 'native-base';
import { Icon } from 'expo';
import { Headline } from 'react-native-paper';

const HomeStack = createStackNavigator({
  Home: {
    screen: screenProps => <HomeScreen data={screenProps}/>,
    navigationOptions: () => ({
      header: null,
    }),
  }
});

HomeStack.navigationOptions = {
  tabBarLabel: 'My WAM',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'account-check'}/>
  ),
};

const SubjectsStack = createStackNavigator({
  Subjects: {
    screen: screenProps => <SubjectsScreen data={screenProps}/>,
    navigationOptions: () => ({
      headerTitle: 
        <View style={{flexDirection: "row"}}>
          <Icon.MaterialCommunityIcons 
            size={30} 
            name={'book-open'} 
            color={Colors.tintColor}
            style={{marginLeft: 14, alignSelf: "center"}}
            title="Courses"
          />
          <Headline style={{fontSize: 18, marginLeft: 10, color: Colors.tintColor}}>
            Courses
          </Headline>
        </View>
    }),
  }
});

SubjectsStack.navigationOptions = {
  tabBarLabel: 'My Courses',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon focused={focused} name={'book-open'}/>
  ),
};

const MainTabNavigator = createMaterialBottomTabNavigator(
  {
    Home: HomeStack,
    Subjects: SubjectsStack,
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

  