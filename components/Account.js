import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Body } from 'native-base';

export default class Account extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      text: 'Hello World'
    }
  }

  render(){
    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem header>
              <Text>{this.props.name}</Text>
            </CardItem>
            <CardItem>
              <Body>
                <Text>
                  {this.state.text}
                </Text>
              </Body>
            </CardItem>
            <CardItem footer>
              <Text>Footer Text</Text>
            </CardItem>
          </Card>
        </Content>
      </Container>
    )
  }
}
