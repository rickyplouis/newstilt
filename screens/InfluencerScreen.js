import React from 'react'
import {
  View,
  StyleSheet,
} from 'react-native'

import { connect } from 'react-redux'

import { setInfluencers } from '../actions/influencerActions'
import { setUser } from '../actions/userActions'

import { ListItem, CheckBox, Content, Container, Text, Body } from 'native-base'

import { updateInfluencers } from '../controllers/fetchUser'

class InfluencerScreen extends React.Component {

  static navigationOptions = {
    title: 'Influencers',
  };

  constructor(props){
    super(props);
    this.state = {
      text: "Hello from influencer Screen",
      infList: []
    }
  }

  getInfluencerIndex = (influencer) => {
    let infList = this.props.user.influencers;
    for (let x = 0; x < infList.length; x++){
      if (infList[x] === influencer.sourceIndex){
        return x
      }
    }
    return -1;
  }

  influencerExists = (influencer) => {
    return this.getInfluencerIndex(influencer) > -1
  }

  dispatchUser = (user, array) => {
    this.props.dispatchSetUser({
      tilt: user.tilt,
      email: user.email,
      _id: user._id,
      influencers: array
    })
  }

  clickedInfluencer = (influencer) => {
    let newArray = this.props.user.influencers;
    let currentUser = this.props.user
    if (this.influencerExists(influencer)){
      newArray.splice(this.getInfluencerIndex(influencer), 1)
    } else {
      newArray.push(influencer.sourceIndex);
    }

    Promise.all([
      this.dispatchUser(currentUser, newArray),
      updateInfluencers(currentUser, newArray)
    ])
  }


  renderInfluencers = () => {
    const influencerItems = this.props.influencers.map( (influencer) =>
      <ListItem key={influencer.sourceIndex}>
        <CheckBox checked={this.influencerExists(influencer)} onPress={ () => {this.clickedInfluencer(influencer)}} />
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
    dispatchSetUser: (user) => dispatch(setUser(user)),
    dispatchSetInfluencers: (influencers) => dispatch(setInfluencers(influencers))
  }
}

mapStateToProps = (state) => {
  return {
    influencers: state.influencers.influencers,
    user: state.user.user[state.user.user.length - 1]
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
