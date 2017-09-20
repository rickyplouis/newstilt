import * as types from './actionTypes';

export function setArticles(articles) {
  return {
    type: types.SET_ARTICLES,
    articles
  };
}
