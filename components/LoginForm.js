import React from 'react'
import { StyleSheet, Text } from 'react-native'
import { Container, Content, Item, Form, Label, Input, Button } from 'native-base';
import { StackNavigator } from 'react-navigation'
import HomeScreen from '../screens/HomeScreen'

export default class LoginForm extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        username: "",
        password: "",
        usernameInvalid: false,
        passwordInvalid: false,
        userMessage: "",
        passMessage: "",
    }

    console.log('loginform state', this.state);
  }

    login = () => {

      console.log('reached login');

      const values = {
        "email": this.state.username,
        "password": this.state.password
      }

      var postOptions = {
        method: 'post',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        //make sure to serialize your JSON body
        body: JSON.stringify(values)
      }

      fetch( 'https://newstiltapi.com/login', postOptions).then( (response) => {
        if (response.status == 200){
          response.json().then( (val) => {
            const user = val.user;
//            const { navigate } = this.props.navigation.navigate;
            this.setState({
              user
            })
            console.log('user is', user);
            props.navigation.navigate('Home');
          })
        } else {
          response.json().then( (val) => {
            const err = val.description[0];

            if (err == 'no user found'){
              this.setState({
                username: "",
                usernameInvalid: true,
                userMessage: err
              })
            } else if (err == 'Wrong password'){
              this.setState({
                password: "",
                passwordInvalid: true,
                passMessage: err
              })
            }
            console.log('err', err);
          })
        }
      }).catch( (error) => {
        console.log('error', error);
      })
    }

    goToSignup = () => {
      this.props.navigation.navigate('Signup')
    }


  render(){
    return (
        <Container>
          <Content>
            <Form>
              <Item stackedLabel error={this.state.usernameInvalid}>
                <Label>Username: + {this.props.user}</Label>
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
            <Button transparent>
              <Text style={styles.signupButton} onPress={this.goToSignup}>Don't have an account? Register here.</Text>
            </Button>
          </Content>
        </Container>
    )
  }
}

const App = StackNavigator({
  Home: {
    screen: HomeScreen
  }
})



const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  signupButton: {
    color: 'dodgerblue'
  }
})
