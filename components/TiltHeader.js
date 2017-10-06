import React, { Component } from 'react'
import {
  Text
} from 'react-native'

import { connect } from 'react-redux'

class TiltHeader extends React.Component {

  constructor(props){
    super(props);
  }

  tiltHeader (input) {
    switch(input){
      case -2:
        return 'Radically Left'
        break;
      case -1:
        return 'Slightly Left'
        break;
      case 0:
        return 'Centric'
        break;
      case 1:
        return 'Slightly Right'
        break;
      case 2:
        return 'Radically Right'
        break;
    }
  }


  render(){
    return (
      <Text>
        Current Political Tilt : { this.tiltHeader(this.props.user.tilt) }
      </Text>
    )
  }
}

mapStateToProps = (state) => {
  return {
    user: state.user.user[state.user.user.length -1]
  }
}

export default connect(
  mapStateToProps
)(TiltHeader)
