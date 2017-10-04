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

  renderThumbnail = (imageUrl) => {
    let renderPath = imageUrl ? {'uri': imageUrl} : require('../assets/images/robot-dev.png')
    return <Thumbnail square size={80} source={renderPath}  />
  }

  renderArticles = () => {
    //currently this.props spits out 5 arrays of articles
    //in the future need to set this.props.articles to one big array
    //rather than reduce it here but for now, yolo
    const flattenedArray = this.props.articles.reduce( (a, b) => {
      return a.concat(b)
    }, [])
    let index = 0;
    const articleFeed = flattenedArray.map( (article) =>
      <CardItem key={index+= 1} button={true} onPress={ () => this._handlePressButtonAsync(article.url)}>
        <Left>
            {this.renderThumbnail(article.urlToImage)}
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
    console.log('componentWillMount::FeedScreen');
  }

  componentDidMount(){
    console.log('componentDidMount::FeedScreen');
  }

  render() {
    console.log('render::FeedScreen');
    console.log('second user is', this.props.user);
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
