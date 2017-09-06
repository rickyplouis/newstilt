import React from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'

import { StackNavigator } from 'react-navigation'
import HomeScreen from './HomeScreen'
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
import { Root } from "native-base";

export default class LoginScreen extends React.Component {

  static navigationOptions = {
    title: 'Signup'
  };

  constructor(props){
    super(props);
    this.state = {
      username: "",
      password: ""
    }
  }

  login = () => {


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
          const { navigate } = this.props.navigation;
          navigate('Home');
          console.log('user is', user);
        })
      } else {
        response.json().then( (val) => {
          const err = val.description[0];
          console.log('err', err);
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
                  <Item floatingLabel>
                    <Label>Username</Label>
                    <Input autoCapitalize={'none'} onChangeText={(username) => this.setState({username})} />
                  </Item>
                  <Item floatingLabel last>
                    <Label>Password</Label>
                    <Input autoCapitalize={'none'} onChangeText={(password) => this.setState({password})} />
                  </Item>
                  <Item floatingLabel last>
                    <Label>Confirm Password</Label>
                    <Input autoCapitalize={'none'} onChangeText={(password) => this.setState({password})} />
                  </Item>
                </Form>
                <Button block
                  onPress={this.login}
                  disabled={this.state.username.length == 0 || this.state.password.length == 0}
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
    flex: 1
  }
})
