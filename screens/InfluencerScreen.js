import React from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'

export default class InfluencerScreen extends React.Component {

  static navigationOptions = {
    title: 'Influencers',
  };

  constructor(props){
    super(props);
    this.state = {
      text: "Hello from influencer Screen"
    }
  }

  render(){
    return (
      <View style={styles.container}>
        <Text>{this.state.text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})
