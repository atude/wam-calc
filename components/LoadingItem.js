import React  from 'react';
import { StyleSheet, View, Text } from 'react-native';

export default function LoadingItem() {
  return (
    <View style={styles.container}>
      <Text>
        Loading
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff',
  },
});