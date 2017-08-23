import React, { Component } from 'react';
import { Container, Header, Content, List, ListItem, Thumbnail, Text, Body } from 'native-base';
export default class FeedList extends Component {
  render() {
    return (
      <Container>
        <Header />
        <Content>
          <List>
            <ListItem>
              <Thumbnail square size={80} source={require('../assets/images/robot-dev.png')} />
              <Body>
                <Text>First Article</Text>
                <Text note>Description for article</Text>
              </Body>
            </ListItem>
            <ListItem>
              <Thumbnail square size={80} source={require('../assets/images/robot-prod.png')} />
              <Body>
                <Text>Second Article</Text>
                <Text note>Description of another article</Text>
              </Body>
            </ListItem>
          </List>
        </Content>
      </Container>
    );
  }
}
