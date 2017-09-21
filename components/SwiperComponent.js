import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, View, DeckSwiper,
         Card, Button, CardItem,
         Thumbnail, Text, Left,
         Right,Body, Icon
       } from 'native-base';


import { connect } from 'react-redux'
import CardComponent from './CardComponent'
import { postArticle, postTilt } from '../controllers/fetchAPI'

class SwiperComponent extends React.Component {

flagged = () => {
  console.log('fakeNews!');
}

favorite = () => {
  console.log('faved!');
}

constructor(props){
  super(props);
  this.state = {
    cards: [{}]
  }
}

swipeLeft = (card) => {
  var tilt = {
    "left": true,
    "right": false,
    "up": false,
    "down": false,
    "_p_article": card.url,
    "_p_user": this.props.user._id,
    "_p_influencer": card.influencer,
  }

  return Promise.all([
    postArticle(card),
    postTilt(tilt)
  ])
}

swipeRight = (card) => {
  var tilt = {
    "left": false,
    "right": true,
    "up": false,
    "down": false,
    "_p_article": card.url,
    "_p_user": this.props.user._id,
    "_p_influencer": card.influencer,
  }

  return Promise.all([
    postArticle(card),
    postTilt(tilt)
  ])
}

renderCard = (item) => {
  return (
    <CardComponent content={item} />
  )
}


  render() {
    return (
      <Container>
        <View>
          <DeckSwiper
            onSwipeLeft={(card) => this.swipeLeft(card)}
            onSwipeRight={(card) => this.swipeRight(card)}
            dataSource={this.props.cards}
            renderItem={item => this.renderCard(item)}
          />
        </View>
      </Container>
    );
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
    dispatchSetCards: (cards) => dispatch(setCards(cards))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwiperComponent)
