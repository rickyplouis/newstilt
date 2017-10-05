import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, View, DeckSwiper,
         Card, Button, CardItem,
         Thumbnail, Text, Left,
         Right,Body, Icon
       } from 'native-base';

import { WebBrowser, Constants} from 'expo'
import { connect } from 'react-redux'
import { postArticle, postTilt, putInfluencer } from '../controllers/fetchAPI'

import { createCardArray} from '../controllers/cards'
import { setCards } from '../actions/cardActions'
import Modal from 'react-native-modal'

class SwiperComponent extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      cards: [{}],
      isModalVisible: false
    }
  }

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })

  createCards = (user) => {
    createCardArray(user).then( (cardArray) => {
      //For the sake of speed load 3 cards per influencer
      for (let x = 0; x < 2; x++){
        this.props.dispatchSetCards(cardArray[x])
      }
    })
  }

  _handlePressButtonAsync = async (url) => {
    let result = await WebBrowser.openBrowserAsync(url);
    this.setState({ result });
  };

  truncateText = (text) => {
    return text.length > 30 ? text.substring(0,30) + '...' : text;
  }

  renderPath = (imageUrl) => {
    if (imageUrl){
      return {'uri': imageUrl}
    } else {
      return require('../assets/images/robot-dev.png')
    }
  }

  handleSwipe = (card, direction) => {
    var tilt = {
      "left": direction == 'left',
      "right": direction == 'right',
      "up": false,
      "down": false,
      "_p_article": card.url,
      "_p_user": this.props.user._id,
      "_p_influencer": card.influencer,
    }

    return Promise.all([
      postArticle(card),
      postTilt(tilt),
      putInfluencer(card.influencer, direction)
    ])
  }

  componentWillMount(){
    this.createCards(this.props.user)
  }

  renderCard = (content) => {
    return (
      <Card style={{ elevation: 3 }}>
        <CardItem>
          <Left>
            <Thumbnail source={this.renderPath(content.image)}/>
            <Body>
              <Text>{this.truncateText(content.title)}</Text>
              <Text note>{this.truncateText(content.author)}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image style={{height: 300, flex: 1}} source={this.renderPath(content.image)}/>
        </CardItem>
        <CardItem >
          <Left button={true}>
            <Button iconleft transparent onPress={this._showModal}>
              <Icon button={true} name="ios-stats" style={{ color: 'blue' }} />
            </Button>
          </Left>
          <Body>
            <Button block transparent onPress={ () => {
                this._handlePressButtonAsync(content.url)
              }}>
              <Text>Read Article</Text>
            </Button>
          </Body>
          <Right>
            <Modal isVisible={this.state.isModalVisible}>
              <View style={{ flex: 1 }}>
                <Button onPress={this._hideModal}>
                  <Text>Hello!</Text>
                </Button>
              </View>
            </Modal>
          </Right>
        </CardItem>
      </Card>
    )
  }


  render() {
    return (
      <Container>
        <View>
          <DeckSwiper
            onSwipeLeft={(card) => this.handleSwipe(card, 'left')}
            onSwipeRight={(card) => this.handleSwipe(card, 'right')}
            dataSource={this.props.cards}
            renderItem={item => this.renderCard(item)}
          />
        </View>
      </Container>
    );
  }
}

function mapStateToProps (state) {
  return {
    user: state.user.user[state.user.user.length -1],
    cards: state.cards.cards
  }
}

function mapDispatchToProps (dispatch) {
  return {
    dispatchSetUser: (user) => dispatch(setUser(user)),
    dispatchSetCards: (cards) => dispatch(setCards(cards))
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SwiperComponent)
