import * as types from './actionTypes';

export function setCards(cards) {
  return {
    type: types.SET_CARDS,
    cards
  };
}
