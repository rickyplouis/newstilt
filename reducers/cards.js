import * as types from '../actions/actionTypes';

export default function cards(state = {cards:[]}, action = {}) {
  switch (action.type) {
    case types.SET_CARDS:
      return {
        cards: [...state.cards, action.cards]
      }
      break;
    case types.CLEAR_CARDS:
      return {
        cards: []
      }
      break;
    default:
      return state;
  }
}
