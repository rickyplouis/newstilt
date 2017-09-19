import React from 'react'
import {
  StyleSheet,
  Slider
} from 'react-native'

import { connect } from 'react-redux'
import { setUser} from '../actions/userActions'

import { apiURL } from '../config/index'
import { updateTilt } from '../controllers/fetchUser'

class TiltSlider extends React.Component {

  constructor(props){
    super(props);
  }

  changeTilt = (tilt) => {
    const user = this.props.user;
    updateTilt(user, tilt).then( () => {
      this.props.dispatchSetUser({
        tilt,
        email: user.email,
        _id: user._id
      })
    })
  }

  render(){
    return (
      <Slider
        style={styles.sliderStyles}
        value={this.props.user.tilt}
        maximumValue={2}
        minimumValue={-2}
        step={1}
        onSlidingComplete={ (tilt) => this.changeTilt(tilt) }
        />
    )
  }
}

function mapStateToProps (state) {
  return {
    user: state.user.user[state.user.user.length -1]
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchSetUser: (user) => dispatch(setUser(user))
  }
}

const styles = StyleSheet.create({
    sliderStyles: {
      width: 300
    }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TiltSlider)
