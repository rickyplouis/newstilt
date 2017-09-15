import * as types from './actionTypes';

export function setInfluencers(influencers) {
  return {
    type: types.SET_INFLUENCERS,
    influencers
  };
}
