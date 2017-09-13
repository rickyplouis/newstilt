import * as types from '../actions/actionTypes';

const initialState = {
  cards: [{"header": 'fakeHeader', "author": 'fakeAuthor'}]
}

export default function cards(state = {cards:[]}, action = {}) {
  switch (action.type) {
    case types.SET_CARDS:
      return {
        cards: [...state.cards, action.cards]
      }
    default:
      return state;
  }
}
