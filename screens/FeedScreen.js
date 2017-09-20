import React from 'react';
import {ScrollView, StyleSheet} from 'react-native'

import {Container, List, ListItem, Thumbnail, Body, Text, Content } from 'native-base'

import { connect } from 'react-redux'

import { getArticles } from '../controllers/fetchAPI'

import { setUser } from '../actions/userActions'

const articleData = [
  {
    _id: 'Aye',
    title: 'First Article',
    body: 'Desc for first article'
  },
  {
    _id: 'Bay',
    title: 'Second Article',
    body: 'Desc for second article'
  }
]

class FeedScreen extends React.Component {
  static navigationOptions = {
    title: 'NewsFeed',
  };


  renderArticles = () => {
    const articleFeed = articleData.map( (article) =>
      <ListItem key={article._id}>
        <Thumbnail square size={80} source={require('../assets/images/robot-prod.png')}  />
        <Body>
          <Text> {article.title} </Text>
          <Text note> {article.body} </Text>
        </Body>
      </ListItem>
    )
    return (
      <List>
        {articleFeed}
      </List>
    )
  }

  render() {
    console.log('FeedScreen props', this.props.user);
    return (
      <Container>
        <Content>
          {this.renderArticles()}
        </Content>
      </Container>
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
