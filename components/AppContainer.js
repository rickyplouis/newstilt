'use strict'

import React from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'

import CounterApp from './CounterApp';
import UserApp from './UserApp';

export default class AppContainer extends React.Component {

  constructor(props){
    super(props);
  }


  render(){
    return (
      <View
        style={styles.container}
        >
        <UserApp/>
        {this.props.children}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
})
