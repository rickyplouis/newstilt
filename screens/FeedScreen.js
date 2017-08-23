import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native'

export default class FeedScreen extends React.Component {
  static navigationOptions = {
    title: 'Feed'
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text>Feed Page</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});
