import React from 'react'
import {
  View,
  Text,
  StyleSheet
} from 'react-native'

import { StackNavigator } from 'react-navigation'
import HomeScreen from './HomeScreen'
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import { Root } from "native-base";

//REDUX IMPORTS
import { connect } from 'react-redux'
import { setUser } from '../actions/userActions'


class SignupScreen extends React.Component {

  static navigationOptions = {
    title: 'Signup'
  };

  constructor(props){
    super(props);
    this.state = {
      email: "",
      password: "",
      passwordChanged: false,
      confirmPassword: "",
      emailInvalid: false,
      passwordInvalid: false,
      emailMessage: "",
      passMessage: ""
    }
  }

  renderErrorMessage () {
    if (this.state.confirmPassword.length > 0 && (this.state.password != this.state.confirmPassword) ){
      return (
        <Item>
          <Text style={styles.errorText}>
            Passwords don't match
          </Text>
        </Item>
      )
    } else if (this.state.passwordChanged && this.state.password.length < 6) {
      return (
        <Item>
          <Text style={styles.errorText}>
            Password must be atleast six characters
          </Text>
        </Item>
      )
    } else {
      return null
    }
  }

  signup = () => {
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

    fetch( 'https://newstiltapi.com/signup', postOptions).then( (response) => {
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
          console.log('val description', val.description);

          if (err == 'That email is already taken.'){
            this.setState({
              email: "",
              emailInvalid: true,
              emailMessage: err
            })
          }
        })
      }
    }).catch( (error) => {
      console.log('error', error);
    })
  }

  render(){

    return (
      <Root>
        <View style={styles.container}>
            <Container>
              <Content>
                <Form>
                  <Item floatingLabel error={this.state.emailInvalid}>
                    <Label>Username</Label>
                    <Input placeholder={this.state.emailMessage} value={this.state.email} autoCapitalize={'none'} onChangeText={(email) => this.setState({email})} />
                  </Item>
                  <Item floatingLabel last>
                    <Label>Password</Label>
                    <Input placeholder={this.state.passMessage} value={this.state.password} autoCapitalize={'none'} secureTextEntry={true} onChangeText={(password) => this.setState({password, passwordChanged: true})} />
                  </Item>
                  <Item floatingLabel last>
                    <Label>Confirm Password</Label>
                    <Input autoCapitalize={'none'} secureTextEntry={true} onChangeText={(confirmPassword) => this.setState({confirmPassword})} />
                  </Item>
                  {this.renderErrorMessage()}
                </Form>
                <Button block
                  onPress={this.signup}
                  disabled={this.state.email.length == 0 || this.state.password.length == 0 || this.state.password != this.state.confirmPassword}
                  >
                  <Text>Signup</Text>
                </Button>
              </Content>
            </Container>
        </View>
      </Root>
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  errorText: {
    color: 'red'
  }
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SignupScreen)
