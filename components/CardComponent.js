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

  renderHeader = (text) => {
    return text && text.length > 30
    ? <Text>{text.substring(0,30) + '...'}</Text>
    : <Text>{text}</Text>
  }

  renderAuthor = (text) => {
    return text && text.length > 30
      ? <Text note>{text.substring(0,30) + '...'}</Text>
      : <Text note>{text}</Text>
  }

  renderThumbnail = (imageUrl) => {
    return imageUrl && <Thumbnail source={{uri: imageUrl}}/>
  }

  renderImageBody = (imageUrl) => {
    return imageUrl && <Image style={{ height: 300, flex: 1 }} source={{uri: imageUrl}} />
  }

  render(){
    const content = this.props.content;
    return (
        <Card style={{ elevation: 3 }}>
          <CardItem>
            <Left>
              {this.renderThumbnail(content.image)}
              <Body>
                {this.renderHeader(content.title)}
                {this.renderAuthor(content.author)}
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
