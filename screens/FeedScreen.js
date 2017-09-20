import React from 'react';
import {ScrollView, StyleSheet, Text} from 'react-native'
import FeedList from '../components/FeedList'

import { connect } from 'react-redux'

import { getArticles } from '../controllers/fetchAPI'

import { setUser } from '../actions/userActions'

class FeedScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };

  render() {
    console.log('FeedScreen props', this.props.user);
    return (
      <FeedList></FeedList>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#fff'
  }
});

mapDispatchToProps = (dispatch) => {
  return {
    dispatchSetUser: (user) => dispatch(setUser(user))
  }
}

mapStateToProps = (state) => {
  return {
    user: state.user.user[state.user.user.length - 1]
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedScreen)
