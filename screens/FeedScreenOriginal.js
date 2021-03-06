import React from 'react';

//UI Imports
import {ScrollView, StyleSheet} from 'react-native'
import {Container, Card, CardItem, Left, Thumbnail, Body, Text, Content } from 'native-base'
import {Constants, WebBrowser} from 'expo'
import FeedPicker from '../components/FeedPicker'

//Controller for fetching articles
import { getArticles } from '../controllers/fetchAPI'

//Redux related imports
import { connect } from 'react-redux'
import { setUser } from '../actions/userActions'
import { setArticles } from '../actions/articleActions'

/**
* FeedScreen creates a simple newsfeed
* based off the user's news preferences
*/

class FeedScreen extends React.Component {
  static navigationOptions = {
    title: 'NewsFeed',
    headerLeft: null
  };

  /**
  * Passes url to WebBrowser compnoent from expo
  * @param {String} url
  **/

  _handlePressButtonAsync = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
    this.setState({ result });
  };

  /**
  * Truncates text if exists else return empty string
  * @param {String} textInput
  * @return {String} altered text
  */
  truncateText = (text) => {
    if (text){
        return text.length > 20 ? text.substring(0,45) + '...' : text;
      } else {
        return "";
      }
    }

  /**
  * Renders the article image if it exists
  * else it renders a default image
  * @param {String} imageUrl
  * @return {Object || Function } A react prop for images
  */
  renderImage = (imageUrl) => {
    if (imageUrl){
      return {'uri': imageUrl}
    } else {
      return require('../assets/images/robot-dev.png')
    }
  }

  //TODO: currently this.props spits out 5 arrays of articles
  //in the future need to set this.props.articles to one big array
  //rather than reduce it here but for now

  /**
  * The react state passes five arrays of articles to
  * this.props.articles so this function reduces them
  * to one large array
  * @param {None}
  * @return {Array} flattenedArray of articles
  */

  reduceArticles = () => {
    let flattenedArray = this.props.articles.reduce( (a, b) => {
      return a.concat(b);
    }, [])
    return flattenedArray;
  }

  /**
  *
  * Creates a view that contains articles inside of it
  * based on the news source
  * @return {JSX} <Card> component with article inside
  */

  renderArticles = () => {
    let index = 0;
    let articleArray = this.reduceArticles();
    let finalArray = articleArray.splice(0, 10);

    const articleFeed = finalArray.map( (article) =>
      <CardItem key={index+= 1} button={true} onPress={ () => this._handlePressButtonAsync(article.url)}>
        <Left>
          <Thumbnail square size={80} source={this.renderImage(article.urlToImage)} />
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

  /**
  * Calls getArticles with userPreferences
  * @param {Array} array of indexes from each news source
  */

  createFeed = (indexArray) => {
    indexArray.map( (index) => {
      getArticles(index).then( (articleArray) => {
        this.props.dispatchSetArticles(articleArray);  
      })
    })
  }

  /**
  * Creates feed with user input before
  * component is rendered
  */
  componentWillMount(){
    this.createFeed(this.props.user.influencers)
  }

  render() {
    return (
      <Container>
        <Content>
          <FeedPicker/>
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
