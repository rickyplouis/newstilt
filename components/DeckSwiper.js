import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, Header, View, DeckSwiper, Card, CardItem, Thumbnail, Text, Left, Right, Body, Icon, Button } from 'native-base';
const cards = [
  {
    text: 'Card One',
    name: 'One',
    image: require('../assets/images/robot-dev.png'),
  },
  {
    text: 'Card Two',
    name: 'Two',
    image: require('../assets/images/robot-prod.png')
  }
];
export default class DeckSwiperComponent extends Component {
  render() {
    return (
      <Container>
        <Header />
        <View>
          <DeckSwiper
            dataSource={cards}
            renderItem={item =>
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
                <CardItem>
                  <Left>
                    <Button iconLeft>
                      <Icon name="heart" style={{ color: '#ED4A6A' }} />
                      <Text>{item.name}</Text>
                    </Button>
                  </Left>
                  <Right>
                    <Button iconLeft>
                      <Icon name="heart" style={{ color: '#ED4A6A' }} />
                      <Text>{item.name}</Text>                      
                    </Button>
                  </Right>
                </CardItem>
              </Card>
            }
          />
        </View>
      </Container>
    );
  }
}
