import * as types from '../actions/actionTypes';

export default function articles(state = { articles:[] }, action = {}) {
  switch (action.type) {
    case types.SET_ARTICLES:
      return {
        articles: [...state.articles, action.articles]
      }
    default:
      return state;
  }
}
