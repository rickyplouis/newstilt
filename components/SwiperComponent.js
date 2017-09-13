import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, Button, CardItem, Thumbnail, Text, Left, Right, Body, Icon } from 'native-base';
const cards = [
  {
    text: 'Card One',
    name: 'One',
    image: require('../assets/images/robot-prod.png')
  },
  {
    text: 'Card Two',
    name: 'Two',
    image: require('../assets/images/robot-dev.png')
  }
];


export default class SwiperComponent extends React.Component {

flagged = () => {
  console.log('fakeNews!');
}

favorite = () => {
  console.log('faved!');
}

renderCard = (item) => {
  return (
    <Card style={{ elevation: 3 }}>
      <CardItem>
        <Left>
          <Thumbnail source={item.image} />
          <Body>
            <Text>{item.text}</Text>
            <Text note>NativeBase</Text>
          </Body>
        </Left>
      </CardItem>
      <CardItem cardBody>
        <Image style={{ height: 300, flex: 1 }} source={item.image} />
      </CardItem>
      <CardItem >
        <Left>
          <Button iconLeft transparent onPress={this.flagged}>
            <Icon name="ios-flag" />
            <Text>Flag</Text>
          </Button>
        </Left>
        <Right>
          <Button iconLeft transparent onPress={this.flagged}>
            <Icon name="ios-heart" style={{color: 'red'}} />
            <Text>Favorite</Text>
          </Button>
        </Right>
      </CardItem>
    </Card>
  )
}


  render() {
    return (
      <Container>
        <View>
          <DeckSwiper
            dataSource={cards}
            renderItem={item => this.renderCard(item)}
          />
        </View>
      </Container>
    );
  }
}
