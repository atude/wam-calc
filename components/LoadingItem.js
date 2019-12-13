import React  from 'react';
import { StyleSheet, View, Text } from 'react-native';
import Colors from '../constants/Colors';
import { ActivityIndicator } from 'react-native-paper';

export default function LoadingItem(props) {
  return (
    <ActivityIndicator 
      style={styles.indicator} 
      animating={props.isLoading} 
      color={Colors.tintColor} 
      size="large"
    />
  );
}

const styles = StyleSheet.create({
  indicator: {
    marginTop: 20,
  },
});