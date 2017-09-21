import React from 'react'
import {
  Image
} from 'react-native'

import { Container, View, DeckSwiper,
         Card, Button, CardItem,
         Thumbnail, Text, Left,
         Right,Body, Icon
       } from 'native-base';

import { WebBrowser, Constants} from 'expo'

export default class CardComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      result: null
    }
  }

  _handlePressButtonAsync = async (url) => {
    console.log('input url', url);
    let result = await WebBrowser.openBrowserAsync(url);
    this.setState({ result });
  };

  renderHeader = (text) => {
    return text.length > 30
    ? <Text>{text.substring(0,30) + '...'}</Text>
    : <Text>{text}</Text>
  }

  renderAuthor = (text) => {
    return text.length > 30
      ? <Text note>{text.substring(0,30) + '...'}</Text>
      : <Text note>{text}</Text>
  }


  render(){
    const content = this.props.content;
    console.log('content is', content);
    return (
        <Card style={{ elevation: 3 }}>
          <CardItem>
            <Left>
              <Thumbnail source={{uri: content.image}} />
              <Body>
                {this.renderHeader(content.header)}
                {this.renderAuthor(content.author, true)}
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
            <Body>
              <Button iconLeft transparent onPress={ () => {
                  this._handlePressButtonAsync(content.url)
                }}>
                <Icon name="ios-eye" />
                <Text>View</Text>
              </Button>
            </Body>
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
