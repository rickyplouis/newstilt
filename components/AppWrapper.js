import React from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'

import { createStore, applyMiddleware, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import * as reducers from '../reducers';
import CounterApp from './CounterApp';


const createStoreWithMiddleware = applyMiddleware(thunk)(createStore);
const reducer = combineReducers(reducers);
const store = createStoreWithMiddleware(reducer);

export default class AppWrapper extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      user: 'Some default user'
    }
  }


  render(){
    return (
      <Provider store={store}>
        <View
          style={styles.container}
          >
          <CounterApp/>
          {this.props.children}
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
})
