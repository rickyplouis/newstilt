'use strict';

import { Text, View } from 'react-native'
import React, {Component} from 'react';
import { Button } from 'native-base';

//Redux Related Imports
import { connect } from 'react-redux';
import { setUser } from '../actions/userActions'

class UserApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <View>
        <Text>
          Current user: {this.props.user.email}
          Current ID: {this.props.user._id}
        </Text>
      </View>
    );
  }
}

function mapStateToProps (state) {
  console.log('UserApp State is', state);
  //Returns deepest state in tree
  return {
    user: state.user.user[state.user.user.length -1]
  }
}


export default connect(
  mapStateToProps,
)(UserApp)
