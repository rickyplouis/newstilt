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

//Redux Related Imports
import { connect } from 'react-redux';
import { setUser } from '../actions/userActions'

class LoginScreen extends React.Component {

  static navigationOptions = {
    title: 'Login',
  };

  constructor(props){
    super(props);
    this.state = {
      id: "",
      username: "",
      password: "",
      usernameInvalid: false,
      passwordInvalid: false,
      userMessage: "",
      passMessage: "",
    }
  }

  setUser = () => {
    if (this.state.inputValue === '') return;

    this.setState({
      inputValue: this.state.inputValue += 'AY'
    })
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
        "email": this.state.username,
        "password": this.state.password
      })
    }

    fetch( 'https://newstiltapi.com/login', postOptions).then( (response) => {
      if (response.status == 200){
        response.json().then( (val) => {
          this.props.navigation.navigate('Home');
          this.props.dispatchSetUser({
            email: val.user.email,
            _id: val.user._id
          })

        })
      } else {
        response.json().then( (val) => {
          const err = val.description[0];
          switch (err) {
            case 'no user found':
              this.setState({
                username: "",
                usernameInvalid: true,
                userMessage: err
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
              <Item stackedLabel error={this.state.usernameInvalid}>
                <Label>Username:</Label>
                <Input placeholder={this.state.userMessage} value={this.state.username} autoCapitalize={'none'} onChangeText={(userInput) => this.setState({"username": userInput , "usernameInvalid": false})} />
              </Item>
              <Item stackedLabel error={this.state.passwordInvalid} last>
                <Label>Password</Label>
                <Input placeholder={this.state.passMessage} secureTextEntry={true} value={this.state.password} autoCapitalize={'none'} onChangeText={(passInput) => this.setState({"password": passInput, "passwordInvalid": false})} />
              </Item>
            </Form>
            <Button block
              onPress={this.login}
              disabled={this.state.username.length == 0 || this.state.password.length == 0}
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
    user: state.user.user[0]
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchSetUser: (user) => dispatch(setUser(user))
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
