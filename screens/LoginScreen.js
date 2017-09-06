import React from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'

import { StackNavigator } from 'react-navigation'
import HomeScreen from './HomeScreen'
import { Container, Header, Content, Form, Item, Input, Label, Button } from 'native-base';
export default class LoginScreen extends React.Component {

  static navigationOptions = {
    title: 'Login'
  };

  constructor(props){
    super(props);
    this.state = {
      text: "Login"
    }
  }



  render(){
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
          <Container>
            <Content>
              <Form>
                <Item floatingLabel>
                  <Label>Username</Label>
                  <Input />
                </Item>
                <Item floatingLabel last>
                  <Label>Password</Label>
                  <Input />
                </Item>
              </Form>
              <Button block
                onPress={() => {
                  console.log('pressed');
                  navigate('Home')
                }}
                >
                <Text>{this.state.text}</Text>
              </Button>
            </Content>
          </Container>
      </View>
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
