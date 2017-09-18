import React from 'react'
import {
  StyleSheet,
  Slider
} from 'react-native'

import { connect } from 'react-redux'
import { setUser} from '../actions/userActions'

import { apiURL } from '../config/index'

class TiltSlider extends React.Component {

  constructor(props){
    super(props);
  }

  changeTilt = (tilt) => {

    var postOptions = {
      method: 'put',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    }

    fetch( apiURL + '/api/users?id=' + this.props.user._id + '&tilt=' + tilt, postOptions).then( (response) => {
      if (response.status == 200){
        response.json().then( (val) => {
          this.props.dispatchSetUser({
            tilt,
            email: this.props.user.email,
            _id: this.props.user._id
          })
        })
      } else {
        response.json().then( (val) => {
          console.log('val is', val);
          const err = val.description[0];
          return err;
        })
      }
    }).catch( (error) => {
      console.log('error', error);
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
