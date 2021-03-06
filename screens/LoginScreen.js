import React from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'
import {
  Container,
  Content,
  Form,
  Item,
  Input,
  Label,
  Button
} from 'native-base';

import SignupNavButton from '../components/SignupNavButton'

import { apiURL } from '../config/index.js'

//REDUX IMPORTS
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
      email: "",
      password: "",
      emailInvalid: false,
      passwordInvalid: false,
      emailMessage: "",
      passMessage: "",
    }
  }

  updateUserState = (user) => {
    this.props.dispatchSetUser({
      email: user.email,
      _id: user._id,
      tilt: user.tilt,
      influencers: user.influencers
    })
  }

  handleSuccess = (response) => {
    response.json().then( (val) => {
      Promise.all([
        this.updateUserState(val.user),
        this.props.navigation.navigate('Home'),
      ])
    })
  }

  handleError = (response) => {
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

  login = () => {
    var postOptions = {
      method: 'post',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "email": this.state.email,
        "password": this.state.password
      })
    }

    fetch( apiURL + '/login', postOptions).then( (response) => {
      return response.status == 200 ? this.handleSuccess(response) : this.handleError(response);
    })
  }

  render(){
    return (
      <View style={styles.container}>
        <Container>
          <Content>
            <Form>
              <Item stackedLabel error={this.state.emailInvalid}>
                <Label>Email</Label>
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

mapStateToProps = (state) => {
  return {
    user: state.user.user[0],
  }
}

mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetUser: (user) => dispatch(setUser(user)),
  }
}

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
