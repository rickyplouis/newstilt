import * as types from '../actions/actionTypes';

export default function influencers(state = {influencers: []}, action = {}) {
  switch (action.type) {
    case types.SET_INFLUENCERS:
      return {
        influencers: [...state.influencers, action.influencers]
      }
    default:
      return state;
  }
}
