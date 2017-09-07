import React from 'react';
import {View, StyleSheet, Text} from 'react-native'
import AccountList from '../components/AccountList'
import Account from '../components/Account';
import AppWrapper from '../components/AppWrapper'

export default class AccountScreen extends React.Component {

  static navigationOptions = {
    header: null,
  };

  constructor(props){
    super(props);
    this.state = {
      text: 'Hello World',
    }

    console.log('AccountScreen state is', this.state);
    console.log('accountProps', this.props);

  }


  render() {
    return (
      <AppWrapper>
        <Account/>
        <AccountList></AccountList>
      </AppWrapper>
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
