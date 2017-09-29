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
    let result = await WebBrowser.openBrowserAsync(url);
    this.setState({ result });
  };

  truncateText = (text) => {
    return text.length > 30 ? text.substring(0,30) + '...' : text;
  }

  renderThumbnail = (imageUrl) => {
    return <Thumbnail source={{uri: imageUrl}}/>
  }

  renderImageBody = (imageUrl) => {
    return <Image style={{ height: 300, flex: 1 }} source={{uri: imageUrl}} />
  }

  render(){
    const content = this.props.content;
    return (
        <Card style={{ elevation: 3 }}>
          <CardItem>
            <Left>
              {this.renderThumbnail(content.image)}
              <Body>
                <Text>{this.truncateText(content.title)}</Text>
                <Text note>{this.truncateText(content.author)}</Text>
              </Body>
            </Left>
          </CardItem>
          <CardItem cardBody>
            {this.renderImageBody(content.image)}
          </CardItem>
          <CardItem >
            <Body>
              <Button block transparent onPress={ () => {
                  this._handlePressButtonAsync(content.url)
                }}>
                <Text>Read Article</Text>
              </Button>
            </Body>
          </CardItem>
        </Card>
    )
  }
}
