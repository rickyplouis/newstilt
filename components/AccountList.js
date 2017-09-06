import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Text, Icon, Right } from 'native-base';
import { Platform, Slider, StyleSheet } from 'react-native';

let usingIOS = () => {
  return Platform.OS === 'ios';
}

const IconName = {
  Preferred: usingIOS() ? `ios-heart` : `md-heart`,
  Excluded: usingIOS() === 'ios' ? `ios-close-circle` : `md-close-circle`
}

export default class AccountList extends Component {

  constructor(props){
    super(props)
    this.state = {
      tilt: 0
    }
  }

  tiltHeader (input) {
    switch(input){
      case -2:
        return 'Radically Left'
        break;
      case -1:
        return 'Slightly Left'
        break;
      case 0:
        return 'Centric'
        break;
      case 1:
        return 'Slightly Right'
        break;
      case 2:
        return 'Radically Right'
        break;
    }
  }


  logValue (val) {
    console.log('val is' + val);
  }

  render() {
    return (
      <Container>
        <Content>
          <Card>
            <CardItem>
              <Slider
                style={styles.sliderStyles}
                value={this.state.tilt}
                maximumValue={2}
                minimumValue={-2}
                step={1}
                onSlidingComplete={ val => this.setState({tilt: val})}
                />
            </CardItem>
            <CardItem header>
              <Text>
                Adjust Tilt : { this.tiltHeader(this.state.tilt) }
              </Text>
            </CardItem>
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

const styles = StyleSheet.create({
  sliderStyles: {
    width: 300
  }
})
