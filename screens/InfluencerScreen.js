import React from 'react'
import {
  Text,
  View,
  StyleSheet,
} from 'react-native'

import { connect } from 'react-redux'

import { setInfluencers } from '../actions/influencerActions'

class InfluencerScreen extends React.Component {

  static navigationOptions = {
    title: 'Influencers',
  };

  constructor(props){
    super(props);
    this.state = {
      text: "Hello from influencer Screen"
    }
  }

  renderInfluencers = () => {
    const influencerItems = this.props.influencers.map( (influencer) => <Text key={influencer.sourceIndex}>{influencer.name}</Text>);
    return (
      <Text>
        {influencerItems}
      </Text>
    )
  }
  render(){
    return (
      <View style={styles.container}>
        {this.renderInfluencers()}
      </View>
    )
  }
}

mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetInfluencers: (influencers) => dispatch(setInfluencers(influencers))
  }
}

mapStateToProps = (state) => {
  return {
    influencers: state.influencers.influencers
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(InfluencerScreen);
