import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, View, DeckSwiper,
         Card, Button, CardItem,
         Thumbnail, Text, Left,
         Right,Body, Icon
       } from 'native-base';


import CardComponent from './CardComponent'

export default class SwiperComponent extends React.Component {

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


getCardsByInfluencer = () => {
  var getOptions = {
    method: 'get',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  }
  fetch('https://newsapi.org/v1/articles?source=techcrunch&apiKey=0a2950e0875d42a2ae1adc0c038200db', getOptions).then( (response) => {

    const cardData = this.state.cards;

    if (response.status == 200){
      response.json().then( (val) => {
        for (let article of val.articles){
          cardData.push({
            "header": article.title,
            "author": article.author,
            "image": article.urlToImage
          })
        }
        this.setState({
          cards: cardData
        })
        return cardData;
      })
    } else {
      response.json().then( (val) => {
        console.log('val is', val);
        const err = val.description[0];
        return [];
      })
    }
  }).catch( (error) => {
    console.log('error', error);
  })
}

componentWillMount(){
  this.getCardsByInfluencer();
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
            dataSource={this.state.cards}
            renderItem={item => this.renderCard(item)}
          />
        </View>
      </Container>
    );
  }
}
