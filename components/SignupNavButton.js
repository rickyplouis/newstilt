import React from 'react'
import { Text, StyleSheet } from 'react-native'
import SignupScreen from '../screens/SignupScreen'
import { Button } from 'native-base'

/**
  * SignupNavButton Ex)
  * <SignupNavButton navigate={this.props.navigation.navigate} />
  @param {function}
  *
  */


export default class SignupNavButton extends React.Component {

  static navigationOptions = {
    title: 'SignupNavButton'
  }

  constructor(props){
    super(props);
  }


  goToSignup = () => {
    this.props.navigate('Signup')
  }

  render(){
    return (
      <Button transparent>
        <Text style={styles.signupButton} onPress={this.goToSignup}>Don't have an account? Register here.</Text>
      </Button>
    )
  }
}

const styles = StyleSheet.create({
  signupButton: {
    color: 'dodgerblue'
  }
})
