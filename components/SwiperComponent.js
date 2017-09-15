import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, View, DeckSwiper,
         Card, Button, CardItem,
         Thumbnail, Text, Left,
         Right,Body, Icon
       } from 'native-base';


import { connect } from 'react-redux'
import CardComponent from './CardComponent'

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
