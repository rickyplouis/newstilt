import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, View, DeckSwiper,
         Card, Button, CardItem,
         Thumbnail, Text, Left,
         Right,Body, Icon
       } from 'native-base';


import { connect } from 'react-redux'
import CardComponent from './CardComponent'
import { postArticle } from '../controllers/fetchAPI'

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
  return Promise.all([
    postArticle(card)
  ])
  console.log('card is', card);
}

swipeRight = (card) => {
  return Promise.all([
    postArticle(card)
  ])
  console.log('card is', card);
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
    user: state.user.user[0],
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
