import React from 'react';
import {View, StyleSheet, Text} from 'react-native'
import AccountList from '../components/AccountList'

export default class AccountScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };


  render() {
    return (
      <View style={styles.container}>
        <AccountList></AccountList>
      </View>
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
