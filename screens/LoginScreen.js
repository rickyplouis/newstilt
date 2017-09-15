import React from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'

import { StackNavigator } from 'react-navigation'
import HomeScreen from './HomeScreen'

import SignupNavButton from '../components/SignupNavButton'

import { Container, Content, Form, Item, Input, Label, Button } from 'native-base';

import { getCardData, getInfluencers} from '../controllers/fetchAPI'

import { apiURL } from '../config/index.js'

//REDUX IMPORTS
import { connect } from 'react-redux';
import { setUser } from '../actions/userActions'
import { setCards } from '../actions/cardActions'

class LoginScreen extends React.Component {

  static navigationOptions = {
    title: 'Login',
  };

  constructor(props){
    super(props);
    this.state = {
      id: "",
      email: "",
      password: "",
      emailInvalid: false,
      passwordInvalid: false,
      emailMessage: "",
      passMessage: "",
    }
  }

  setUser = () => {
    if (this.state.inputValue === '') return;

    this.setState({
      inputValue: this.state.inputValue += 'AY'
    })
  }

  updateUserState = (email, _id, tilt) => {
    this.props.dispatchSetUser({
      email,
      _id,
      tilt
    })
  }

  getCards = (influencer) => {
    getInfluencers().then( (influencerArray) => {
      for (let influencer of influencerArray){
        getCardData(influencer.sourceIndex).then( (cardArray) => {
          //for (let card of cardArray){
//          card.logo = influencer.logo
//          this.props.dispatchSetCards(card);
          //Load less cards to speed up testing
          for (let x = 0; x < 3; x++){
            cardArray[x].logo = influencer.logo;
            this.props.dispatchSetCards(cardArray[x])
          }
        })
      }
    })
  }

  fetchInfluencers = () => {
    getInfluencers()
  }


  login = () => {
    var postOptions = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      //make sure to serialize your JSON body
      body: JSON.stringify({
        "email": this.state.email,
        "password": this.state.password
      })
    }

    fetch( apiURL + '/login', postOptions).then( (response) => {
      if (response.status == 200){
        response.json().then( (val) => {
          Promise.all([
            this.props.navigation.navigate('Home'),
            this.updateUserState(val.user.email, val.user._id, val.user.tilt),
            this.getCards()
          ])
        })
      } else {
        response.json().then( (val) => {
          const err = val.description[0];
          switch (err) {
            case 'no user found':
              this.setState({
                email: "",
                emailInvalid: true,
                emailMessage: err
              })
              break;
            case 'Wrong password':
              this.setState({
                password: "",
                passwordInvalid: true,
                passMessage: err
              })
            default:
          }
        })
      }
    }).catch( (error) => {
      console.log('error', error);
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <Container>
          <Content>
            <Form>
              <Item stackedLabel error={this.state.emailInvalid}>
                <Label>Email:</Label>
                <Input placeholder={this.state.emailMessage} value={this.state.email} autoCapitalize={'none'} onChangeText={(emailInput) => this.setState({"email": emailInput , "emailInvalid": false})} />
              </Item>
              <Item stackedLabel error={this.state.passwordInvalid} last>
                <Label>Password</Label>
                <Input placeholder={this.state.passMessage} secureTextEntry={true} value={this.state.password} autoCapitalize={'none'} onChangeText={(passInput) => this.setState({"password": passInput, "passwordInvalid": false})} />
              </Item>
            </Form>
            <Button block
              onPress={this.login}
              disabled={this.state.email.length == 0 || this.state.password.length == 0}
              >
              <Text>Login</Text>
            </Button>
            <SignupNavButton navigate={this.props.navigation.navigate} />
          </Content>
        </Container>
      </View>
    )
  }
}


function mapStateToProps (state) {
  return {
    user: state.user.user[0],
    cards: state.cards.cards[0]
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchSetUser: (user) => dispatch(setUser(user)),
    dispatchSetCards: (cards) => dispatch(setCards(cards))
  }
}

const App = StackNavigator({
  Home: {
    screen: HomeScreen
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen)
