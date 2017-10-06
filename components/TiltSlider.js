import React from 'react'
import {
  StyleSheet,
  Slider
} from 'react-native'

import { connect } from 'react-redux'
import { setUser} from '../actions/userActions'
import { setCards, clearCards } from '../actions/cardActions'

import { createCardArray} from '../controllers/cards'

import { apiURL } from '../config/index'
import { updateTilt } from '../controllers/fetchUser'

class TiltSlider extends React.Component {

  constructor(props){
    super(props);
  }

  createCards = (user) => {
    createCardArray(user).then( (cardArray) => {
      //For the sake of speed load 3 cards per influencer
      for (let x = 0; x < 2; x++){
        this.props.dispatchSetCards(cardArray[x])
      }
    })
  }

  changeTilt = (tilt) => {
    const user = this.props.user;
    updateTilt(user, tilt).then( () => {
      this.props.dispatchSetUser({
        tilt,
        email: user.email,
        _id: user._id,
        influencers: user.influencers
      })
      Promise.resolve(this.props.dispatchClearCards()).then( () => {
        this.createCards(this.props.user)
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
    user: state.user.user[state.user.user.length -1],
    cards: state.cards.cards
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchSetUser: (user) => dispatch(setUser(user)),
    dispatchClearCards: () => dispatch(clearCards()),
    dispatchSetCards: (cards) => dispatch(setCards(cards))
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
