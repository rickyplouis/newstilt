import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'

import { connect } from 'react-redux'

import { setInfluencers } from '../actions/influencerActions'

import { ListItem, CheckBox, Content, Container, Text, Body } from 'native-base'

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
    const influencers = this.props.influencers;
    const influencerItems = influencers.map( (influencer) =>
      <ListItem key={influencer.sourceIndex}>
        <CheckBox checked={true} />
        <Body>
          <Text>{influencer.name}</Text>
        </Body>
      </ListItem>
    );

    return (
      <Content>
        <ListItem itemHeader>
          <Body>
            <Text>List of all available influencers</Text>
          </Body>
        </ListItem>
        {influencerItems}
      </Content>
    )
  }
  render(){
    return (
      <Container style={styles.container}>
        {this.renderInfluencers()}
      </Container>
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
