import * as types from '../actions/actionTypes';

const initialState = { user: [{
  "email": "",
  "_id": "",
  "tilt": 0,
  "influencers": []
}] };

export default function user(state = initialState, action = {}) {
  switch (action.type) {
    case types.SET_USER:
      return {
        user: [...state.user, action.user]
      };
    default:
      return state;
  }
}
