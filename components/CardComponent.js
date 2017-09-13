import React from 'react'
import {
  Image
} from 'react-native'

import { Container, View, DeckSwiper,
         Card, Button, CardItem,
         Thumbnail, Text, Left,
         Right,Body, Icon
       } from 'native-base';

export default class CardComponent extends React.Component {

  constructor(props){
    super(props);
  }

  render(){
    const content = this.props.content;
    return (
        <Card style={{ elevation: 3 }}>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: content.image}} />
              <Body>
                <Text>{content.header}</Text>
                <Text note>{content.author}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            <Image style={{ height: 300, flex: 1 }} source={{uri: content.image}} />
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
}
