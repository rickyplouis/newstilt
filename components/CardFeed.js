import React, { Component } from 'react';
import { Image } from 'react-native';
import { Container, View, Content, DeckSwiper,
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
      cards: [],
      isModalVisible: false
    }
  }

  componentWillReceiveProps(newProps){
    console.log('newProps are', newProps);
    this.setState({
      cards: newProps.cards
    })
  }

  componentWillMount(){
    this.createCards(this.props.user)
  }

  _showModal = () => this.setState({ isModalVisible: true })

  _hideModal = () => this.setState({ isModalVisible: false })

  createCards = (user) => {
    createCardArray(user).then( (cardArray) => {
      cardArray.map( (card) => this.props.dispatchSetCards(card))
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
    console.log('created tiltObject', tilt);

    return Promise.all([
      postArticle(card),
      postTilt(tilt),
      putInfluencer(card.influencer, direction)
    ])
  }

  handlePress = (index, direction) => {
    let cards = this.state.cards;
    cards[index][direction] = !cards[index][direction]
    this.setState({
      ...this.state,
      cards
    })
  }

  handleFlag = (index) => {
    let cards = this.state.cards;
    cards[index].flagged = !cards[index].flagged
    this.setState({
      ...this.state,
      cards
    })
  }

  performTilt = (card, index, direction) => {
    return Promise.all([
      this.handleSwipe(card, direction),
      this.handlePress(index, direction)
    ])
  }


  renderCard = (card, index) => {
    return (
      <Card key={index} style={{ elevation: 3 }}>
        <CardItem>
          <Left>
            <Thumbnail source={this.renderPath(card.image)}/>
            <Body>
              <Text>{this.truncateText(card.title)}</Text>
              <Text note>{this.truncateText(card.author)}</Text>
            </Body>
          </Left>
        </CardItem>
        <CardItem cardBody>
          <Image style={{height: 150, flex: 1}} source={this.renderPath(card.image)}/>
        </CardItem>
        <CardItem >
          <Left button={true}>
            <Button iconleft transparent onPress={() => this.performTilt(card, index, "left")}>
              <Icon button={true} name={this.state.cards[index].left ? "arrow-dropleft-circle" :"arrow-dropleft"} style={{ color: 'blue' }} />
            </Button>
            <Button iconleft transparent onPress={() => this.performTilt(card, index, "right")}>
              <Icon button={true} name={this.state.cards[index].right ? "arrow-dropright-circle" :"arrow-dropright"} style={{ color: 'blue' }} />
            </Button>
            <Button iconleft transparent onPress={this._showModal}>
              <Icon button={true} name="ios-stats" style={{ color: 'blue' }} />
            </Button>
          </Left>
          <Body>
            <Button block transparent onPress={ () => {
                this._handlePressButtonAsync(card.url)
              }}>
              <Text>Read</Text>
            </Button>
          </Body>
          <Right>
            <Button iconRight transparent onPress={() => this.handleFlag(index)}>
              <Icon button={true} name={this.state.cards[index].flagged ? "ios-flag" : "ios-flag-outline"} style={{ color: 'red' }} />
            </Button>
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

  renderDeck = () => {
    console.log('running this.state.cards', this.state.cards);
    if (this.state.cards.length > 0){
      return (
        <Content>
          {this.state.cards.map( (card, index) => this.renderCard(card, index))}
        </Content>
      )
    } else {
      return (
        <Text style={{textAlign: 'center', marginTop: '15%'}}>No cards available at the moment. Please adjust your tilt settings</Text>
      )
    }
  }

  render() {
    return (
      <Container>
        {this.renderDeck()}
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
