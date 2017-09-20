import React from 'react';
import {ScrollView, StyleSheet} from 'react-native'

import {Container, List, ListItem, Thumbnail, Body, Text, Content } from 'native-base'

import { connect } from 'react-redux'

import { getArticles } from '../controllers/fetchAPI'

import { setUser } from '../actions/userActions'
import { setArticles } from '../actions/articleActions'

class FeedScreen extends React.Component {
  static navigationOptions = {
    title: 'NewsFeed',
  };


  renderArticles = () => {
    const articleFeed = this.props.articles.map( (article) =>
      <ListItem key={article.url}>
        <Thumbnail square size={80} source={require('../assets/images/robot-prod.png')}  />
        <Body>
          <Text> {article.title} </Text>
          <Text note> {article.description} </Text>
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
    dispatchSetUser: (user) => dispatch(setUser(user)),
    dispatchSetArticles: (articles) => dispatch(setArticles(articles))
  }
}

mapStateToProps = (state) => {
  return {
    user: state.user.user[state.user.user.length - 1],
    articles: state.articles.articles
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(FeedScreen)
