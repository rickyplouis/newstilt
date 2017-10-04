import React from 'react';
import {ScrollView, StyleSheet} from 'react-native'

import {Container, Card, CardItem, Left, Thumbnail, Body, Text, Content } from 'native-base'

import { connect } from 'react-redux'

import { getArticles } from '../controllers/fetchAPI'

import { setUser } from '../actions/userActions'
import { setArticles } from '../actions/articleActions'

import {Constants, WebBrowser} from 'expo'

class FeedScreen extends React.Component {
  static navigationOptions = {
    title: 'NewsFeed',
    headerLeft: null
  };

  _handlePressButtonAsync = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
    this.setState({ result });
  };

  truncateText = (text) => {
    if (text){
        return text.length > 20 ? text.substring(0,45) + '...' : text;
      } else {
        return "";
      }
    }

  renderPath = (imageUrl) => {
    if (imageUrl){
      return {'uri': imageUrl}
    } else {
      return require('../assets/images/robot-dev.png')
    }
  }

  reduceArticles = () => {
    //currently this.props spits out 5 arrays of articles
    //in the future need to set this.props.articles to one big array
    //rather than reduce it here but for now, yolo
    var flattenedArray = this.props.articles.reduce( (a, b) => {
      return a.concat(b);
    }, [])
    return flattenedArray;
  }

  renderArticles = () => {
    var articleArray = this.reduceArticles();
    let index = 0;
    var finalArray = articleArray.splice(0, 10);
    const articleFeed = finalArray.map( (article) =>
      <CardItem key={index+= 1} button={true} onPress={ () => this._handlePressButtonAsync(article.url)}>
        <Left>
          <Thumbnail square size={80} source={this.renderPath(article.urlToImage)} />
          <Body>
            <Text> {this.truncateText(article.title)} </Text>
            <Text note> {this.truncateText(article.description)} </Text>
          </Body>
        </Left>
      </CardItem>
    )
    return (
      <Card>
        {articleFeed}
      </Card>
    )
  }

  createFeed = (indexArray) => {
    var articles = [];
    for (let index of indexArray){
      getArticles(index).then( (articleArray) => {
        this.props.dispatchSetArticles(articleArray);
      })
    }
  }

  componentWillMount(){
    this.createFeed(this.props.user.influencers)
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
