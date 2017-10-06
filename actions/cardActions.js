import * as types from './actionTypes';

export function setCards(cards) {
  return {
    type: types.SET_CARDS,
    cards
  };
}

export function clearCards(cards){
  return{
    type: types.CLEAR_CARDS,
    cards
  }
}
