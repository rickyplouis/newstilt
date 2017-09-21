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
    //currently this.props spits out 5 arrays of articles
    //in the future need to set this.props.articles to one big array
    //rather than reduce it here but for now, yolo
    const flattenedArray = this.props.articles.reduce( (a, b) => {
      return a.concat(b)
    }, [])
    let index = 0;
    const articleFeed = flattenedArray.map( (article) =>
      <ListItem key={index+= 1} button={true}>
        <Thumbnail square size={80} source={{uri: article.urlToImage}}  />
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
