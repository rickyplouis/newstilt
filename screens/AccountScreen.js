import React, { Component } from 'react';
import { Platform, View, StyleSheet } from 'react-native'

import { connect }    from 'react-redux';
import TiltSlider     from '../components/TiltSlider'
import TiltHeader     from '../components/TiltHeader'

import InfluencerScreen from './InfluencerScreen'

import { setUser } from '../actions/userActions'

import { Container, Content, Card, Button, CardItem, Text, Icon, Right } from 'native-base'

let usingIOS = () => {
  return Platform.OS === 'ios';
}

const IconName = {
  Preferred: usingIOS() ? `ios-heart` : `md-heart`,
  Excluded: usingIOS() === 'ios' ? `ios-close-circle` : `md-close-circle`
}


class AccountScreen extends React.Component {

  static navigationOptions = {
    title: 'Account',
    headerLeft: null
  };

  usingIOS = () => {
    return Platform.OS === 'ios';
  }

  constructor(props){
    super(props);
    this.state = {
      text: 'Hello World',
    }
  }


  render() {
    console.log('rendering AccountScreen');
    return (
      <Container style={styles.container}>
        <Content>
          <Card>
            <CardItem header>
              <Text>
                Current User: {this.props.user.email}
              </Text>
            </CardItem>
            <CardItem>
              <TiltSlider/>
            </CardItem>
            <CardItem header>
              <TiltHeader/>
            </CardItem>
            <CardItem button onPress={ () => this.props.navigation.navigate('Influencers') }>
              <Icon active name={IconName.Preferred} />
              <Text>Influencers</Text>
              <Right>
                <Icon name="arrow-forward" />
              </Right>
             </CardItem>
             <CardItem button>
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

mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetUser: (user) => dispatch(setUser(user)),
  }
}


mapStateToProps = (state) => {
  return {
    user: state.user.user[state.user.user.length -1],
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AccountScreen);
