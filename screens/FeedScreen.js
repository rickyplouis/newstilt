import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native'
import FeedList from '../components/FeedList'

export default class FeedScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    return (
      <FeedList></FeedList>
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
