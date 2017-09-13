import * as types from '../actions/actionTypes';

const initialState = { user: [{
  "email": "Old Email",
  "_id": "Old ID",
  "tilt": 0
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
