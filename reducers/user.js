import * as types from '../actions/actionTypes';

const initialState = { user: [{"email": "Old Email"}] };

export default function user(state = initialState, action = {}) {
  console.log('action is', action);
  switch (action.type) {
    case types.SET_USER:
      return {
        user: [...state.user, action.user]
      };
    default:
      return state;
  }
}
