'use strict';

import { Text } from 'react-native'
import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import * as userActions from '../actions/userActions';
import { connect } from 'react-redux';
import { Button } from 'native-base';

class UserApp extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { state, actions } = this.props;
    console.log('UserApp props', this.props);
    return (
      <Button onPress={actions.setUser}>
        <Text>
          {state.user.email}
        </Text>
      </Button>
    );
  }
}

export default connect(state => ({
    state: state.user
  }),
  (dispatch) => ({
    actions: bindActionCreators(userActions, dispatch)
  })
)(UserApp);
