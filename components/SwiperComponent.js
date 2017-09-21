import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, View, DeckSwiper,
         Card, Button, CardItem,
         Thumbnail, Text, Left,
         Right,Body, Icon
       } from 'native-base';


import { connect } from 'react-redux'
import CardComponent from './CardComponent'
import { postArticle, postTilt, putInfluencer } from '../controllers/fetchAPI'

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

handleSwipe = (card, direction) => {
  var tilt = {
    "left": direction == 'left',
    "right": direction == 'right',
    "up": false,
    "down": false,
    "_p_article": card.url,
    "_p_user": this.props.user._id,
    "_p_influencer": card.influencer,
  }

  return Promise.all([
    postArticle(card),
    postTilt(tilt),
    putInfluencer(card.influencer, direction)
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
            onSwipeLeft={(card) => this.handleSwipe(card, 'left')}
            onSwipeRight={(card) => this.handleSwipe(card, 'right')}
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
