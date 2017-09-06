import React from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'

import { StackNavigator } from 'react-navigation'
import HomeScreen from './HomeScreen'
import LoginForm from '../components/LoginForm'
import { Button } from 'native-base'

export default class LoginScreen extends React.Component {

  static navigationOptions = {
    title: 'Login'
  };

  constructor(props){
    super(props);
    this.state = {
      text: "Hello from login"
    }
  }



  render(){
    const { navigate } = this.props.navigation;
    return (
      <View style={styles.container}>
        <LoginForm/>
          <Button
            onPress={() => {
              console.log('pressed');
              navigate('Home')
            }}
            >
            <Text>{this.state.text}</Text>
          </Button>
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
