'use strict';

import { Text } from 'react-native'
import React, {Component} from 'react';
import { bindActionCreators } from 'redux';
import { Button } from 'native-base';

//Redux Related Imports
import { connect } from 'react-redux';
import { setUser } from '../actions/userActions'

class UserApp extends Component {
  constructor(props) {
    super(props);
    this.state = {
      inputValue: 'Basic input'
    }
  }

  setUser = () => {
    if (this.state.inputValue === '') return;

    this.setState({
      inputValue: this.state.inputValue += 'AY'
    })
    this.props.dispatchSetUser({
      email: this.state.inputValue
    })
  }

  render() {
    const { state, actions } = this.props;
    console.log('UserApp props', this.props);
    return (
      <Button onPress={this.setUser}>
        <Text>
          {this.state.inputValue}
        </Text>
      </Button>
    );
  }
}

function mapStateToProps (state) {
  console.log('what am i mapping', state.user);
  return {
    user: state.user.user[0]
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchSetUser: (user) => dispatch(setUser(user))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserApp)