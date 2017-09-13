import React, { Component } from 'react';
import { Container, Content, Card, CardItem, Text, Icon, Right } from 'native-base';
import { Platform, Slider, StyleSheet } from 'react-native';
import TiltSlider from './TiltSlider'

import { setUser } from '../actions/userActions';
import { connect } from 'react-redux';

let usingIOS = () => {
  return Platform.OS === 'ios';
}

const IconName = {
  Preferred: usingIOS() ? `ios-heart` : `md-heart`,
  Excluded: usingIOS() === 'ios' ? `ios-close-circle` : `md-close-circle`
}

class AccountList extends Component {

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
              <TiltSlider/>
            </CardItem>
            <CardItem header>
              <Text>
                Adjust Tilt : { this.tiltHeader(this.props.user.tilt) }
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

function mapStateToProps (state) {
  return {
    user: state.user.user[state.user.user.length -1]
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchSetUser: (user) => dispatch(setUser(user))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountList)
