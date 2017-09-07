import React from 'react';
import {View, StyleSheet, Text} from 'react-native'
import AccountList from '../components/AccountList'
import Account from '../components/Account';
import AppContainer from '../components/AppContainer'

export default class AccountScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      text: 'Hello World',
    }
  }


  render() {
    console.log('accountProps', this.props);
    return (
      <AppContainer>
        <Account/>
        <AccountList></AccountList>
      </AppContainer>
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
