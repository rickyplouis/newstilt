import React, { Component } from 'react';
import { Container, Header, Content, Card, CardItem, Text, Icon, Right } from 'native-base';
import { Platform } from 'react-native';

let usingIOS = () => {
  return Platform.OS === 'ios';
}

const IconName = {
  Preferred: usingIOS() ? `ios-heart` : `md-heart`,
  Excluded: usingIOS() === 'ios' ? `ios-close-circle` : `md-close-circle`
}

export default class CardList extends Component {



  render() {
    return (
      <Container>
        <Header />
        <Content>
          <Card>
            <CardItem header>
              <Text>Username Here</Text>
            </CardItem>
            <CardItem>
              <Icon active name={IconName.Preferred} />
              <Text>Preferred Categories</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
             <CardItem>
               <Icon active name={IconName.Excluded} />
               <Text>Exclude From Discovery</Text>
               <Right>
                 <Icon name="arrow-forward" />
               </Right>
              </CardItem>
           </Card>
        </Content>
      </Container>
    );
  }
}
