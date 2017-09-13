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

export default class SignupScreen extends React.Component {

  static navigationOptions = {
    title: 'Signup'
  };

  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: "",
      confirmPassword: ""
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
    } else {
      return null
    }
  }

  render(){

    return (
      <Root>
        <View style={styles.container}>
            <Container>
              <Content>
                <Form>
                  <Item floatingLabel>
                    <Label>Username</Label>
                    <Input autoCapitalize={'none'} onChangeText={(username) => this.setState({username})} />
                  </Item>
                  <Item floatingLabel last>
                    <Label>Password</Label>
                    <Input autoCapitalize={'none'} secureTextEntry={true} onChangeText={(password) => this.setState({password})} />
                  </Item>
                  <Item floatingLabel last>
                    <Label>Confirm Password</Label>
                    <Input autoCapitalize={'none'} secureTextEntry={true} onChangeText={(confirmPassword) => this.setState({confirmPassword})} />
                  </Item>
                  {this.renderErrorMessage()}
                </Form>
                <Button block
                  onPress={this.login}
                  disabled={this.state.username.length == 0 || this.state.password.length == 0 || this.state.password != this.state.confirmPassword}
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

const App = StackNavigator({
  Home: {
    screen: HomeScreen
  }
})

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff'
  },
  errorText: {
    color: 'red'
  }
})
